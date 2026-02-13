import { openDB } from "./db";

export const createDebt = async (name: string, total: number = 0) => {
    const db = await openDB();

    const cleanName = name.trim();

    if (!cleanName) {
        throw new Error("Debt name is required");
    }

    try {
        return await db.runAsync(
            "INSERT INTO debts (name, total) VALUES (?, ?)",
            [cleanName, total]
        );

    } catch (e: any) {
        if (e.message?.includes("UNIQUE")) {
            throw new Error("Debt name already exists");
        }
        throw e;
    }
};

// =======================================
export const getCustomers = async () => {
    const db = await openDB();
    return await db.getAllAsync("SELECT * FROM customers ORDER BY name");
};


export const getCustomerById = async (id: number) => {
    const db = await openDB();
    return await db.getFirstAsync("SELECT * FROM customers WHERE id = ?", [id]);
};


export const updateCustomer = async (
    id: number,
    name: string,
    phone?: string
) => {
    const db = await openDB();
    await db.runAsync(
        "UPDATE customers SET name = ?, phone = ? WHERE id = ?",
        [name, phone ?? null, id]
    );
};


export const deleteCustomer = async (id: number) => {
    const db = await openDB();
    await db.runAsync("DELETE FROM customers WHERE id = ?", [id]);
};


// =======================================
// RECORD CRUD
// =======================================
export const createRecord = async (
    debtId: number,
    customerId: number,
    amount: number
) => {
    const db = await openDB();


    await db.execAsync("BEGIN TRANSACTION;");


    await db.runAsync(
        "INSERT INTO records (debt_id, customer_id, amount) VALUES (?, ?, ?)",
        [debtId, customerId, amount]
    );


    await db.runAsync(
        "UPDATE debts SET total = total + ? WHERE id = ?",
        [amount, debtId]
    );


    await db.execAsync("COMMIT;");
};


export const getRecordsByDebt = async (debtId: number) => {
    const db = await openDB();
    return await db.getAllAsync(
        `SELECT r.id, r.amount, r.datetime, c.name AS customer
            FROM records r
            JOIN customers c ON r.customer_id = c.id
            WHERE r.debt_id = ?
            ORDER BY r.datetime DESC`,
        [debtId]
    );
};


export const deleteRecord = async (id: number) => {
    const db = await openDB();


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