export class Category {
    constructor(private name: string, private type: string, private color: string, private favourite: boolean) {
        this.name = name;
        this.type = type;
        this.color = color;
        this.favourite = favourite;
    }
}