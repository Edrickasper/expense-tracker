import { Injectable } from "@angular/core";

import { Transaction } from "../models/transaction.model";

@Injectable() 

export class TransactionService {
    private transactions:Transaction[] = [
        new Transaction('Thu Oct 31 2024', 5000, 'Clothes', 'Diwali'),
        new Transaction('Mon Oct 21 2024', 500, 'Food', 'Dinner'),
        new Transaction('Mon Oct 21 2024', 5000, 'Clothes', 'Diwali')
    ]
    
    getTransactions() {
        return this.transactions.slice();
    }
}