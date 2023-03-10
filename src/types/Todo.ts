export class Todo {
  completed = false;

  constructor(
    public id: number,
    public title: string,
    public userId: number,
  ) {}
}
