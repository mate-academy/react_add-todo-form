import { FormEvent, useState } from 'react';

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

function getUser(userValue: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userValue);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const newTodoID = (todosArr: Todo[]) => (
  Math.max(...todosArr.map(todo => todo.id)) + 1
);

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todosList, setTodosList] = useState(todos);
  const [todoId, setTodoId] = useState(newTodoID(todosList));
  const [submitButton, setSubmitButton] = useState(false);
  const isTitleFilled = !title && submitButton;
  const isUserSelected = !selectedUserId && submitButton;

  const newTodo = () => ({
    id: todoId,
    title,
    completed: false,
    userId: selectedUserId,
    user: getUser(selectedUserId),
  });

  const addTodo = () => {
    if (selectedUserId && title) {
      setTodosList(
        [
          ...todosList,
          newTodo(),
        ],
      );
      setTodoId((prevId) => prevId + 1);
      setTitle('');
      setSelectedUserId(0);
      setSubmitButton(false);
    }
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitButton(true);
    addTodo();
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={handleTitle}
          />
          {isTitleFilled
          && <span className="error">Please enter a title</span>}
        </div>
        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleUserId}
          >
            <option value={0} disabled>Choose a user</option>
            {usersFromServer.map(user => {
              return (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              );
            })}
          </select>
          {isUserSelected
          && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <section className="TodoList">
        <section className="TodoList">
          <TodoList todos={todosList} />
        </section>
      </section>
    </div>
  );
};
