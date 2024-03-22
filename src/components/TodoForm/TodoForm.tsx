import React, { useState } from "react";
import { Todo } from "../../types";
import usersFromServer from '../../api/users';
import { getUserById } from '../../App';

type Props = {
  onAdd: (todo: Todo) => void,
  todos: Todo[],
};


const getNewTodoId = (todos: Todo[]): number => {
  return todos.reduce((maxId, todo: Todo) => {
    if (todo.id > maxId) {
      return todo.id;
    }

    return maxId;
  }, 0) + 1;
};

export const TodoForm: React.FC<Props> = ({
  onAdd,
  todos,
}) => {
  const [title, setTitle] = useState('');
  const [isTitleFailed, setIsTitleFailed] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState(0);
  const [isSelectedUserIdFailed, setSelectedUserIdFailed] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setIsTitleFailed(true);
    };

    if (!selectedUserId) {
      setSelectedUserIdFailed(true);
    };

    if (!title || !selectedUserId) {
      return;
    };

    const todo: Todo = {
      title,
      user: getUserById(selectedUserId),
      id: getNewTodoId(todos),
      completed: false,
      userId: selectedUserId,
    };

    onAdd(todo);
  };

  const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setIsTitleFailed(false);
    setTitle(event.target.value);
  };

  const handleUserSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setSelectedUserIdFailed(false);
    setSelectedUserId(Number(event.target.value));
  };

  return (
  <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
    <div className="field">
      <label>
        Title:
      <input
        type="text"
        data-cy="titleInput"
        onChange={handleTitleChange}
        placeholder="Enter a title"
      />
      </label>
      {isTitleFailed && (<span className="error">Please enter a title</span>)}
    </div>

    <div className="field">
      <label>
        User:
        <select
          data-cy="userSelect"
          value={selectedUserId}
          onChange={handleUserSelectChange}
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {usersFromServer.map(({
            id,
            name,
          }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </label>
      {isSelectedUserIdFailed && (<span className="error">Please choose a user</span>)}
    </div>

    <button type="submit" data-cy="submitButton">
      Add
    </button>
  </form>
  );
};
