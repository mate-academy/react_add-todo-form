import { FormEventHandler, useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Task } from './react-app-env';

function getNextTaskId(tasks:Task[]) {
  return tasks.sort((task1, task2) => task2.id - task1.id)[0].id + 1;
}

export const App = () => {
  const [input, setInput] = useState('');
  const [inputError, setInputError] = useState(false);
  const [select, setSelect] = useState('');
  const [selectError, setSelectError] = useState(false);
  const [todos, setTodos] = useState<Task[]>(todosFromServer.map(todo => ({
    id: todo.id,
    title: todo.title,
    completed: todo.completed,
    user: usersFromServer.find(user => user.id === todo.userId) || null,
  })));

  const handleSubmit: FormEventHandler = event => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log(input, select);

    if (!input) {
      setInputError(true);
    } else {
      setInputError(false);
    }

    if (!select) {
      setSelectError(true);
    } else {
      setSelectError(false);
    }

    if (input && select) {
      const task: Task = {
        id: getNextTaskId(todos),
        title: input,
        completed: false,
        user: usersFromServer.find(user => user.name === select) || null,
      };

      if (task !== undefined) {
        setTodos(oldTodos => [...oldTodos, task]);
      }

      setSelect('');
      setInput('');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={event => handleSubmit(event)}
      >
        <div className="field">
          <input
            value={input}
            type="text"
            data-cy="titleInput"
            placeholder="Enter task title"
            onChange={inputEvent => {
              setInput(inputEvent.target.value);
              setInputError(!(inputEvent.target.value.length > 0));
            }}
          />
          {inputError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            value={select}
            data-cy="userSelect"
            onChange={selectEvent => {
              setSelect(selectEvent.target.value);
              setSelectError(!(selectEvent.target.value.length > 0));
            }}
          >
            <option value="" disabled selected>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.name}>
                {user.name}
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
