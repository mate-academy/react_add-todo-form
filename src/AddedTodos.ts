export class AddedTodos {
  completed = false;

  constructor(
    public title: string,
    public userId: number,
    public id: number,
  ) {}
}
