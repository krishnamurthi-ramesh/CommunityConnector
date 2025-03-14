import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  userType: text("user_type", { enum: ["individual", "ngo"] }).notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  bio: text("bio"),
  location: text("location"),
  skills: text("skills").array(),
});

export const opportunities = pgTable("opportunities", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  location: text("location").notNull(),
  requiredSkills: text("required_skills").array(),
  organizationId: integer("organization_id").references(() => users.id),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  status: text("status", { enum: ["open", "closed"] }).notNull().default("open"),
});

export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  volunteerId: integer("volunteer_id").references(() => users.id),
  opportunityId: integer("opportunity_id").references(() => opportunities.id),
  status: text("status", { enum: ["pending", "accepted", "rejected"] }).notNull().default("pending"),
  appliedAt: timestamp("applied_at").notNull().defaultNow(),
});

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  location: text("location").notNull(),
  attendees: integer("attendees").notNull(),
  organizerId: integer("organizer_id").references(() => users.id),
});

export const eventRegistrations = pgTable("event_registrations", {
  id: serial("id").primaryKey(),
  eventId: integer("event_id").references(() => events.id),
  userId: integer("user_id").references(() => users.id),
  registeredAt: timestamp("registered_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  userType: true,
  name: true,
  email: true,
  bio: true,
  location: true,
  skills: true,
});

export const insertOpportunitySchema = createInsertSchema(opportunities).pick({
  title: true,
  description: true,
  location: true,
  requiredSkills: true,
  startDate: true,
  endDate: true,
});

export const insertApplicationSchema = createInsertSchema(applications).pick({
  opportunityId: true,
});

export const insertEventRegistrationSchema = createInsertSchema(eventRegistrations).pick({
  eventId: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Opportunity = typeof opportunities.$inferSelect;
export type Application = typeof applications.$inferSelect;
export type Event = typeof events.$inferSelect;
export type EventRegistration = typeof eventRegistrations.$inferSelect;