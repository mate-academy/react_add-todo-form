import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { User } from './types/User';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId) || null,
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(preparedTodos);
  const [todoTitle, setTodoTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('0');
  const [hasTodoError, setTodoError] = useState(false);
  const [hasSelectedUserError, setSelectedUserError] = useState(false);

  const getMaxId = () => {
    const sortedTodos = [...todos]
      .sort((todo1, todo2) => todo1.id - todo2.id);

    return sortedTodos[sortedTodos.length - 1].id + 1;
  };

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();

    setTodoError(!todoTitle);
    setSelectedUserError(selectedUser === '0');

    const newTodo: Todo = {
      id: getMaxId(),
      title: todoTitle,
      completed: false,
      user: getUser(+selectedUser),
    };

    if (!todoTitle || !newTodo.user) {
      return;
    }

    setTodos(currentToDo => [...currentToDo, newTodo]);
    setTodoTitle('');
    setSelectedUser('0');
    setSelectedUserError(false);
    setTodoError(false);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={onSubmit}>
        <div className="field">
          <input
            value={todoTitle}
            type="text"
            data-cy="titleInput"
            onChange={event => {
              setTodoError(false);
              setTodoTitle(event.target.value.replace(/[^a-zA-Z0-9]/g, ''));
            }}
          />

          {hasTodoError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            value={selectedUser}
            data-cy="userSelect"
            onChange={event => {
              setSelectedUserError(false);
              setSelectedUser(event.target.value);
            }}
          >
            <option
              value="0"
              disabled
            >
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {hasSelectedUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList preparedTodos={todos} />
    </div>
  );
};
