import { Todo } from './Todo';
type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type Props = {
  setTodos: SetState<Todo[]>;
  title: string;
  setTitle: SetState<string>;
  titleError: boolean;
  setTitleError: SetState<boolean>;
  selectedUserId: number;
  setSelectedUserId: SetState<number>;
  userIdError: boolean;
  setUserIdError: SetState<boolean>;
};
