import { useEffect, useState } from 'react';
import { Todo, User } from '../../types/index';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import usersFromServer from '../../api/users';

export function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  // if there is no user with a given userId
  return foundUser || null;
}

type Props = {
  todos: Todo[];
  title: string;
  userId: number | null;
  buttonClicked: boolean
  titleChange: (x: string) => void;
  userIdChange: (x: number) => void;
  formSubmittedChange: (x: boolean) => void;
  buttonClickedChange: (x: boolean) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  title,
  userId,
  buttonClicked,
  titleChange,
  userIdChange,
  formSubmittedChange,
  buttonClickedChange,
}) => {
  const [updatedTodos, setUpdatedTodos] = useState(todos);

  useEffect(() => {
    if (buttonClicked) {
      if (title && userId) {
        const newTodo = {
          id: Math.max(...updatedTodos.map(todo => todo.id)) + 1,
          title,
          completed: false,
          userId: Number(userId),
          user: getUser(Number(userId)),
        };

        buttonClickedChange(false);
        setUpdatedTodos([...updatedTodos, newTodo]);
        formSubmittedChange(false);
        titleChange('');
        userIdChange(0);
      } else {
        buttonClickedChange(false);
        formSubmittedChange(true);
      }

      buttonClickedChange(false);
    }
  }, [buttonClicked]);

  return (
    <section className="TodoList">
      {updatedTodos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
