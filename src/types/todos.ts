// Імпортуємо інтерфейс користувача з сусіднього файлу
import { User } from './user';

// Оголошуємо та експортуємо інтерфейс завдання
export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user: User;
}
