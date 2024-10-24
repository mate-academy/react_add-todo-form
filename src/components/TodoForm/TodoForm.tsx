import React, { useState } from 'react';
import usersFromServer from '../../api/users';
import { Todo } from '../../App';

type Props = {
  todos: Todo[];
  updateTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const TodoForm: React.FC<Props> = ({ todos, updateTodoList }) => {
  const [currentUserId, setCurrentUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const addedTodoId = Math.max(...todos.map(todo => todo.id)) + 1;
  const preparedObject = {
    id: addedTodoId,
    title: title,
    completed: false,
    userId: currentUserId,
  };

  const isUserSelected = () => (currentUserId ? true : false);
  const isTitleValid = () => (title ? true : false);

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={event => {
        event.preventDefault();

        if (currentUserId && title) {
          todos.push(preparedObject);
          updateTodoList([...todos]);
          setTitle('');
          setCurrentUserId(0);
          setIsButtonClicked(false);
        }
      }}
    >
      <div className="field">
        <label htmlFor="title">Title: </label>
        <input
          id="title"
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />

        {!isTitleValid() && isButtonClicked && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <label htmlFor="user">User: </label>
        <select
          id="user"
          data-cy="userSelect"
          value={currentUserId}
          onChange={event => setCurrentUserId(+event.target.value)}
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {usersFromServer.map(user => {
            const { id, name } = user;

            return (
              <option value={id} key={`user-${id}`}>
                {name}
              </option>
            );
          })}
        </select>
        {!isUserSelected() && isButtonClicked && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button
        type="submit"
        data-cy="submitButton"
        onClick={() => {
          setIsButtonClicked(true);
        }}
      >
        Add
      </button>
    </form>
  );
};
