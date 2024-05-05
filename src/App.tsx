import './App.scss';

import usersFromServer from './api/users';

import { useState } from 'react';
import { todosWithUser } from './services/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { newIdTodo } from './services/newId';
import { filterInput } from './services/filterInput';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(todosWithUser);
  const [newTodo, setNewTodo] = useState<Todo>({
    id: 0,
    title: '',
    completed: false,
    user: undefined,
    userId: 0,
  });
  const [count, setCount] = useState(0);
  const [validTitle, setValidTitle] = useState(false);
  const [validSelect, setValidSelect] = useState(false);

  const handleChangeNewTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const filterValue = filterInput(value);

    setNewTodo(prev => ({
      ...prev,
      [name]: filterValue,
      id: newIdTodo(todos),
    }));
    setValidTitle(filterValue === '');
  };

  const handleChangeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = +event.target.value;

    setNewTodo(prev => ({
      ...prev,
      user: usersFromServer.find(user => user.id === value),
      userId: value,
    }));
    setValidSelect(value === 0);
  };

  const reset = () => {
    setNewTodo({
      id: 0,
      title: '',
      completed: false,
      user: undefined,
      userId: 0,
    });
    setValidTitle(false);
    setValidSelect(false);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setValidTitle(newTodo.title === '');
    setValidSelect(newTodo.userId === 0);

    if (newTodo.title === '' || newTodo.userId === 0) {
      return;
    }

    setTodos(prev => [...prev, newTodo]);
    reset();
    setCount(prev => prev + 1);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={onSubmit} key={count}>
        <div className="field">
          <input
            name="title"
            type="text"
            data-cy="titleInput"
            value={newTodo.title}
            onChange={handleChangeNewTodo}
            placeholder="Enter a title"
          />
          {validTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={newTodo.userId}
            onChange={handleChangeUser}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {validSelect && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
