import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAdminUserSchema, insertDressSchema, updateDressSchema, type AdminUser } from "@shared/schema";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs";

const JWT_SECRET = process.env.JWT_SECRET || "yakshu-boutique-secret-key";

// Setup multer for file uploads
const storage_multer = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage_multer });

// Middleware to verify JWT token
function authenticateToken(req: any, res: any, next: any) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve uploaded images
  app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

  // Admin authentication routes
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      const admin = await storage.getAdminUserByEmail(email);
      
      if (!admin || admin.password !== password) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign(
        { id: admin.id, email: admin.email, role: admin.role },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({ 
        message: "Login successful", 
        token,
        user: { id: admin.id, email: admin.email, name: admin.name, role: admin.role }
      });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  app.get("/api/admin/verify", authenticateToken, (req, res) => {
    res.json({ message: "Token valid", user: req.user });
  });

  // Admin management routes
app.get("/api/admin/users", authenticateToken, async (req, res) => {
  try {
    const adminUsers = await storage.getAllAdminUsers();
    
    if (!adminUsers) {
      return res.status(404).json({ message: "No admin users found." });
    }

    const usersWithoutPasswords = adminUsers.map((user: any) => {
      const { password, ...userWithoutPassword } = user.toObject ? user.toObject() : user;
      return {
        ...userWithoutPassword,
        id: userWithoutPassword._id || userWithoutPassword.id
      };
    });
    res.json(usersWithoutPasswords);
  } catch (error) {
    console.error("Get admin users error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

  app.post("/api/admin/users", authenticateToken, async (req, res) => {
    try {
      const validatedData = insertAdminUserSchema.parse(req.body);
      
      // Check if admin already exists
      const existingAdmin = await storage.getAdminUserByEmail(validatedData.email);
      if (existingAdmin) {
        return res.status(400).json({ message: "Admin with this email already exists" });
      }

      const admin = await storage.createAdminUser(validatedData);
      res.status(201).json({ 
        id: admin.id, 
        email: admin.email 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error: " + error.errors.map(e => e.message).join(", ") });
      }
      console.error("Error creating admin user:", error);
      res.status(400).json({ message: "Failed to create admin user: " + (error as Error).message });
    }
  });

  app.delete("/api/admin/users/:id", authenticateToken, async (req, res) => {
    try {
      const { id } = req.params;
      
      if (!id || id === "undefined" || id.length !== 24) {
        return res.status(400).json({ message: "Invalid admin user ID" });
      }
      
      // Check if it's the last admin
      const allAdmins = await storage.getAllAdminUsers();
      if (allAdmins.length <= 1) {
        return res.status(400).json({ message: "Cannot remove the last admin" });
      }

      const deleted = await storage.deleteAdminUser(id);
      if (!deleted) {
        return res.status(404).json({ message: "Admin user not found" });
      }

      res.json({ message: "Admin user deleted successfully" });
    } catch (error) {
      console.error("Error deleting admin user:", error);
      res.status(500).json({ message: "Failed to delete admin user" });
    }
  });

  // Dress management routes
  app.get("/api/dresses", async (req, res) => {
    try {
      const dresses = await storage.getAllDresses();
      res.json(dresses);
    } catch (error) {
      console.error("Get dresses error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/dresses/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      if (!id || id === "undefined" || id.length !== 24) {
        return res.status(400).json({ message: "Invalid dress ID" });
      }
      
      const dress = await storage.getDress(id);
      
      if (!dress) {
        return res.status(404).json({ message: "Dress not found" });
      }

      res.json(dress);
    } catch (error) {
      console.error("Get dress error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/dresses", authenticateToken, upload.single('image'), async (req, res) => {
    try {
      const dressData = {
        name: req.body.name,
        price: parseInt(req.body.price),
        sizes: req.body.sizes ? req.body.sizes.split(',').map((size: string) => size.trim()).filter(Boolean) : [],
        shortDescription: req.body.shortDescription,
        fullDescription: req.body.fullDescription,
        category: req.body.category,
        imageUrl: req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : '/uploads/placeholder.jpg',
      };

      if (!dressData.name || !dressData.price || !dressData.sizes.length || !dressData.shortDescription || !dressData.fullDescription || !dressData.category) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const validatedData = insertDressSchema.parse(dressData);
      const dress = await storage.createDress(validatedData);

      res.status(201).json(dress);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error: " + error.errors.map(e => e.message).join(", ") });
      }
      console.error("Create dress error:", error);
      res.status(500).json({ message: "Failed to create dress: " + (error as Error).message });
    }
  });

  app.put("/api/dresses/:id", authenticateToken, upload.single('image'), async (req, res) => {
    try {
      const { id } = req.params;
      
      if (!id || id === "undefined" || id.length !== 24) {
        return res.status(400).json({ message: "Invalid dress ID" });
      }
      
      const dressData: any = {
        name: req.body.name,
        price: req.body.price ? parseInt(req.body.price) : undefined,
        sizes: req.body.sizes ? req.body.sizes.split(',').map((size: string) => size.trim()) : undefined,
        shortDescription: req.body.shortDescription,
        fullDescription: req.body.fullDescription,
        category: req.body.category,
      };

      if (req.file) {
        dressData.imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      }

      // Remove undefined values
      Object.keys(dressData).forEach(key => {
        if (dressData[key] === undefined) {
          delete dressData[key];
        }
      });

      const validatedData = updateDressSchema.parse(dressData);
      const dress = await storage.updateDress(id, validatedData);

      if (!dress) {
        return res.status(404).json({ message: "Dress not found" });
      }

      res.json(dress);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      console.error("Update dress error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/dresses/:id", authenticateToken, async (req, res) => {
    try {
      const { id } = req.params;
      
      if (!id || id === "undefined" || id.length !== 24) {
        return res.status(400).json({ message: "Invalid dress ID" });
      }
      
      const deleted = await storage.deleteDress(id);

      if (!deleted) {
        return res.status(404).json({ message: "Dress not found" });
      }

      res.json({ message: "Dress deleted successfully" });
    } catch (error) {
      console.error("Delete dress error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Initialize default admin user if none exists
  app.post("/api/init", async (req, res) => {
    try {
      const adminUsers = await storage.getAllAdminUsers();
      
      if (adminUsers.length === 0) {
        const hashedPassword = await bcrypt.hash("admin123", 10);
        await storage.createAdminUser({
          name: "Super Admin",
          email: "admin@yakshu.com",
          password: hashedPassword,
          role: "super_admin",
        });
        res.json({ message: "Default admin user created" });
      } else {
        res.json({ message: "Admin users already exist" });
      }
    } catch (error) {
      console.error("Init error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}