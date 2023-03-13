import { FC, useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './Types/Types';

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function findUser(userId: number) {
  return usersFromServer.find(({ id }) => id === userId);
}

function getTodos(todos: Todo[]) {
  return todos.map(todo => {
    const cloneTodo = { ...todo };

    cloneTodo.user = findUser(cloneTodo.userId);

    return cloneTodo;
  });
}

export const App: FC = () => {
  const visibleTodo = getTodos(todosFromServer);

  const [todos, setTodos] = useState(visibleTodo);

  const [selectUserId, setSelectUserId] = useState(0);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const [validTitle, setValidTitle] = useState(false);
  const [validSelect, setValidSelect] = useState(false);

  let checkInput = '';

  function checkValidInput() {
    checkInput = newTodoTitle.replace(/[^A-Za-z\s\d\u0400-\u04FF]/g, '');

    if (selectUserId === 0 || checkInput === '') {
      setValidSelect(selectUserId === 0);
      setValidTitle(newTodoTitle === '');

      return true;
    }

    return false;
  }

  const resetForm = () => {
    setSelectUserId(0);
    setNewTodoTitle('');
    setValidTitle(false);
    setValidSelect(false);
  };

  const addTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (checkValidInput()) {
      return;
    }

    const newTodo = {
      id: Math.max(...todos.map(({ id }) => id)) + 1,
      title: checkInput,
      completed: false,
      userId: selectUserId,
      user: findUser(selectUserId),
    };

    setTodos([...todos, newTodo]);
    resetForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={addTodo}
      >
        <label className="field">
          {'Title: '}
          <input
            type="text"
            placeholder="enter a title"
            data-cy="titleInput"
            value={newTodoTitle}
            onChange={({ target }) => {
              setNewTodoTitle(target.value);
              setValidTitle(false);
            }}
          />
          {validTitle
          && <span className="error">Please enter a title</span>}
        </label>

        <div className="field">
          {'Choose a user: '}
          <select
            data-cy="userSelect"
            value={selectUserId}
            onChange={({ target }) => {
              setSelectUserId(+target.value);
              setValidSelect(false);
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(({ id, name }) => (
              <option value={id} key={id}>{name}</option>
            ))}
          </select>
          {validSelect
          && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
