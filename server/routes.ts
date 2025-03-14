import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { insertOpportunitySchema, insertApplicationSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  // Opportunities
  app.get("/api/opportunities", async (req, res) => {
    const opportunities = await storage.getOpportunities();
    res.json(opportunities);
  });

  app.post("/api/opportunities", async (req, res) => {
    if (!req.isAuthenticated() || req.user.userType !== "ngo") {
      return res.status(403).send("Only NGOs can create opportunities");
    }

    try {
      const data = insertOpportunitySchema.parse(req.body);
      const opportunity = await storage.createOpportunity({
        ...data,
        organizationId: req.user.id,
      });
      res.status(201).json(opportunity);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json(error);
      } else {
        res.status(500).send("Internal server error");
      }
    }
  });

  // Applications
  app.get("/api/applications", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).send("Unauthorized");
    }

    const applications = await storage.getApplications(req.user.id);
    res.json(applications);
  });

  app.post("/api/opportunities/:id/apply", async (req, res) => {
    if (!req.isAuthenticated() || req.user.userType !== "individual") {
      return res.status(403).send("Only individuals can apply to opportunities");
    }

    try {
      const data = insertApplicationSchema.parse(req.body);
      const application = await storage.createApplication({
        ...data,
        volunteerId: req.user.id,
        opportunityId: parseInt(req.params.id),
      });
      res.status(201).json(application);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json(error);
      } else {
        res.status(500).send("Internal server error");
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
