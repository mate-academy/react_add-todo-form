import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

function getUser(userId: number): User | null {
  const todosUser = usersFromServer.find(user => user.id === userId);

  return todosUser || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [newTodo, setNewTodo] = useState({ title: '', userId: '' });
  const [displayedTodos, setdisplayedTodos] = useState(todos);
  const [isNoTitle, setIsNoTitle] = useState(false);
  const [isNoUser, setIsNoUser] = useState(false);

  const createNewTodo = () => {
    const toDoID = Math.max(...displayedTodos.map(todo => todo.id)) + 1;

    return {
      id: toDoID,
      title: newTodo.title,
      completed: false,
      user: getUser(Number(newTodo.userId)),
    };
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { title, userId } = newTodo;

    if (!title) {
      setIsNoTitle(true);
    }

    if (!userId) {
      setIsNoUser(true);
    }

    if (title && userId) {
      setdisplayedTodos([...displayedTodos, createNewTodo()]);
      setNewTodo({ title: '', userId: '' });
    }
  };

  type Event = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;

  const handleOnChange = (event: Event) => {
    const { name, value } = event.target;

    setNewTodo({
      ...newTodo,
      [name]: name === 'title'
        ? value.replace(/[^a-zA-Zа-яА-Я0-9\s+]+/g, '')
        : value,
    });
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
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              name="title"
              placeholder="Enter a title"
              value={newTodo.title}
              onChange={(event) => {
                handleOnChange(event);
                setIsNoTitle(false);
              }}
            />
          </label>
          {isNoTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            User:
            <select
              name="userId"
              data-cy="userSelect"
              value={newTodo.userId}
              onChange={(event) => {
                handleOnChange(event);
                setIsNoUser(false);
              }}
            >
              <option value="" disabled>Choose a user</option>
              {usersFromServer.map(user => {
                const { id, name } = user;

                return (
                  <option value={id}>{name}</option>
                );
              })}
            </select>
          </label>

          {isNoUser && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList
        todos={displayedTodos}
      />
    </div>
  );
};
