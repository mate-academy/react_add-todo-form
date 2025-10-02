import { Todo } from '../../types/todos';
import { User } from '../../types/user';
import { useState } from 'react';

type Props = {
  users: User[];
  todos: Todo[];
  onAddTodo: (title: string, userId: number) => void;
};

export const TodoInfo = ({ users, todos, onAddTodo }: Props) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [errorTitle, setErrorTitle] = useState('');
  const [errorUser, setErrorUser] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isTitleValid = title.trim() !== '';
    const isUserValid = userId > 0;

    setErrorTitle(isTitleValid ? '' : 'Please enter a title');
    setErrorUser(isUserValid ? '' : 'Please choose a user');

    if (!isTitleValid || !isUserValid) {
      return;
    }

    onAddTodo(title.trim(), userId);

    setTitle('');
    setUserId(0);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={changeEvent => {
              const newValue = changeEvent.target.value;

              setTitle(newValue);
              if (newValue.trim()) {
                setErrorTitle('');
              }
            }}
          />
          <span className="error">{errorTitle}</span>
        </div>

        <div className="field">
          <label htmlFor="selectUser">User: </label>
          <select
            id="selectUser"
            data-cy="userSelect"
            value={userId}
            onChange={e => {
              const id = +e.target.value;

              setUserId(id);
              if (id > 0) {
                setErrorUser('');
              }
            }}
          >
            <option value={0}>Choose a user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <span className="error">{errorUser}</span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        {todos.map(todo => (
          <article
            key={todo.id}
            data-id={todo.id}
            className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
          >
            <h2 className="TodoInfo__title">{todo.title}</h2>
            <a className="UserInfo" href={`mailto:${todo.user.email}`}>
              {todo.user.name}
            </a>
          </article>
        ))}
      </section>
    </div>
  );
};
