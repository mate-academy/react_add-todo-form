import users from './api/users';
import { TodoWithUser } from './components/types/TodoWithUser';
import { User } from './components/types/User';
import { Todo } from './components/types/Todo';
import { TodoError } from './components/types/TodoError';

export function getUserById(userId: number): User {
  return [...users].filter(currentUser => currentUser.id === userId)[0];
}

export function getTodosWithUsers(todos: Todo[]): TodoWithUser[] {
  return todos.map(todo => {
    const { userId } = todo;

    return {
      ...todo,
      user: getUserById(userId),
    };
  });
}

export const checkTitle = (
  title: string,
  setTodoError: React.Dispatch<React.SetStateAction<TodoError>>,
) => {
  const isValidPattern = /^[a-zA-Zа-яА-Я0-9\s]*$/.test(title);

  if (!title) {
    setTodoError(prevErrors => ({
      ...prevErrors,
      title: 'Please enter a title',
    }));
  } else if (!isValidPattern) {
    setTodoError(prevErrors => ({
      ...prevErrors,
      title: 'Please enter valid title',
    }));
  } else {
    setTodoError(prevErrors => ({
      ...prevErrors,
      title: '',
    }));
  }
};

export const checkUserId = (
  userId: number,
  setTodoError: React.Dispatch<React.SetStateAction<TodoError>>,
) => {
  if (userId === 0) {
    setTodoError(prevErrors => ({
      ...prevErrors,
      userId: 'Please choose a user',
    }));
  } else {
    setTodoError(prevErrors => ({
      ...prevErrors,
      userId: '',
    }));
  }
};

export const clearForm = (
  setNewTodo: React.Dispatch<React.SetStateAction<Todo>>,
  setTodoError: React.Dispatch<React.SetStateAction<TodoError>>,
) => {
  setNewTodo({
    id: 0,
    title: '',
    completed: false,
    userId: 0,
  });

  setTodoError({
    title: '',
    userId: '',
  });
};
