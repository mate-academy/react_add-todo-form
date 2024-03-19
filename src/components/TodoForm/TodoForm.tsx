import React, { useState } from "react";
import { ToDo } from "../../types";

type Props = {
  onAdd: (todo: ToDo) => void,
  todos: ToDo[],
  users: ToDo['user'][]
}

const getLastToDoId = (todos: ToDo[]): number => {
  return todos.reduce((maxId, todo: ToDo) => {
    if (todo.id > maxId) {
      return todo.id;
    }

    return maxId
  }, 0)
}

export const TodoForm: React.FC<Props> = ({
  onAdd,
  todos,
  users
}) => {
  const [title, setTitle] = useState('');
  const [isTitleFailed, setIsTitleFailed] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState(0)
  const [isSelectedUserIdFailed, setSelectedUserIdFailed] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let failed = false;

    if (title === '') {
      failed = true;
      setIsTitleFailed(true);
    }

    if (selectedUserId === 0) {
      failed = true;
      setSelectedUserIdFailed(true)
    }

    if (failed) {
      return
    }

    const todo: ToDo = {
      title,
      user: users.find(u => u.id === selectedUserId) as ToDo['user'],
      id: getLastToDoId(todos) + 1,
      completed: false,
      userId: selectedUserId,
    }

    onAdd(todo)
  }

  const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setIsTitleFailed(false);
    setTitle(e.target.value);
  }

  const handleUserSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setSelectedUserIdFailed(false);
    setSelectedUserId(+e.target.value);
  }

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
          {users.map(user => (
            <option value={user.id}>
              {user.name}
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
  )
};
