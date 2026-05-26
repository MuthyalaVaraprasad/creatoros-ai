import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "src/lib/db.json");

export interface UserSession {
  email: string;
  name: string;
  isLoggedIn: boolean;
  level: string;
  xp: number;
  streak: number;
}

export interface ProjectItem {
  id: string;
  title: string;
  type: string;
  platform: string;
  content: string;
  date: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  platform: string;
  date: number;
  color: string;
}

export interface BrandProfile {
  colorPrimary: string;
  colorSecondary: string;
  font: string;
  voice: string;
}

interface DBStructure {
  users: Array<{ email: string; password?: string; name: string }>;
  projects: ProjectItem[];
  calendar: CalendarEvent[];
  brandKit: BrandProfile;
}

const defaultData: DBStructure = {
  users: [
    { email: "creator@example.com", password: "password123", name: "Creator Pro" }
  ],
  projects: [
    { id: "1", title: "5 Secret AI Tools", type: "Script", platform: "YouTube", content: "Want to save hours of work...", date: "May 26" }
  ],
  calendar: [
    { id: "1", title: "AI Tools You Must Know", platform: "YouTube", date: 20, color: "bg-red-500/20 text-red-400 border-red-500/30" },
    { id: "2", title: "How I Plan My Videos", platform: "YouTube", date: 21, color: "bg-red-500/20 text-red-400 border-red-500/30" }
  ],
  brandKit: {
    colorPrimary: "#8b5cf6",
    colorSecondary: "#ec4899",
    font: "Outfit / Inter",
    voice: "Professional, futuristic, slightly cheeky"
  }
};

export function readDB(): DBStructure {
  try {
    if (!fs.existsSync(dbPath)) {
      fs.mkdirSync(path.dirname(dbPath), { recursive: true });
      fs.writeFileSync(dbPath, JSON.stringify(defaultData, null, 2), "utf-8");
      return defaultData;
    }
    const data = fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading database:", error);
    return defaultData;
  }
}

export function writeDB(data: DBStructure) {
  try {
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing database:", error);
  }
}
