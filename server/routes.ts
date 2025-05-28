import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDressSchema, insertAdminUserSchema } from "@shared/schema";
import multer from "multer";
import { Client } from "@replit/object-storage";
import fs from "fs";
import path from "path";

// Configure multer for memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Initialize Replit Object Storage client
let client: Client | null = null;

async function initializeObjectStorage() {
  try {
    const testClient = new Client();
    // Test if the client can be used
    await testClient.list();
    client = testClient;
    console.log("Object Storage initialized successfully");
  } catch (error) {
    console.log("Object Storage not available. Using local file storage fallback.");
    console.log("To use Object Storage: Go to Tools > Object Storage > Create a Bucket");
    client = null;
  }
}

// Initialize on startup
initializeObjectStorage();

export async function registerRoutes(app: Express): Promise<Server> {
  // File upload route
  app.post("/api/upload", upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Generate unique filename with timestamp
      const timestamp = Date.now();
      const filename = `${timestamp}_${req.file.originalname}`;

      if (client) {
        // Use Object Storage if available
        await client.uploadFromBytes(filename, req.file.buffer, {
          contentType: req.file.mimetype
        });
      } else {
        // Fallback to local storage
        console.log("Using local file storage fallback");
        const uploadDir = path.join(process.cwd(), "client", "public", "images");
        
        // Ensure directory exists
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        
        // Save file locally
        const filePath = path.join(uploadDir, filename);
        fs.writeFileSync(filePath, req.file.buffer);
      }

      const imageUrl = `/api/images/${filename}`;
      res.json({ imageUrl });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ message: "Failed to upload file" });
    }
  });

  // Serve images from Object Storage or local storage
  app.get("/api/images/:filename", async (req, res) => {
    try {
      const { filename } = req.params;
      
      if (client) {
        // Try Object Storage first
        try {
          const file = await client.downloadAsBytes(filename);
          
          // Set appropriate content type
          const ext = filename.split('.').pop()?.toLowerCase();
          let contentType = 'image/jpeg';
          if (ext === 'png') contentType = 'image/png';
          if (ext === 'gif') contentType = 'image/gif';
          if (ext === 'webp') contentType = 'image/webp';
          
          res.set('Content-Type', contentType);
          res.send(file);
          return;
        } catch (error) {
          console.log("Image not found in Object Storage, trying local storage");
        }
      }
      
      // Fallback to local storage
      const filePath = path.join(process.cwd(), "client", "public", "images", filename);
      
      if (fs.existsSync(filePath)) {
        const ext = filename.split('.').pop()?.toLowerCase();
        let contentType = 'image/jpeg';
        if (ext === 'png') contentType = 'image/png';
        if (ext === 'gif') contentType = 'image/gif';
        if (ext === 'webp') contentType = 'image/webp';
        
        res.set('Content-Type', contentType);
        res.sendFile(filePath);
      } else {
        res.status(404).json({ message: "Image not found" });
      }
    } catch (error) {
      console.error("Error serving image:", error);
      res.status(404).json({ message: "Image not found" });
    }
  });

  // Dress routes
  app.get("/api/dresses", async (req, res) => {
    try {
      const dresses = await storage.getDresses();
      res.json(dresses);
    } catch (error) {
      console.error("Error fetching dresses:", error);
      res.status(500).json({ message: "Failed to fetch dresses" });
    }
  });

  app.post("/api/dresses", async (req, res) => {
    try {
      const validatedData = insertDressSchema.parse(req.body);
      const dress = await storage.createDress(validatedData);
      res.status(201).json(dress);
    } catch (error) {
      console.error("Error creating dress:", error);
      res.status(400).json({ message: "Failed to create dress" });
    }
  });

  app.put("/api/dresses/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertDressSchema.parse(req.body);
      const dress = await storage.updateDress(parseInt(id), validatedData);
      if (!dress) {
        return res.status(404).json({ message: "Dress not found" });
      }
      res.json(dress);
    } catch (error) {
      console.error("Error updating dress:", error);
      res.status(400).json({ message: "Failed to update dress" });
    }
  });

  app.delete("/api/dresses/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteDress(parseInt(id));
      if (!success) {
        return res.status(404).json({ message: "Dress not found" });
      }
      res.json({ message: "Dress deleted successfully" });
    } catch (error) {
      console.error("Error deleting dress:", error);
      res.status(500).json({ message: "Failed to delete dress" });
    }
  });

  // Admin authentication routes
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      const admin = await storage.getAdminByEmail(email);
      
      if (!admin || admin.password !== password) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      res.json({ 
        message: "Login successful", 
        admin: { id: admin.id, email: admin.email } 
      });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Admin management routes
  app.get("/api/admin/users", async (req, res) => {
    try {
      const admins = await storage.getAdminUsers();
      // Don't send passwords in response
      const safeAdmins = admins.map(admin => ({ 
        id: admin.id, 
        email: admin.email 
      }));
      res.json(safeAdmins);
    } catch (error) {
      console.error("Error fetching admin users:", error);
      res.status(500).json({ message: "Failed to fetch admin users" });
    }
  });

  app.post("/api/admin/users", async (req, res) => {
    try {
      const validatedData = insertAdminUserSchema.parse(req.body);
      
      // Check if admin already exists
      const existingAdmin = await storage.getAdminByEmail(validatedData.email);
      if (existingAdmin) {
        return res.status(400).json({ message: "Admin with this email already exists" });
      }

      const admin = await storage.createAdminUser(validatedData);
      res.status(201).json({ 
        id: admin.id, 
        email: admin.email 
      });
    } catch (error) {
      console.error("Error creating admin user:", error);
      res.status(400).json({ message: "Failed to create admin user" });
    }
  });

  app.delete("/api/admin/users/:email", async (req, res) => {
    try {
      const { email } = req.params;
      
      // Check if it's the last admin
      const allAdmins = await storage.getAdminUsers();
      if (allAdmins.length <= 1) {
        return res.status(400).json({ message: "Cannot remove the last admin" });
      }

      await storage.deleteAdminUser(email);
      res.json({ message: "Admin user deleted successfully" });
    } catch (error) {
      console.error("Error deleting admin user:", error);
      res.status(500).json({ message: "Failed to delete admin user" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}