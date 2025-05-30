import { FC, useState } from 'react';
import usersFromServer from '../../api/users';
import { getNewTodoId } from '../../entities/todo/utils/getNewTodoId';
import { getUserById } from '../../entities/user/utils/getUserById';
import { Todo } from '../../entities/todo/Todo';

interface TodoFormProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const TodoForm: FC<TodoFormProps> = ({ todos, setTodos }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.trimStart());
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    setTodos(currentTodos => {
      const newTodo = {
        id: getNewTodoId(todos),
        title,
        userId,
        completed: false,
        user: getUserById(usersFromServer, userId),
      };

      return [...currentTodos, newTodo];
    });

    setTitle('');
    setUserId(0);
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="todo-title">
          Title:
          <input
            id="todo-title"
            placeholder="Enter a title"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </label>
      </div>

      <div className="field">
        <label htmlFor="todo-user">
          User:
          <select
            id="todo-user"
            data-cy="userSelect"
            required
            value={userId}
            onChange={handleUserIdChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>

        {hasUserIdError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
