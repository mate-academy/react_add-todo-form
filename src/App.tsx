import React, { useState } from 'react';
import ClassNames from 'classnames';
import { User, TodoWidthUser } from './react-app-env';

import todos from './api/todos';
import users from './api/users';

import { TodoList } from './components/TodoList/TodoList';
import './App.scss';

const getUsersById = (userId: number): User | null => {
  return users.find(user => user.id === userId) || null;
};

const todosWidthUser: TodoWidthUser[] = todos.map((todo) => ({
  ...todo,
  user: getUsersById(todo.userId),
}));

export const App: React.FC = () => {
  const [newTodoWidthUser, setNewTodoWidthUser] = (
    useState<TodoWidthUser[]>([...todosWidthUser])
  );
  // const [newIdTodo, setNewIdTodo] = useState([...todos].reverse()[0].id); // for line 34
  const [newTitleName, setNewTitleName] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [newUserId, setNewUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);
  const [newStatusTodo, setNewStatusTodo] = useState(false);

  const addNewTodo = () => {
    const newTodo: TodoWidthUser = {
      userId: newUserId,
      // id: Number(setNewIdTodo(newIdTodo + 1)), === NaN // ???
      id: Date.now(),
      title: newTitleName,
      completed: newStatusTodo,
      user: getUsersById(newUserId),
    };

    setNewTodoWidthUser((currentTodo) => [...currentTodo, newTodo]);
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasTitleError(!newTitleName);
    setHasUserIdError(!newUserId);

    if (newTitleName && newUserId) {
      addNewTodo();
      setNewTitleName('');
      setNewUserId(0);
    }
  };

  const addErrorClass = (
    defaultClass: string,
    checkedValue: boolean,
  ) => (
    ClassNames(defaultClass, {
      error: checkedValue,
    })
  );

  return (
    <div className="App">
      <h1 className="title">Add TODO form !</h1>

      <form
        className="box form"
        onSubmit={handleSubmitForm}
      >
        <div
          className={addErrorClass('select is-info', hasUserIdError)}
        >
          <select
            className="selMain"
            name="userName"
            value={newUserId}
            onChange={(event) => {
              setNewUserId(Number(event.target.value));
              setHasUserIdError(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {users.map((user) => (
              <option
                key={user.id}
                value={user.id}
              >
                {user?.name}
              </option>
            ))}
          </select>
        </div>

        {hasUserIdError && (
          <div className="errorMessage">Please choose a user</div>
        )}

        <input
          type="text"
          name="titleName"
          placeholder="Enter new TODO"
          className={addErrorClass('input is-info', hasTitleError)}
          value={newTitleName}
          onChange={(event) => {
            setNewTitleName(event.target.value);
            setHasTitleError(false);
          }}
        />

        {hasTitleError && (
          <div className="errorMessage">Please enter the title</div>
        )}

        <label className="checkbox">
          <input
            type="checkbox"
            name="statusTodo"
            checked={newStatusTodo}
            onChange={(event) => {
              setNewStatusTodo(event.target.checked);
            }}
          />
          <span>Completed</span>
        </label>

        <button
          type="submit"
          className="button is-success"
        >
          Add TODO !
        </button>
      </form>

      <TodoList todosWidthUser={newTodoWidthUser} />
    </div>
  );
};
