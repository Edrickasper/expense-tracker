import { Injectable } from "@angular/core";
import { Category } from "../models/category.model";

@Injectable()

export class CategoryService {
    private categories: Category[] = [
        new Category('food', 'expense', 'red', false),
        new Category('clothes', 'expense', 'green', false),
        new Category('salary', 'income', 'blue', false),
    ]

    getCategory() {
        return this.categories.slice();
    }
}