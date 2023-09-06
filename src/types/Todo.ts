// eslint-disable-next-line import/extensions,@typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/extensions
import { User } from './.User';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | null;
};
