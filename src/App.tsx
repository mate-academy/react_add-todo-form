import './App.scss';
import React, { useState } from 'react';
import customers from './api/users';
import todosDefault from './api/todos';
import { TodoList } from './components/TodoList';
import { getUserNameByUserId } from './components/function/getUserNameByUserId';

type Todo = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user?: User;
};

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

const todosWithUser : Todo[] = todosDefault.map((todo) => {
  const user = getUserNameByUserId(todo.userId, todosDefault, customers);

  return { ...todo, user };
});

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(todosWithUser);
  const [users] = useState<User[]>(customers);

  const [newTodo, setNewTodo] = useState<Todo>({
    id: 1,
    title: '',
    userId: 0,
    completed: false,
    user: {
      id: 0,
      name: '',
      username: '',
      email: '',
    },
  });

  const [errors, setErrors] = useState<{ title: string; user: string }>({
    title: '',
    user: '',
  });

  const getNextId = () => {
    const maxId = todos.length > 0 ? Math.max(
      ...todos.map((todo) => todo.id),
    ) : 0;

    return maxId + 1;
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;

    setNewTodo({
      ...newTodo,
      title: title.replace(/[^a-zA-Z0-9\s]/g, ''),
    });
    if (title.trim() === '') {
      setErrors({ ...errors, title: 'Please enter a title' });
    } else {
      setErrors({ ...errors, title: '' });
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = parseInt(event.target.value, 10);

    setNewTodo({ ...newTodo, userId });
    if (userId === 0) {
      setErrors({ ...errors, user: 'Please choose a user' });
    } else {
      setErrors({ ...errors, user: '' });
    }
  };

  const handleAddTodo = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (newTodo.title.trim() === '' || newTodo.userId === 0) {
      setErrors({
        title: newTodo.title.trim() === '' ? 'Please enter a title' : '',
        user: newTodo.userId === 0 ? 'Please choose a user' : '',
      });

      return;
    }

    const nextId = getNextId();

    const userInNewTodo = getUserNameByUserId(
      newTodo.userId, [newTodo], customers,
    );

    const newTodoWithId: Todo = {
      ...newTodo,
      user: userInNewTodo,
      id: nextId,
    };

    setTodos(prevTodos => [...prevTodos, newTodoWithId]);

    setNewTodo({
      id: nextId + 1,
      title: '',
      userId: 0,
      completed: false,
    });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="#" method="POST">
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Add you task"
            value={newTodo.title}
            onChange={handleTitleChange}
          />
          <span className="error">{errors.title}</span>
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={newTodo.userId}
            onChange={handleUserChange}
          >
            <option value={0} disabled>
              Choose a user
            </option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          <span className="error">{errors.user}</span>
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={(e) => handleAddTodo(e)}
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
