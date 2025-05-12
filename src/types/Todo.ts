import { User } from './User';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User; // Esse campo será adicionado ao carregar os dados
}
