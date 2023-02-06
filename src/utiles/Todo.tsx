import { User } from '../types/User';

export class Todo {
  completed = false;

  constructor(
    public id: number,
    public title: string,
    public userId: number,
    public user: User | null,
  ) {}
}
