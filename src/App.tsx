import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';

import { Todo } from './types/Todo';
import { User } from './types/User';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(userss => userss.id === todo.userId) || null,
}));

export const App = () => {
  const [name, setName] = useState('');
  const [userName, setUser] = useState(usersFromServer
    .find(users => todosFromServer
      .find(todo => users.id === todo.userId)) || null);
  const [todos, setTodos] = useState<Todo[]>([...preparedTodos]);

  const addTodo = (title: string, user: User | null) => {
    const newTodo = {
      id: preparedTodos.length + 1,
      userId: 1,
      title,
      user,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo(name, userName);
  };

  // const errorTitle = <span className="error">Please enter a title</span>;
  // const errorUser = <span className="error">Please choose a user</span>;

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action=" /api/users "
        method=" POST "
        onSubmit={handleSubmit}
      >
        <div className="field">
          Name:
          {' '}
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />

        </div>

        <div className="field">
          User:
          <select
            name="users"
            id="0"
            onChange={(event) => {
              const { value } = event.target;
              const needUser = usersFromServer
                .find(item => item.name === value);

              setUser(needUser || null);
            }}
          >
            <option
              value="0"
              selected
              disabled
            >
              Choose a user
            </option>
            { usersFromServer
              .map(users => (
                <option value={users.name}>{users.name}</option>
              ))}
          </select>

        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={preparedTodos} />
      </section>
    </div>
  );
};
