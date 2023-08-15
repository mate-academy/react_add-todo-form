import { User } from '../../types/User';
import { TodoWithUser } from '../../types/TodoWithUser';

export const handleOnSubmit = (
  event: React.FormEvent,
  setTodos: React.Dispatch<React.SetStateAction<TodoWithUser[]>>,
  todos: TodoWithUser[],
  titleOfNewTodo: string,
  selectedUserId: number,
  usersFromServer: User[],
  setSelectedUserId: React.Dispatch<React.SetStateAction<User['id']>>,
  setTitleOfNewTodo: React.Dispatch<React.SetStateAction<string>>,
  setShowErrorEmptyTitle: React.Dispatch<React.SetStateAction<boolean>>,
  setShowErrorUserIsNotChoosen: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  event.preventDefault();

  if (titleOfNewTodo.trim() === '') {
    setShowErrorEmptyTitle(true);
    setTitleOfNewTodo('');
  } else {
    setShowErrorEmptyTitle(false);
  }

  if (selectedUserId === 0) {
    setShowErrorUserIsNotChoosen(true);
  } else {
    setShowErrorUserIsNotChoosen(false);
  }

  if (titleOfNewTodo.trim() !== '' && selectedUserId !== 0) {
    const newTodo = {
      id: todos.length + 1,
      title: titleOfNewTodo.trim(),
      completed: false,
      userId: selectedUserId,
      user: usersFromServer.find(user => user.id === selectedUserId) as User,
    };

    setTodos([...todos, newTodo]);
    setSelectedUserId(0);
    setTitleOfNewTodo('');
    setShowErrorEmptyTitle(false);
    setShowErrorUserIsNotChoosen(false);
  }
};
