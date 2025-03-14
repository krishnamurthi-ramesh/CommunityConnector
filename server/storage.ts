import { User, InsertUser, Opportunity, InsertOpportunitySchema, Application, InsertApplicationSchema } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getOpportunities(): Promise<Opportunity[]>;
  getOpportunity(id: number): Promise<Opportunity | undefined>;
  createOpportunity(opportunity: Opportunity): Promise<Opportunity>;
  updateOpportunity(id: number, opportunity: Partial<Opportunity>): Promise<Opportunity>;
  
  getApplications(userId: number): Promise<Application[]>;
  createApplication(application: Application): Promise<Application>;
  updateApplication(id: number, status: string): Promise<Application>;
  
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private opportunities: Map<number, Opportunity>;
  private applications: Map<number, Application>;
  private currentId: number;
  sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.opportunities = new Map();
    this.applications = new Map();
    this.currentId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getOpportunities(): Promise<Opportunity[]> {
    return Array.from(this.opportunities.values());
  }

  async getOpportunity(id: number): Promise<Opportunity | undefined> {
    return this.opportunities.get(id);
  }

  async createOpportunity(opportunity: Opportunity): Promise<Opportunity> {
    const id = this.currentId++;
    const newOpportunity = { ...opportunity, id };
    this.opportunities.set(id, newOpportunity);
    return newOpportunity;
  }

  async updateOpportunity(id: number, opportunity: Partial<Opportunity>): Promise<Opportunity> {
    const existing = this.opportunities.get(id);
    if (!existing) throw new Error("Opportunity not found");
    
    const updated = { ...existing, ...opportunity };
    this.opportunities.set(id, updated);
    return updated;
  }

  async getApplications(userId: number): Promise<Application[]> {
    return Array.from(this.applications.values()).filter(
      (app) => app.volunteerId === userId,
    );
  }

  async createApplication(application: Application): Promise<Application> {
    const id = this.currentId++;
    const newApplication = { ...application, id };
    this.applications.set(id, newApplication);
    return newApplication;
  }

  async updateApplication(id: number, status: string): Promise<Application> {
    const existing = this.applications.get(id);
    if (!existing) throw new Error("Application not found");
    
    const updated = { ...existing, status };
    this.applications.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
