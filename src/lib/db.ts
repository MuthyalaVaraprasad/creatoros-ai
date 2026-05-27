import fs from "fs";
import path from "path";

// Determine writeable path
const isServerless = !!(process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.VERCEL || process.env.LAMBDA_TASK_ROOT);
const dbPath = isServerless 
  ? "/tmp/db.json"
  : path.join(process.cwd(), "src/lib/db.json");

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

// In-memory fallback
let memoryDb: DBStructure = JSON.parse(JSON.stringify(defaultData));

export function readDB(): DBStructure {
  try {
    // If local development, check local path
    if (!isServerless) {
      if (!fs.existsSync(dbPath)) {
        fs.mkdirSync(path.dirname(dbPath), { recursive: true });
        fs.writeFileSync(dbPath, JSON.stringify(defaultData, null, 2), "utf-8");
        return defaultData;
      }
      const data = fs.readFileSync(dbPath, "utf-8");
      return JSON.parse(data);
    }
    
    // Serverless: check if /tmp/db.json exists
    if (fs.existsSync(dbPath)) {
      const data = fs.readFileSync(dbPath, "utf-8");
      return JSON.parse(data);
    }

    // Try to write default data to /tmp/db.json for persistence in active serverless container
    try {
      fs.writeFileSync(dbPath, JSON.stringify(defaultData, null, 2), "utf-8");
    } catch (writeErr) {
      console.error("Serverless write default failed, using memory:", writeErr);
    }
    return memoryDb;
  } catch (error) {
    console.error("Error reading database:", error);
    return memoryDb;
  }
}

export function writeDB(data: DBStructure) {
  memoryDb = data; // Always update in-memory cache
  try {
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing database:", error);
  }
}
