type Debt = {
    id: number
    name: string
    total: number | string
    created_at?: string | number | Date
}

type DebtRecord = {
    id: number
    debt_id: number
    amount: number | string
    note?: string
    datetime?: string | number | Date
}