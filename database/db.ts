// src/database/db.ts
import * as SQLite from "expo-sqlite";

const DB_NAME = "manh_app.db";

let dbInstance: SQLite.SQLiteDatabase | null = null;

/**
 * Open database (singleton)
 */
export const openDB = async () => {
  if (dbInstance) {
    return dbInstance;
  }

  dbInstance = await SQLite.openDatabaseAsync(DB_NAME);
  return dbInstance;
};

/**
 * Initialize database schema + migrations
 */
export const initDatabase = async () => {
  const db = await openDB();

  // Ensure foreign keys work on Android
  await db.execAsync(`PRAGMA foreign_keys = ON;`);

  const result = await db.getFirstAsync<{
    user_version: number;
  }>("PRAGMA user_version;");

  const version = result?.user_version ?? 0;

  // ===== Version 0 → Initial schema =====
  if (version === 0) {
    console.log("📦 Initializing SQLite database (v1)...");

    await db.execAsync(`
      BEGIN TRANSACTION;

      CREATE TABLE IF NOT EXISTS debts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        total REAL NOT NULL DEFAULT 0,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS note (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT
      );

      CREATE TABLE IF NOT EXISTS records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        debt_id INTEGER NOT NULL,
        note TEXT NULL,
        amount REAL NOT NULL,
        datetime TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (debt_id) REFERENCES debts(id) ON DELETE CASCADE
      );

      PRAGMA user_version = 1;

      COMMIT;
    `);

    console.log("✅ SQLite initialized successfully");
  }

  return db;
};

/**
 * Drop database (DEV ONLY)
 */
export const dropDatabase = async () => {
  try {
    dbInstance = null;
    await SQLite.deleteDatabaseAsync(DB_NAME);
    console.log("🗑 Database deleted successfully");
  } catch (error) {
    console.log("❌ Delete DB error:", error);
  }
};