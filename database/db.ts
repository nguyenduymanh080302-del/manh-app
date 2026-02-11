// src/database/db.ts
import * as SQLite from "expo-sqlite";

export const openDB = async () => {
  return await SQLite.openDatabaseAsync("manh_app.db");
};


// src/database/db.ts
export const initDatabase = async () => {
  const db = await openDB();

  const result = await db.getFirstAsync<{
    user_version: number;
  }>("PRAGMA user_version;");

  const version = result?.user_version ?? 0;

  if (version === 0) {
    console.log("📦 Initializing SQLite database...");

    await db.execAsync(`
      CREATE TABLE debts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        total REAL DEFAULT 0,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE customers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT
      );

      CREATE TABLE records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        debt_id INTEGER NOT NULL,
        customer_id INTEGER NOT NULL,
        amount REAL NOT NULL,
        datetime TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (debt_id) REFERENCES debts(id),
        FOREIGN KEY (customer_id) REFERENCES customers(id)
      );

      PRAGMA user_version = 1;
    `);
  }

  return db;
};
