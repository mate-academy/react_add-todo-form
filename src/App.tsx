import { FormEvent, useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

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

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [todoList, setTodoList] = useState(todos);
  const [isTitle, setIsTitle] = useState(false);
  const [isUser, setIsUser] = useState(false);

  const generateMaxId = () => (
    Math.max(...todoList.map(todo => todo.id)) + 1
  );

  const addTodo = () => {
    const newTodo = {
      id: generateMaxId(),
      title,
      completed: false,
      userId,
      user: getUser(userId),
    };

    setTodoList(listOfTodos => {
      return [...listOfTodos, newTodo];
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (title.length === 0) {
      setIsTitle(true);
    }

    if (userId === 0) {
      setIsUser(true);
    }

    if (title.length > 0
        && userId !== 0) {
      addTodo();
      setTitle('');
      setUserId(0);
      setIsTitle(false);
      setIsUser(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter the title"
            value={title}
            onChange={(event) => {
              const { value } = event.target;

              setTitle(value);
            }}
          />
          {(isTitle && title.length === 0)
            && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={(event) => {
              const { value } = event.target;

              setUserId(+value);
            }}
          >
            <option value="0">
              Choose a user
            </option>

            {usersFromServer.map(userFromServer => {
              const { id, name } = userFromServer;

              return <option value={id} key={id}>{name}</option>;
            })}

          </select>
          {(isUser && userId === 0)
            && (
              <span className="error">
                Please choose a user
              </span>
            )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todoList} />
    </div>
  );
};
