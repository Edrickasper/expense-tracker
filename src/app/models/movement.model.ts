export class Movement {
  constructor(
    public purpose: string,
    public date: string,
    public amount: number,
    public category: string,
    public note?: string,
    public id?: string,
  ) { }
}
