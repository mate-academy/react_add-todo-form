import './App.scss';
import React, { FormEvent, useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo.type';
import { TodoList } from './components/TodoList';

const todosWithUser: Todo[] = todosFromServer.map(todo => {
  const curUser = usersFromServer.find(user => todo.userId === user.id);

  return {
    ...todo,
    user: curUser as Todo['user'],
  };
});

export const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [select, setSelect] = useState('0');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [todos, setTodos] = useState<Todo[]>(todosWithUser || []);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!input.trim()) {
      newErrors.input = 'Please enter a title';
    }

    if (select === '0') {
      newErrors.select = 'Please choose a user';
    }

    return newErrors;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      return;
    }

    const maxId = Math.max(...todos.map(todo => todo.id));

    const newTodo: Todo = {
      id: maxId + 1,
      title: input,
      completed: false,
      userId: +select,
      user: usersFromServer.find(user => user.id === +select)!,
    };

    setTodos([...todos, newTodo]);
    setInput('');
    setSelect('0');
    setErrors({});
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">
            {'Title: '}
            <input
              title="title"
              type="text"
              value={input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setInput(e.target.value);
                setErrors(prev => ({ ...prev, input: '' }));
              }}
              data-cy="titleInput"
              placeholder="Enter a title"
            />
          </label>
          {errors.input && <span className="error">{errors.input}</span>}
        </div>

        <div className="field">
          <label htmlFor="user">
            {'User: '}
            <select
              title="user"
              data-cy="userSelect"
              value={select}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setSelect(e.target.value);
                setErrors(prev => ({ ...prev, select: '' }));
              }}
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
          </label>
          {errors.select && <span className="error">{errors.select}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
