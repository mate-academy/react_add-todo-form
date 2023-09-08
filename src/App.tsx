import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';
import { Todo, UserData } from './types';

const getUserData = (userId:number):UserData => {
  return usersFromServer.find(user => user.id === userId) || {} as UserData;
};

export const App = () => {
  const [userId, setUserId] = useState<number>(0);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>(todosFromServer.map(todo => ({
    ...todo,
    user: getUserData(todo.userId),
  })) as Todo[]);

  const submitTodo = (user: UserData) => {
    if (!user.id || title.trim().length === 0) {
      return setIsClicked(true);
    }

    const id = ([...todos].sort((a:Todo, b:Todo) => a.id - b.id)
      .pop() as Todo).id + 1;

    setTitle('');
    setUserId(0);

    setTodos(list => [...list, {
      id,
      title,
      user,
      completed: false,
    }]);

    return setIsClicked(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={(e) => {
          e.preventDefault();
          submitTodo(getUserData(userId));
        }}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {isClicked && title.length === 0
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={(e) => setUserId(Number(e.target.value))}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map((user:UserData) => {
              return <option key={user.id} value={user.id}>{user.name}</option>;
            })}
          </select>

          {isClicked && userId === 0
            && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
