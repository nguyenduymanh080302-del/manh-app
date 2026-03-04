import dayjs from "dayjs";
import { initDatabase } from "./db";

export const getDebts = async () => {
    const db = await initDatabase();
    return await db.getAllAsync("SELECT * FROM debts ORDER BY created_at DESC");
}

export const getDebtById = async (id: number) => {
    const db = await initDatabase();
    return await db.getFirstAsync("SELECT * FROM debts WHERE id = ?", [id]);
}

export const createDebt = async (name: string, total: number = 0) => {
    const db = await initDatabase();

    const cleanName = name.trim();

    if (!cleanName) {
        throw new Error("Debt name is required");
    }

    try {
        return await db.runAsync(
            "INSERT INTO debts (name, total, created_at) VALUES (?, ?, ?)",
            [cleanName, total, dayjs().format('YYYY-MM-DD HH:mm:ss')]
        );

    } catch (e: any) {
        if (e.message?.includes("UNIQUE")) {
            throw new Error("Debt name already exists");
        }
        throw e;
    }
};

export const updateDebt = async (id: number, name: string, total: number) => {
    const db = await initDatabase();

    const cleanName = name.trim();

    if (!cleanName) {
        throw new Error("Debt name is required");
    }

    try {
        return await db.runAsync(
            "UPDATE debts SET name = ?, total = ? WHERE id = ?",
            [cleanName, total, id]
        );

    } catch (e: any) {
        if (e.message?.includes("UNIQUE")) {
            throw new Error("Debt name already exists");
        }
        throw e;
    }
};

export const deleteDebt = async (id: number) => {
    const db = await initDatabase();
    await db.runAsync("DELETE FROM debts WHERE id = ?", [id]);
};

// =======================================
export const getCustomers = async () => {
    const db = await initDatabase();
    return await db.getAllAsync("SELECT * FROM note ORDER BY name");
};


export const getCustomerById = async (id: number) => {
    const db = await initDatabase();
    return await db.getFirstAsync("SELECT * FROM note WHERE id = ?", [id]);
};


export const updateCustomer = async (
    id: number,
    name: string,
    phone?: string
) => {
    const db = await initDatabase();
    await db.runAsync(
        "UPDATE note SET name = ?, phone = ? WHERE id = ?",
        [name, phone ?? null, id]
    );
};


export const deleteCustomer = async (id: number) => {
    const db = await initDatabase();
    await db.runAsync("DELETE FROM note WHERE id = ?", [id]);
};


// =======================================
// RECORD CRUD
// =======================================
export const createRecord = async (
    debtId: number,
    note: string,
    amount: number
) => {
    const db = await initDatabase();

    await db.execAsync("BEGIN TRANSACTION;");
    try {
        await db.runAsync(
            "INSERT INTO records (debt_id, note, amount) VALUES (?, ?, ?)",
            [debtId, note || null, amount]
        );

        await db.runAsync(
            "UPDATE debts SET total = total + ? WHERE id = ?",
            [amount, debtId]
        );

        await db.execAsync("COMMIT;");
    } catch (e) {
        await db.execAsync("ROLLBACK;");
        throw e;
    }
};


export const getRecordsByDebt = async (debtId: number) => {
    const db = await initDatabase();
    return await db.getAllAsync(
        `SELECT r.id, r.amount, r.datetime, r.note
            FROM records r
            WHERE r.debt_id = ?
            ORDER BY r.datetime DESC`,
        [debtId]
    );
};


export const deleteRecord = async (id: number) => {
    const db = await initDatabase();


    const record = await db.getFirstAsync<{
        amount: number;
        debt_id: number;
    }>("SELECT amount, debt_id FROM records WHERE id = ?", [id]);


    if (!record) return;


    await db.execAsync("BEGIN TRANSACTION;");


    await db.runAsync("DELETE FROM records WHERE id = ?", [id]);


    await db.runAsync(
        "UPDATE debts SET total = total - ? WHERE id = ?",
        [record.amount, record.debt_id]
    );

    await db.execAsync("COMMIT;");
};