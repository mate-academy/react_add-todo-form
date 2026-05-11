import { useState } from 'react';
import { User } from '../../entities/user/domain/User';
import { TodoAggregate } from '../../entities/todo/domain/TodoAggregate';

type CreateFormProps = {
  users: User[];
  todos: TodoAggregate[];
  onSubmit: (todo: TodoAggregate) => void;
};

export function CreateForm({ users, onSubmit, todos }: CreateFormProps) {
  const [newTitle, setNewTitle] = useState('');
  const [titleError, setTitleError] = useState('');

  const [newTodoUserId, setNewTodoUserId] = useState(0);
  const [todoUserIdError, setTodoUserIdError] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const preparedTitle = newTitle.trim();

    let hasErrors = false;

    if (!preparedTitle) {
      setTitleError('Please enter a title');

      hasErrors = true;
    }

    if (!newTodoUserId) {
      setTodoUserIdError('Please choose a user');

      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    setNewTitle('');
    setNewTodoUserId(0);

    const maxId = Math.max(0, ...todos.map(todo => todo.id));

    const newTodo: TodoAggregate = {
      id: maxId + 1,
      title: preparedTitle,
      completed: false,
      userId: newTodoUserId,
      user: users.find(user => user.id === newTodoUserId) as User,
    };

    onSubmit(newTodo);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          value={newTitle}
          placeholder="Please enter a title"
          onChange={event => {
            setNewTitle(event.target.value.trimStart());
            setTitleError('');
          }}
        />

        {titleError && <span className="error">{titleError}</span>}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={newTodoUserId}
          onChange={event => {
            setNewTodoUserId(Number(event.target.value));
            setTodoUserIdError('');
          }}
        >
          <option value={0} disabled>
            Choose a user
          </option>

          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {todoUserIdError && <span className="error">{todoUserIdError}</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
}
