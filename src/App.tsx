import './App.scss';

import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { UsersSelect } from './components/UsersSelect/UsersSelect';

type HandleChangeTypes = HTMLInputElement | HTMLSelectElement;

enum ChangeOptions {
  Title = 'title',
  Select = 'select',
}

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find((user) => user.id === userId);

  return foundUser || null;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState(0);
  const [inputValidation, setInputValidation] = useState(true);
  const [selectValidation, setSelectValidation] = useState(true);

  useEffect(() => {
    const allTodos: Todo[] = todosFromServer.map(todo => ({
      ...todo,
      user: getUser(todo.userId),
    }));

    setTodos(allTodos);
  }, []);

  const handleChange = (event: ChangeEvent<HandleChangeTypes>) => {
    const element = event.target;

    switch (element.name) {
      case ChangeOptions.Title:
        setInputValue(element.value);
        setInputValidation(true);
        break;

      case ChangeOptions.Select:
        setSelectValue(+element.value);
        setSelectValidation(true);
        break;

      default:
        break;
    }
  };

  const isFormValid = () => {
    let isValid = true;

    if (inputValue === '') {
      setInputValidation(false);
      isValid = false;
    }

    if (selectValue === 0) {
      setSelectValidation(false);
      isValid = false;
    }

    return isValid;
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) {
      return;
    }

    const todosId = todos.map(todo => todo.id);
    const largestId = Math.max(...todosId);
    const user = getUser(selectValue);

    const newTodo = {
      id: largestId + 1,
      title: inputValue,
      userId: selectValue,
      user,
      completed: false,
    };

    setTodos(current => ([
      ...current,
      newTodo,
    ]));

    setInputValue('');
    setSelectValue(0);
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
          <label htmlFor="titleField">
            <span>Title:</span>
            <input
              id="titleField"
              name="title"
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={inputValue}
              onChange={handleChange}
            />
          </label>

          {!inputValidation && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="selectField">
            <span>User:</span>
            <select
              name="select"
              id="selectField"
              data-cy="userSelect"
              value={selectValue}
              onChange={handleChange}
            >
              <option value="0" disabled>
                Choose a user
              </option>

              <UsersSelect users={usersFromServer} />
            </select>
          </label>

          {!selectValidation && (
            <span className="error">
              Please choose a user
            </span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={todos} />
      </section>
    </div>
  );
};
