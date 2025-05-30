import { User, AdminUser, Dress, type IUser, type IAdminUser, type IDress, type InsertUser, type InsertAdminUser, type InsertDress, type UpdateDress } from "@shared/schema";

export interface IStorage {
  getUser(id: string): Promise<IUser | null>;
  getUserByUsername(username: string): Promise<IUser | null>;
  createUser(user: InsertUser): Promise<IUser>;

  // Admin user methods
  getAdminUser(id: string): Promise<IAdminUser | null>;
  getAdminUserByEmail(email: string): Promise<IAdminUser | null>;
  createAdminUser(adminUser: InsertAdminUser): Promise<IAdminUser>;
  getAllAdminUsers(): Promise<IAdminUser[]>;
  updateAdminUser(id: string, adminUser: Partial<InsertAdminUser>): Promise<IAdminUser | null>;
  deleteAdminUser(id: string): Promise<boolean>;

  // Dress methods
  getDress(id: string): Promise<IDress | null>;
  getAllDresses(): Promise<IDress[]>;
  createDress(dress: InsertDress): Promise<IDress>;
  updateDress(id: string, dress: UpdateDress): Promise<IDress | null>;
  deleteDress(id: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }

  async getUserByUsername(username: string): Promise<IUser | null> {
    return await User.findOne({ username });
  }

  async createUser(insertUser: InsertUser): Promise<IUser> {
    const user = new User(insertUser);
    return await user.save();
  }

  // Admin user methods
  async getAdminUser(id: string): Promise<IAdminUser | null> {
    return await AdminUser.findById(id);
  }

  async getAdminUserByEmail(email: string): Promise<IAdminUser | null> {
    return await AdminUser.findOne({ email });
  }

  async createAdminUser(insertAdminUser: InsertAdminUser): Promise<IAdminUser> {
    const adminUser = new AdminUser(insertAdminUser);
    return await adminUser.save();
  }

  async getAllAdminUsers(): Promise<IAdminUser[]> {
    return await AdminUser.find();
  }

  async updateAdminUser(id: string, adminUser: Partial<InsertAdminUser>): Promise<IAdminUser | null> {
    return await AdminUser.findByIdAndUpdate(id, adminUser, { new: true });
  }

  async deleteAdminUser(id: string): Promise<boolean> {
    const result = await AdminUser.findByIdAndDelete(id);
    return result !== null;
  }

  // Dress methods
  async getDress(id: string): Promise<IDress | null> {
    return await Dress.findById(id);
  }

  async getAllDresses(): Promise<IDress[]> {
    return await Dress.find().sort({ createdAt: -1 });
  }

  async createDress(insertDress: InsertDress): Promise<IDress> {
    const dress = new Dress(insertDress);
    return await dress.save();
  }

  async updateDress(id: string, updateDress: UpdateDress): Promise<IDress | null> {
    return await Dress.findByIdAndUpdate(
      id, 
      { ...updateDress, updatedAt: new Date() }, 
      { new: true }
    );
  }

  async deleteDress(id: string): Promise<boolean> {
    const result = await Dress.findByIdAndDelete(id);
    return result !== null;
  }
}

export const storage = new DatabaseStorage();