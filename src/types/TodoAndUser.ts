export interface TodoAndUser {
  User: {
    id?: number | undefined;
    name?: string | undefined;
    username?: string | undefined;
    email?: string | undefined;
  };
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}
