import { useState } from 'react';
import { Todo, TodoFields } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  users: User[];
  maxTodoId: number;
  onAdd: (todo: Todo) => void;
};

export const TodoForm: React.FC<Props> = ({
  users,
  maxTodoId,
  onAdd,
}: Props) => {
  const initialTodo: Todo = {
    id: 0,
    title: '',
    completed: false,
    userId: 0,
  };

  const [todo, setTodo] = useState<Todo>(initialTodo);
  const [titleError, setTitleError] = useState<string>('');
  const [userError, setUserError] = useState<string>('');

  const handleChange = (val: string | number, field: TodoFields) => {
    setTodo({
      ...todo,
      [field]: val,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!todo.title) {
      setTitleError('Please enter a title');
    }

    if (!todo.userId) {
      setUserError('Please choose a user');
    }

    if (!todo.title || !todo.userId) {
      return;
    }

    onAdd({
      ...todo,
      id: maxTodoId + 1,
    });

    setTodo(initialTodo);
    setTitleError('');
    setUserError('');
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="titleInput">Title:</label>
        <input
          id="titleInput"
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={todo.title}
          onChange={changeEvent => {
            handleChange(changeEvent.target.value, 'title');
            setTitleError('');
          }}
        />

        {titleError && <span className="error">{titleError}</span>}
      </div>

      <div className="field">
        <label htmlFor="userSelect">User:</label>
        <select
          id="userSelect"
          data-cy="userSelect"
          value={todo.userId}
          onChange={changeEvent => {
            handleChange(Number(changeEvent.target.value), 'userId');
            setUserError('');
          }}
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {users.map((user: User) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {userError && <span className="error">{userError}</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
