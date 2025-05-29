import { SubmitProps } from '../../utilities/types/SubmitProps';
import usersFromServer from '../../api/users';

import { Todo } from '../types/Todo';

export function handleSubmit({
  setId,
  setTodos,
  id,
  title,
  user,
  setShowErrorTitle,
  setShowErrorUser,
  setTitle,
  setUser,
}: SubmitProps) {
  setId(prev => prev + 1);
  const newUser: Todo = {
    id: id,
    title: title,
    completed: false,
    userId: user,
    user: usersFromServer.find(us => us.id === user) || null,
  };

  if (!title) {
    setShowErrorTitle(true);
  }

  if (user === 0) {
    setShowErrorUser(true);
  }

  if (user === 0 || !title) {
    return;
  }

  setShowErrorUser(false);
  setShowErrorTitle(false);
  setTodos(prev => [...prev, newUser]);

  setTitle('');
  setUser(0);
}
