import { useState } from 'react';
import users from '../../api/users';
import { checkTitle, checkUserId, clearForm } from '../../functions';
import { Todo } from '../types/Todo';
import { TodoError } from '../types/TodoError';

interface Props {
  newTodo: Todo;
  setNewTodo: React.Dispatch<React.SetStateAction<Todo>>;
  todoError: TodoError;
  setTodoError: React.Dispatch<React.SetStateAction<TodoError>>;
  addTodo: (todo: Todo) => void;
}

export const Form: React.FC<Props> = ({
  newTodo,
  setNewTodo,
  todoError,
  setTodoError,
  addTodo,
}) => {
  const [displayErrors, setDisplayErrors] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    checkUserId(newTodo.userId, setTodoError);
    checkTitle(newTodo.title, setTodoError);
    const hasNoErrors = !todoError.title && !todoError.userId;

    if (!hasNoErrors) {
      setDisplayErrors(true);
    } else {
      setDisplayErrors(false);
    }

    if (!newTodo.title || !newTodo.userId) {
      return;
    }

    if (hasNoErrors) {
      addTodo(newTodo);
      clearForm(setNewTodo, setTodoError);
    }
  }

  return (
    <form action="/api/todos" method="POST" onSubmit={onSubmit}>
      <div className="field">
        <label className="label" htmlFor="title">
          Title:
        </label>
        <input
          id="title"
          type="text"
          data-cy="titleInput"
          placeholder="title"
          value={newTodo.title}
          onChange={e => {
            const { id, value } = e.target;

            setNewTodo(oldTodo => ({
              ...oldTodo,
              [id]: value,
            }));

            checkTitle(value, setTodoError);
          }}
        />
        {displayErrors && <span className="error">{todoError.title}</span>}
      </div>

      <div className="field">
        <label className="label" htmlFor="user">
          User:
        </label>
        <select
          id="user"
          data-cy="userSelect"
          value={newTodo.userId}
          onChange={e => {
            const { value } = e.target;

            setNewTodo(oldTodo => ({
              ...oldTodo,
              userId: +value,
            }));

            checkUserId(+value, setTodoError);
          }}
        >
          <option value="0" disabled>
            Choose a user
          </option>

          {users.map(currentUser => (
            <option value={currentUser.id} key={currentUser.id}>
              {currentUser.name}
            </option>
          ))}
        </select>

        {displayErrors && <span className="error">{todoError.userId}</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
