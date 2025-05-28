// import type { Express } from "express";
// import { createServer, type Server } from "http";
// import { storage } from "./storage";
// import { insertDressSchema, insertAdminUserSchema } from "@shared/schema";

// export async function registerRoutes(app: Express): Promise<Server> {
//   // Dress routes
//   app.get("/api/dresses", async (req, res) => {
//     try {
//       const dresses = await storage.getDresses();
//       res.json(dresses);
//     } catch (error) {
//       console.error("Error fetching dresses:", error);
//       res.status(500).json({ message: "Failed to fetch dresses" });
//     }
//   });

//   app.post("/api/dresses", async (req, res) => {
//     try {
//       const validatedData = insertDressSchema.parse(req.body);
//       const dress = await storage.createDress(validatedData);
//       res.status(201).json(dress);
//     } catch (error) {
//       console.error("Error creating dress:", error);
//       res.status(400).json({ message: "Failed to create dress" });
//     }
//   });

//   app.put("/api/dresses/:id", async (req, res) => {
//     try {
//       const { id } = req.params;
//       const validatedData = insertDressSchema.parse(req.body);
//       const dress = await storage.updateDress(parseInt(id), validatedData);
//       if (!dress) {
//         return res.status(404).json({ message: "Dress not found" });
//       }
//       res.json(dress);
//     } catch (error) {
//       console.error("Error updating dress:", error);
//       res.status(400).json({ message: "Failed to update dress" });
//     }
//   });

//   app.delete("/api/dresses/:id", async (req, res) => {
//     try {
//       const { id } = req.params;
//       const success = await storage.deleteDress(parseInt(id));
//       if (!success) {
//         return res.status(404).json({ message: "Dress not found" });
//       }
//       res.json({ message: "Dress deleted successfully" });
//     } catch (error) {
//       console.error("Error deleting dress:", error);
//       res.status(500).json({ message: "Failed to delete dress" });
//     }
//   });

//   // Admin authentication routes
//   app.post("/api/admin/login", async (req, res) => {
//     try {
//       const { email, password } = req.body;
      
//       if (!email || !password) {
//         return res.status(400).json({ message: "Email and password are required" });
//       }

//       const admin = await storage.getAdminByEmail(email);
      
//       if (!admin || admin.password !== password) {
//         return res.status(401).json({ message: "Invalid email or password" });
//       }

//       res.json({ 
//         message: "Login successful", 
//         admin: { id: admin.id, email: admin.email } 
//       });
//     } catch (error) {
//       console.error("Error during login:", error);
//       res.status(500).json({ message: "Login failed" });
//     }
//   });

//   // Admin management routes
//   app.get("/api/admin/users", async (req, res) => {
//     try {
//       const admins = await storage.getAdminUsers();
//       // Don't send passwords in response
//       const safeAdmins = admins.map(admin => ({ 
//         id: admin.id, 
//         email: admin.email 
//       }));
//       res.json(safeAdmins);
//     } catch (error) {
//       console.error("Error fetching admin users:", error);
//       res.status(500).json({ message: "Failed to fetch admin users" });
//     }
//   });

//   app.post("/api/admin/users", async (req, res) => {
//     try {
//       const validatedData = insertAdminUserSchema.parse(req.body);
      
//       // Check if admin already exists
//       const existingAdmin = await storage.getAdminByEmail(validatedData.email);
//       if (existingAdmin) {
//         return res.status(400).json({ message: "Admin with this email already exists" });
//       }

//       const admin = await storage.createAdminUser(validatedData);
//       res.status(201).json({ 
//         id: admin.id, 
//         email: admin.email 
//       });
//     } catch (error) {
//       console.error("Error creating admin user:", error);
//       res.status(400).json({ message: "Failed to create admin user" });
//     }
//   });

//   app.delete("/api/admin/users/:email", async (req, res) => {
//     try {
//       const { email } = req.params;
      
//       // Check if it's the last admin
//       const allAdmins = await storage.getAdminUsers();
//       if (allAdmins.length <= 1) {
//         return res.status(400).json({ message: "Cannot remove the last admin" });
//       }

//       await storage.deleteAdminUser(email);
//       res.json({ message: "Admin user deleted successfully" });
//     } catch (error) {
//       console.error("Error deleting admin user:", error);
//       res.status(500).json({ message: "Failed to delete admin user" });
//     }
//   });

//   const httpServer = createServer(app);
//   return httpServer;
// }




import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDressSchema, insertAdminUserSchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import fs from "fs";

// Configure multer for file uploads
const storage_config = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(process.cwd(), 'client/public/images');
    // Ensure directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Keep original filename
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage_config });

export async function registerRoutes(app: Express): Promise<Server> {
  // File upload route
  app.post("/api/upload", upload.single('image'), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const imageUrl = `/images/${req.file.filename}`;
      res.json({ imageUrl });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ message: "Failed to upload file" });
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