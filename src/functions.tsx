import users from './api/users';
import { TodoWithUser } from './components/types/TodoWithUser';
import { User } from './components/types/User';
import { Todo } from './components/types/Todo';
import { TodoError } from './components/types/TodoError';

export function getUserById(userId: number): User | null {
  return users.find(currentUser => currentUser.id === userId) || null;
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
  let countSpaces = 0;

  // eslint-disable-next-line no-restricted-syntax
  for (const letter of title) {
    if (letter === ' ') {
      countSpaces += 1;
    }
  }

  if (!title || countSpaces >= title.length) {
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

export const formField = {
  handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    setNewTodo: React.Dispatch<React.SetStateAction<Todo>>,
    setTodoError: React.Dispatch<React.SetStateAction<TodoError>>,
  ): void {
    const { name, value } = e.target;

    setNewTodo(oldTodo => ({
      ...oldTodo,
      [name]: value,
    }));

    if (name === 'title') {
      checkTitle(value, setTodoError);
      setNewTodo(oldTodo => ({
        ...oldTodo,
        [name]: value,
      }));
    } else if (name === 'userId') {
      checkUserId(+value, setTodoError);
      setNewTodo(oldTodo => ({
        ...oldTodo,
        [name]: +value,
      }));
    }
  },
};
