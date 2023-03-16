import { FC, useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import { TodoListType } from './Types/Types';

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const todosWithUser = (): TodoListType[] => {
  return todosFromServer.map(todo => ({
    ...todo,
    user: usersFromServer.find(({ id }) => id === todo.userId) || null,
  }));
};

export const App: FC = () => {
  const [todos, setTodos] = useState<TodoListType[]>(todosWithUser());
  const [selectUserId, setSelectUserId] = useState<number>(0);
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');
  const [isValidTitle, setIsValidTitle] = useState<boolean>(false);
  const [isValidSelect, setIsValidSelect] = useState<boolean>(false);

  function checkValidInput() {
    if (selectUserId === 0 || newTodoTitle === '') {
      setIsValidSelect(selectUserId === 0);
      setIsValidTitle(newTodoTitle === '');

      return true;
    }

    return false;
  }

  const resetForm = () => {
    setSelectUserId(0);
    setNewTodoTitle('');
    setIsValidTitle(false);
    setIsValidSelect(false);
  };

  const addTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (checkValidInput()) {
      return;
    }

    const newTodo: TodoListType = {
      id: Math.max(...todos.map(({ id }) => id)) + 1,
      title: newTodoTitle,
      completed: false,
      userId: selectUserId,
      user: usersFromServer.find(({ id }) => id === selectUserId) || null,
    };

    setTodos([...todos, newTodo]);
    resetForm();
  };

  const handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(event.target.value);
    setIsValidTitle(false);
  };

  const handleOnChangeSelect = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectUserId(+event.target.value);
    setIsValidSelect(false);
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
            onChange={handleOnChangeInput}
          />
          {isValidTitle
          && <span className="error">Please enter a title</span>}
        </label>

        <div className="field">
          {'Choose a user: '}
          <select
            data-cy="userSelect"
            value={selectUserId}
            onChange={handleOnChangeSelect}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(({ id, name }) => (
              <option value={id} key={id}>{name}</option>
            ))}
          </select>
          {isValidSelect
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
