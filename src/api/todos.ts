import { User } from './users';

export interface TodosInterFace {
  id: number,
  title: string,
  completed: boolean,
  userId: number | undefined,
  person: User | null,
}

export default [
  {
    id: 1,
    title: 'delectus aut autem',
    completed: true,
    userId: 1,
  },
  {
    id: 15,
    title: 'some other todo',
    completed: false,
    userId: 1,
  },
  {
    id: 2,
    title: 'quis ut nam facilis et officia qui',
    completed: false,
    userId: 4,
  },
];
