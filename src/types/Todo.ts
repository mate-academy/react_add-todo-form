import { User } from './User';

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user?: User; // Опціонально, бо ми додаємо об'єкт юзера при створенні
}
