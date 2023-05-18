import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './Types/User';
import { Todo } from './Types/Todo';

import './App.scss';

const getUser = (userId: number): User | null => {
  const founder = usersFromServer.find(user => user.id === userId);

  return founder || null;
};

export const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}
));

export const App: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState(0);
  const [validationForTitle, setValidationForTitle] = useState(false);
  const [validationForSelect, setValidationForSelect] = useState(false);
  const [todoList, setTodoList] = useState<Todo[]>(todos);

  const addTodo = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (selectValue === 0 || inputValue === '') {
      // eslint-disable-next-line no-sequences
      return setValidationForSelect(true),
      setValidationForTitle(true);
    }

    setInputValue('');
    setSelectValue(0);

    const nextId = Math.max(...todoList.map(todo => todo.id));
    const user = getUser(selectValue);

    const newTodo = {
      id: nextId + 1,
      title: inputValue,
      completed: false,
      userId: selectValue,
      user: user ?? null,
    };

    return setTodoList([...todoList, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST">
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            id="titleInput"
            placeholder="Enter a title"
            value={inputValue}
            onChange={event => {
              setInputValue(event.target.value);
              setValidationForTitle(false);
            }}
          />
          {validationForTitle && (
            <span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            data-cy="userSelect"
            id="userSelect"
            value={selectValue}
            onChange={event => {
              setSelectValue(+event.target.value);
              setValidationForSelect(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(({ id, name }: User) => (
              <option
                value={id}
                key={id}
              >
                {name}
              </option>
            ))}
          </select>

          {validationForSelect && (
            <span className="error">Please enter a title</span>)}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={addTodo}
        >
          Add
        </button>
      </form>

      <TodoList todoList={todoList} />
    </div>
  );
};
