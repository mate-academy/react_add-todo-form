import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type TodoFormProps = {
  users: User[];
  todos: Todo[];
  onAddTodo: (todo: Todo) => void;
};

export const TodoForm = ({ todos, users, onAddTodo }: TodoFormProps) => {
  const [idTodos, setIdTodos] = useState(
    todos.map(todo => todo.id).sort((a, b) => a - b),
  );
  const [title, setTitle] = useState('');
  const [userChosen, setUserChosen] = useState<User | null>(null);

  const [hasUserError, setHasUserError] = useState(false);
  const [hasTitleError, setHasTitleError] = useState(false);

  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setUserChosen(users.find(
      (user) => (user.id === Number(event.target.value)),
    ) || null);
    setHasUserError(false);
  };

  const handleSubmit: FormEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    if (!title) {
      setHasTitleError(true);
    }

    if (!userChosen) {
      setHasUserError(true);
    }

    if (!title || !userChosen) {
      return;
    }

    const todoId = idTodos[idTodos.length - 1] + 1;

    setIdTodos((prevId) => [...prevId, todoId]);

    const todo: Todo = {
      id: todoId,
      title,
      completed: false,
      userId: userChosen?.id,
      user: userChosen,
    };

    onAddTodo(todo);

    setUserChosen(null);
    setTitle('');
  };

  return (
    <form action="/api/todos" method="POST">
      <div className="field">
        <label htmlFor="titleInput"> Title: </label>
        <input
          type="text"
          value={title}
          placeholder="Enter a title"
          data-cy="titleInput"
          onChange={handleTitleChange}
        />
        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="userSelect"> User: </label>
        <select
          data-cy="userSelect"
          onChange={handleUserChange}
          defaultValue={0}
          value={userChosen?.id || 0}
        >
          <option value="0" disabled>Choose a user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {hasUserError && <span className="error">Please choose a user</span>}
      </div>

      <button
        type="submit"
        data-cy="submitButton"
        onClick={handleSubmit}
      >
        Add
      </button>
    </form>
  );
};
