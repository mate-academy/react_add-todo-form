import './App.scss';
import { TodoList } from './components/TodoList/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useMemo, useState } from 'react';

import { UserMap } from './components/types/types';
import { User } from './components/types/types';
import { Todo } from './components/types/types';

export const App = () => {
  const userMap = useMemo(() => {
    return usersFromServer.reduce((acc: UserMap, user: User) => {
      return {
        ...acc,
        [user.id]: user,
      };
    }, {});
  }, []);

  const initialTodos = useMemo(() => {
    return todosFromServer.map(todo => {
      return {
        ...todo,
        user: userMap[todo.userId],
      };
    });
  }, [userMap]);

  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [formData, setFormData] = useState({
    title: '',
    userId: 0,
  });
  const [errors, setErrors] = useState({
    title: '',
    userId: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    let processedValue = value;

    if (name === 'title') {
      processedValue = value.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '');
    }

    if (errors[name as keyof typeof errors]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: '',
      }));
    }

    setFormData(prevData => ({
      ...prevData,
      [name]: processedValue,
    }));
  };

  const onTodoAdd = (event: React.FormEvent) => {
    event.preventDefault();

    const newErrors = { title: '', userId: '' };
    let isValid = true;

    if (!formData.title.trim()) {
      newErrors.title = 'Please enter a title';
      isValid = false;
    }

    if (String(formData.userId) === '0') {
      newErrors.userId = 'Please choose a user';
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) {
      return;
    }

    const newTodo: Todo = {
      id: Math.max(...todos.map(t => t.id)) + 1,
      userId: Number(formData.userId),
      title: formData.title.trim(),
      completed: false,
      user: userMap[Number(formData.userId)],
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);

    setFormData({ title: '', userId: 0 });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={onTodoAdd}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter title"
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {errors.userId && <span className="error">{errors.userId}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
