export class Transaction {
    constructor(public date: string, public amount: number, public category: string, public note: string) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.date = date;
        this.amount = amount;
        this.category = category;
        this.note = note;
    }
}