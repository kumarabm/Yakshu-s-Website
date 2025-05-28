import { dresses, adminUsers, type Dress, type InsertDress, type AdminUser, type InsertAdminUser } from "@shared/schema";

export interface IStorage {
  // Dress operations
  getDresses(): Promise<Dress[]>;
  createDress(dress: InsertDress): Promise<Dress>;
  
  // Admin operations
  getAdminUsers(): Promise<AdminUser[]>;
  getAdminByEmail(email: string): Promise<AdminUser | undefined>;
  createAdminUser(admin: InsertAdminUser): Promise<AdminUser>;
  deleteAdminUser(email: string): Promise<void>;

  updateDress(id: number, dress: InsertDress): Promise<Dress | undefined>;
  deleteDress(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private dresses: Map<number, Dress>;
  private adminUsers: Map<number, AdminUser>;
  private currentDressId: number;
  private currentAdminId: number;

  constructor() {
    this.dresses = new Map();
    this.adminUsers = new Map();
    this.currentDressId = 1;
    this.currentAdminId = 1;
    
    // Initialize with default data
    this.initializeData();
  }

  private initializeData() {
    // Add initial dresses
    const initialDresses: InsertDress[] = [
      {
        name: "Floral Summer Dress",
        price: 1599,
        sizes: ["S", "M", "L"],
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&auto=format&fit=crop",
        description: "Lightweight floral dress perfect for summer outings"
      },
      {
        name: "Elegant Evening Gown",
        price: 2599,
        sizes: ["M", "L", "XL"],
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop",
        description: "Stunning gown for formal occasions"
      }
    ];

    initialDresses.forEach(dress => {
      const id = this.currentDressId++;
      const newDress: Dress = { 
        ...dress, 
        id, 
        createdAt: new Date() 
      };
      this.dresses.set(id, newDress);
    });

    // Add initial admin users
    const initialAdmins: InsertAdminUser[] = [
      { email: "admin@yakshu.com", password: "admin123" },
      { email: "manager@yakshu.com", password: "manager123" }
    ];

    initialAdmins.forEach(admin => {
      const id = this.currentAdminId++;
      const newAdmin: AdminUser = { ...admin, id };
      this.adminUsers.set(id, newAdmin);
    });
  }

  async getDresses(): Promise<Dress[]> {
    return Array.from(this.dresses.values());
  }

  async createDress(insertDress: InsertDress): Promise<Dress> {
    const id = this.currentDressId++;
    const dress: Dress = { 
      ...insertDress, 
      id, 
      createdAt: new Date() 
    };
    this.dresses.set(id, dress);
    return dress;
  }

  async updateDress(id: number, dress: InsertDress): Promise<Dress | undefined> {
    if (!this.dresses.has(id)) {
      return undefined;
    }

    const updatedDress: Dress = {
      ...dress,
      id,
      createdAt: this.dresses.get(id)!.createdAt,
    };

    this.dresses.set(id, updatedDress);
    return updatedDress;
  }

  async deleteDress(id: number): Promise<boolean> {
    return this.dresses.delete(id);
  }

  async getAdminUsers(): Promise<AdminUser[]> {
    return Array.from(this.adminUsers.values());
  }

  async getAdminByEmail(email: string): Promise<AdminUser | undefined> {
    return Array.from(this.adminUsers.values()).find(
      (admin) => admin.email === email
    );
  }

  async createAdminUser(insertAdmin: InsertAdminUser): Promise<AdminUser> {
    const id = this.currentAdminId++;
    const admin: AdminUser = { ...insertAdmin, id };
    this.adminUsers.set(id, admin);
    return admin;
  }

  async deleteAdminUser(email: string): Promise<void> {
    const adminToDelete = Array.from(this.adminUsers.entries()).find(
      ([_, admin]) => admin.email === email
    );
    if (adminToDelete) {
      this.adminUsers.delete(adminToDelete[0]);
    }
  }
}

export const storage = new MemStorage();