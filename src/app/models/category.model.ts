export class Category {
  constructor(
    public name: string,
    public type: string,
    public color: string,
    public favourite: boolean
  ) {}
  public id!: string;
}
