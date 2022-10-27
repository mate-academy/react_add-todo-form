import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { ExtendedTodo, Todo } from './types/todo';
import { User } from './types/user';

const extendTodo = (
  todos: Todo[],
  users: User[],
): ExtendedTodo[] => {
  return todos.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId),
  }));
};

const extendedTodo = extendTodo(
  todosFromServer,
  usersFromServer,
);

export const App:React.FC = () => {
  const [newTodos, setTodos] = useState<ExtendedTodo[]>(extendedTodo);
  const [title, setTitle] = useState('');
  const [selectedUser, setUser] = useState(0);
  const [noUserError, setNoUser] = useState(false);
  const [noTitleError, setNoTitle] = useState(false);

  const addTodo = (todo: ExtendedTodo) => {
    setTodos(prevTodos => [...prevTodos, todo]);
  };

  const resetForm = () => {
    setTitle('');
    setUser(0);
    setNoUser(false);
    setNoTitle(false);
  };

  const handleSubmit = () => {
    if (!noUserError && !noTitleError) {
      addTodo({
        id: Math.max(...newTodos.map(todo => todo.id)) + 1,
        title,
        userId: selectedUser,
        completed: false,
        user: usersFromServer.find(user => user.id === selectedUser),
      });

      resetForm();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={event => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <label className="field">
          {'Title: '}
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setNoTitle(false);
            }}
          />
        </label>

        {noTitleError
          && (<span className="error">Please enter a title</span>)}

        <div className="field">
          {'User: '}
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={event => {
              setUser(+event.target.value);
              setNoUser(false);
            }}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(user => {
              const { id, name } = user;

              return (
                <option
                  key={id}
                  value={id}
                >
                  {name}

                </option>
              );
            })}
          </select>

          {noUserError
          && (<span className="error">Please choose a user</span>)}

        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={() => {
            if (!selectedUser) {
              setNoUser(true);
            }

            if (!title) {
              setNoTitle(true);
            }
          }}
        >
          Add
        </button>
      </form>

      <TodoList todos={newTodos} />
    </div>
  );
};
