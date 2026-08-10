import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { useState } from 'react';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { TodoItem } from './types/TodoItem';

function findMaxTodoId(todos: Todo[]) {
  return todos.reduce((max, todo) => {
    return todo.id > max ? todo.id : max;
  }, 0);
}

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [title, setTitle] = useState<string>('');
  const [selectedUserId, setSelectedUserId] = useState<number>(0);

  const [isTitleUnfilled, setIsTitleUnfilled] = useState<boolean>(false);
  const [isUserUnselected, setIsUserUnselected] = useState<boolean>(false);

  const preparedTodos = todos.map(todo => {
    const user = usersFromServer.find(currentUser => {
      return currentUser.id === todo.userId;
    });

    return {
      ...todo,
      user: user || { id: 0, name: 'Unknown', username: '', email: '' },
    };
  });

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={(event: React.FormEvent) => {
          event.preventDefault();

          const hasError = !title.trim() || selectedUserId === 0;

          setIsTitleUnfilled(!title.trim());
          setIsUserUnselected(selectedUserId === 0);

          if (hasError) {
            return;
          }

          const newTodo: TodoItem = {
            id: findMaxTodoId(todos) + 1,
            title: title.trim(),
            completed: false,
            userId: selectedUserId,
            user: usersFromServer.find(u => u.id === selectedUserId) || {
              id: 0,
              name: 'Unknown',
              username: '',
              email: '',
            },
          };

          setTitle('');
          setSelectedUserId(0);

          setTodos([...todos, newTodo]);
        }}
      >
        <div className="field">
          <label htmlFor="title-input">Title:</label>
          <input
            placeholder="Title"
            id="title-input"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setIsTitleUnfilled(false);
            }}
          />
          {isTitleUnfilled && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user-select">User:</label>
          <select
            id="user-select"
            data-cy="userSelect"
            onChange={event => {
              setSelectedUserId(+event.target.value);
              setIsUserUnselected(false);
            }}
            value={selectedUserId}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map((user: User) => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {isUserUnselected && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={preparedTodos} />
    </div>
  );
};
