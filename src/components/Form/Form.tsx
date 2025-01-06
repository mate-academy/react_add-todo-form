import React from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type FormProps = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  users: User[];
};

export const Form: React.FC<FormProps> = ({ todos, setTodos, users }) => {
  const [title, setTitle] = React.useState('');
  const [titleError, setTitleError] = React.useState(false);

  const [select, setSelect] = React.useState(0);
  const [selectError, setSelectError] = React.useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setTitleError(false);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(+e.target.value);
    setSelectError(false);
  };

  const currentTodos = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  const getNewId = (todosArray: Todo[]) => {
    const maxId = Math.max(...todosArray.map(todo => todo.id));

    return maxId + 1;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setTitleError(!title);
    setSelectError(!select);

    if (!title || !select) {
      return;
    }

    currentTodos({
      id: getNewId(todos),
      title,
      completed: false,
      userId: select,
    });

    setTitle('');
    setSelect(0);
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="title">Title: </label>
        <input
          id="title"
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={handleTitleChange}
        />
        <span className="error">
          {titleError ? 'Please enter a title' : ''}
        </span>
      </div>

      <div className="field">
        <label htmlFor="users">User: </label>
        <select
          id="users"
          data-cy="userSelect"
          value={select}
          onChange={handleSelectChange}
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <span className="error">
          {selectError ? 'Please choose a user' : ''}
        </span>
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
