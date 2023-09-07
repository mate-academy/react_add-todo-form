export interface TodoType {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export interface UserType {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface FormType {
  titleInput: string;
  userSelect: number;
}
