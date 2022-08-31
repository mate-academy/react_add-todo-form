import { FormEvent, useState } from 'react';
import './App.scss';

import { TodoList } from './components/TodoList/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';

function getUser(usrId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === usrId);

  return foundUser || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [todoList, setTodoList] = useState(todos);
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [isTitle, setIsTitle] = useState(false);
  const [isUser, setIsUser] = useState(false);

  const maxId = () => {
    return Math.max(...todoList.map(todo => todo.id)) + 1;
  };

  const addTodo = () => {
    const newTodo = {
      id: maxId(),
      title,
      completed: false,
      userId,
      user: getUser(userId),
    };

    setTodoList(currentTodos => {
      return [...currentTodos, newTodo];
    });
  };

  const handeSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (title.length === 0) {
      setIsTitle(true);
    }

    if (userId === 0) {
      setIsUser(true);
    }

    if (title.length > 0 && userId > 0) {
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
        action="api/users"
        method="POST"
        onSubmit={handeSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter the title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
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
              setUserId(+event.target.value);
            }}
          >
            <option
              value=""
            >
              Choose a user
            </option>

            {usersFromServer.map(user => {
              const { id, name } = user;

              return (
                <option
                  value={id}
                  key={id}
                >
                  {name}
                </option>
              );
            })}
          </select>

          {(isUser && userId === 0)
            && (<span className="error">Please choose a user</span>)}
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
