import { FormEventHandler, useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

function getTaskById(tasks:Todo[]) {
  return tasks.sort((firstTask, secondTask) => secondTask.id
  - firstTask.id)[0].id + 1;
}

export const App = () => {
  const [input, setInput] = useState('');
  const [isInputError, setIsInputError] = useState(false);
  const [select, setSelect] = useState('');
  const [selectError, setSelectError] = useState(false);
  const [todos, setTodos] = useState<Todo[]>(todosFromServer.map(
    ({
      id, title, completed, userId,
    }) => ({
      id,
      title,
      completed,
      user: usersFromServer.find(user => user.id === userId) || null,
    }),
  ));

  const handleSubmit: FormEventHandler = event => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log(input, select);

    if (!input) {
      setIsInputError(true);
    } else {
      setIsInputError(false);
    }

    if (!select) {
      setSelectError(true);
    } else {
      setSelectError(false);
    }

    if (input && select) {
      const task: Todo = {
        id: getTaskById(todos),
        title: input,
        completed: false,
        user: usersFromServer.find(user => user.name === select) || null,
      };

      if (task) {
        setTodos(oldTodos => [...oldTodos, task]);
      }

      setSelect('');
      setInput('');
    }
  };

  const handleSetSelect = (value:string) => {
    setSelect(value);
    setSelectError(!(value.length > 0));
  };

  const handleSetTitle = (value:string) => {
    setInput(value);
    setIsInputError(!(value.length > 0));
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
            value={input}
            type="text"
            data-cy="titleInput"
            placeholder="Enter task title"
            onChange={inputEvent => handleSetTitle(inputEvent.target.value)}
          />
          {isInputError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            value={select}
            data-cy="userSelect"
            onChange={selectEvent => handleSetSelect(selectEvent.target.value)}
          >
            <option value="" disabled selected>Choose a user</option>
            {usersFromServer.map(({ id, name }) => (
              <option key={id} value={name}>
                {name}
              </option>
            ))}
          </select>

          {selectError && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
