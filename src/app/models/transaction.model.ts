export class Transaction {
    constructor(public date: string, public amount: number, public category: string, public note: string) {
        this.date = date;
        this.amount = amount;
        this.category = category;
        this.note = note;
    }
}