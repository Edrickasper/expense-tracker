export class Movement {
  constructor(
    public date: string,
    public amount: number,
    public category: string,
    public note: string,
    public id?: string,
    public deletedDate?: string
  ) { }
}
