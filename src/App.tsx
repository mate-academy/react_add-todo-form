import { useState } from 'react';
import './App.scss';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [actualTodos, setActualTodos] = useState<Todo[]>(todosFromServer);
  const actualUsers: User[] = [...usersFromServer];
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('0');
  const [checkUser, setCheckUser] = useState(false);
  const [checkTitle, setCheckTitle] = useState(false);

  const handleTitleChange = () => {
    setCheckTitle(false);
  };

  const handleUserChange = () => {
    setCheckUser(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setCheckTitle(!title
      && !(title.length > 0
      && title.split(' ').length - 1 === title.length));
    setCheckUser(userId === '0');

    const newTodo: Todo = {
      title,
      id: +Math.max(...actualTodos.map(o => o.id)) + 1,
      userId: +userId,
      completed: false,
    };

    if (!!title
      && userId !== '0'
      && !(title.split(' ').length - 1 === title.length
      )) {
      setActualTodos(prevTodos => [...prevTodos, newTodo]);
      setCheckUser(false);
      setCheckTitle(false);
      setTitle('');
      setUserId('0');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Please enter a title"
            onChange={event => {
              setTitle(event.target.value);
              handleTitleChange();
            }}
          />
          {
            checkTitle && (<span className="error">Please enter a title</span>)
          }
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(event.target.value);
              handleUserChange();
            }}
          >
            <option value="0" key="-1" selected disabled>Choose a user</option>
            {
              actualUsers.map(item => (
                <option value={item.id} key={item.id}>{item.name}</option>
              ))
            }
          </select>

          {
            checkUser && (<span className="error">Please choose a user</span>)
          }
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={actualTodos} />
    </div>
  );
};
