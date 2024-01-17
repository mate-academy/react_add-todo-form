/* eslint-disable no-console */
import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './components/types';

export const App = () => {
  const todosWithUsers = todosFromServer.map(todo => {
    const user = usersFromServer.find(us => us.id === todo.userId) || undefined;

    return { ...todo, user };
  });

  const [todoList, setTodoList] = useState<Todo[]>(todosWithUsers);
  const [title, setTitle] = useState<string>('');
  const [select, setSelect] = useState('');
  const [tochTitle, setTochTitle] = useState(false);
  const [tochUserSelect, setTochUserSelect] = useState(false);

  function addTodo(event: React.FormEvent) {
    event.preventDefault();

    setTochTitle(true);
    setTochUserSelect(true);

    if (title && select) {
      const newTodoUser = usersFromServer.find(user => user.name === select);

      const newTodo = {
        id: Math.max(...todoList.map(post => Number(post.id))) + 1,
        title: title.trim(),
        completed: false,
        userId: newTodoUser?.id || 0,
        user: newTodoUser,
      };

      setTodoList(prev => ([...prev, newTodo]));

      setTitle('');
      setSelect('');
      setTochTitle(false);
      setTochUserSelect(false);
    }
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={addTodo}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setTochTitle(false);
            }}
          />
          {(!title && tochTitle)
          && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={select}
            onChange={(event) => setSelect(event.target.value)}
          >
            <option value="" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>

          {(!select && tochUserSelect)
          && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todoList={todoList} />
    </div>
  );
};
