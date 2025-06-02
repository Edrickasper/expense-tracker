import { Component, OnInit } from '@angular/core';

import { Transaction } from '../models/transaction.model';
import { TransactionService } from './transaction.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent implements OnInit {
  transactions!: Transaction[]

  public today = new Date().toString();

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    this.transactions = this.transactionService.getTransactions();
  }
}
