import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

let maxId = [...todosFromServer].sort((a, b) => b.id - a.id)[0].id;

const addTodo = (todo: string, userId: number) => {
  maxId += 1;

  const todoAdd = {
    id: maxId,
    completed: false,
    title: todo,
    userId,
    user: getUser(userId),
  };

  todos.push(todoAdd);
};

export const App = () => {
  const [toDo, setToDo] = useState('');
  const [user, setUser] = useState('');

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();
          addTodo(toDo, Number(user));
          setToDo('');
          setUser('');
        }}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={toDo}
            onChange={(event) => setToDo(event.target.value)}
          />
          {toDo.length < 1
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            name="user"
            value={user}
            onChange={(event) => setUser(event.target.value)}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(({ id, name }) => (
              <option value={id} key={id}>{name}</option>
            ))}
          </select>

          <span className="error">Please choose a user</span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
