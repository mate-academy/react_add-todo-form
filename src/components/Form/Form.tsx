import React from 'react';
import users from '../../api/users';
import { Todo } from '../../types/todo';
import { findUser } from '../../utils/userFind';
import { getMaxTodoId } from '../../utils/getMaxId';

interface Props {
  addTodo: (todo: Todo) => void,
  todos: Todo[]
}

export const Form: React.FC<Props> = ({ addTodo, todos }) => {
  const [newTodoName, setNewTodoName] = React.useState('');
  const [selectedUserId, setSelectedUserId] = React.useState(0);
  const [todoNameError, setTodoNameError] = React.useState(false);
  const [selectedUserError, setSelectedUserError] = React.useState(false);

  const handlerReset = () => {
    setNewTodoName('');
    setSelectedUserId(0);
  };

  function handleSubmit(event:React.FormEvent) {
    event.preventDefault();
    const isDisabled = !newTodoName.trim();

    setTodoNameError(isDisabled);
    if (!newTodoName.trim()) {
      setTodoNameError(true);
    }

    if (!selectedUserId) {
      setSelectedUserError(true);
    }

    if (newTodoName.trim() && selectedUserId) {
      const newTodo: Todo = {
        id: getMaxTodoId(todos),
        title: newTodoName,
        completed: false,
        userId: selectedUserId,
        user: findUser(selectedUserId),
      };

      handlerReset();
      addTodo(newTodo);
    }
  }

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="todoName">Title:</label>
        <input
          placeholder="Enter a title"
          id="todoName"
          name="todoName"
          type="text"
          data-cy="titleInput"
          value={newTodoName}
          onChange={event => {
            setNewTodoName(event.target.value);
            setTodoNameError(!event.target.value);
          }}
          onBlur={event => setTodoNameError(!event.target.value.trim())}
        />
        {todoNameError && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <label htmlFor="userSelect">User:</label>
        <select
          id="userSelect"
          data-cy="userSelect"
          name="todoUser"
          value={selectedUserId}
          onChange={event => {
            setSelectedUserId(+event.target.value);
            setSelectedUserError(!+event.target.value);
          }}
          onBlur={event => setSelectedUserError(!+event.target.value)}
        >
          <option value="0" disabled>Choose a user</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {selectedUserError && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button
        type="submit"
        data-cy="submitButton"
      >
        Add
      </button>
    </form>
  );
};
