export interface TodoProps {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export interface TodoWithUserProps extends TodoProps {
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
  };
}
