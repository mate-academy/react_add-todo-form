import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { ToDoWithUser } from './components/types';

export const App = () => {
  const todosWithUsers = todosFromServer.map(todo => {
    const user = usersFromServer[usersFromServer
      .map(userFromServer => userFromServer.id)
      .indexOf(todo.userId)];

    return { ...todo, user };
  });

  const [todoList, setTodoList] = useState<ToDoWithUser[]>(todosWithUsers);
  const [title, setTitle] = useState<string>('');
  const [select, setSelect] = useState('');
  const [touch, setTouch] = useState(false);
  const [touchUserSelect, setTouchUserSelect] = useState(false);

  function addTodo(event: React.FormEvent) {
    event.preventDefault();

    setTouch(true);
    setTouchUserSelect(true);

    if (title && select) {
      const newTodoUser = usersFromServer[usersFromServer
        .map(user => user.name).indexOf(select)];

      const newTodo = {
        id: Math.max(...todoList.map(post => Number(post.id))) + 1,
        title,
        completed: false,
        userId: newTodoUser.id,
        user: newTodoUser,
      };

      setTodoList(prev => ([...prev, newTodo]));

      setTitle('');
      setSelect('');
      setTouch(false);
      setTouchUserSelect(false);
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
              setTouch(false);
            }}
          />
          {(!title && touch)
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

          {(!select && touchUserSelect)
            && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todoList} />
    </div>
  );
};
