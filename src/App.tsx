import { useCallback, useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';
import { Todo, User } from './types';

const defaultFormValue = {
  title: '',
  userId: 0,
};

export const App: React.FC = () => {
  const [users] = useState<User[]>(usersFromServer);
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [formValue, setFormValue] = useState(defaultFormValue);
  const [titleTouched, setTitleTouched] = useState(false);
  const [userTouched, setUserTouched] = useState(false);

  const setFormTouched = (isTouched: boolean) => {
    setTitleTouched(isTouched);
    setUserTouched(isTouched);
  };

  const onSubmitEvent = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formValue.title || formValue.userId === 0) {
      setFormTouched(true);

      return;
    }

    const ids = todos.map(todo => todo.id);
    const newId = Math.max(...ids) + 1;
    const newTodo: Todo = {
      id: newId,
      title: formValue.title,
      completed: false,
      userId: formValue.userId,
    };

    setTodos([...todos, newTodo]);
    setFormValue(defaultFormValue);
    setFormTouched(false);
  };

  const updateFormValue = useCallback((key: string, value: string | number) => {
    setFormValue(previousValue => ({ ...previousValue, [key]: value }));
  }, []);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={onSubmitEvent}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            type="text"
            id="titleInput"
            value={formValue.title}
            data-cy="titleInput"
            placeholder="Enter a title"
            onChange={event => {
              updateFormValue('title', event.target.value);
              setTitleTouched(false);
            }}
          />
          {titleTouched && !formValue.title ? (
            <span className="error">Please enter a title</span>
          ) : null}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            data-cy="userSelect"
            id="userSelect"
            value={formValue.userId}
            onChange={event => {
              updateFormValue('userId', +event.target.value);
              setUserTouched(false);
            }}
          >
            <option value="0">Choose a user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userTouched && formValue.userId === 0 ? (
            <span className="error">Please choose a user</span>
          ) : null}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
