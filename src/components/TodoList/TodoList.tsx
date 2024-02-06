import React, { Dispatch, SetStateAction, useState } from 'react';
import usersFromServer from '../../api/users';
import { Todo } from '../types/Todo';
// import { getUserById } from '../../services/user';

type Props = {
  onAdd: Dispatch<SetStateAction<Todo[]>>;
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ onAdd, todos }) => {
  const [formState, setFormState] = useState({
    title: '',
    userId: 0,
  });

  const areRequiredFieldsFilled = () => {
    return (
      formState.title !== ''
      && formState.userId !== 0
    );
  };

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(true);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(true);

  const generateNewId = () => {
    return Math.max(...todos.map(todo => todo.id)) + 1;
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (!hasTitleError || !hasUserIdError) {
      setHasTitleError(false);
      setHasUserIdError(false);
    }

    // onAdd({
    //   id: generateNewId(),
    //   title: formState.title,
    //   completed: false,
    //   userId,
    // });

    onAdd((currentTodos) => [...currentTodos, {
      id: generateNewId(),
      title: formState.title,
      completed: false,
      userId,
    }]);
  };

  const handleUserIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormState(prev => ({ ...prev, [name]: value }));
    setUserId(+e.target.value);
    setHasUserIdError(false);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormState(prev => ({ ...prev, [name]: value }));
    setTitle(e.target.value);
    setHasTitleError(false);
  };

  return (
    <div className="App">
      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleAdd}
      >
        <div className="field">
          Title:&nbsp;
          <label>
            <input
              type="text"
              data-cy="titleInput"
              value={title}
              onChange={handleTitleChange}
              placeholder="Please enter a title"
            />
            {hasTitleError && (
              <span className="error">Please enter a title</span>
            )}
          </label>

        </div>
        <div className="field">
          User:&nbsp;
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserIdChange}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasUserIdError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          disabled={areRequiredFieldsFilled()}
        >
          Add
        </button>
      </form>
      <section className="TodoList">
        <article data-id="1" className="TodoInfo TodoInfo--completed">
          <h2 className="TodoInfo__title">
            delectus aut autem
          </h2>

          <a
            className="UserInfo"
            href="mailto:Sincere@april.biz"
          >
            Leanne Graham
          </a>
        </article>

        <article data-id="15" className="TodoInfo TodoInfo--completed">
          <h2 className="TodoInfo__title">delectus aut autem</h2>

          <a className="UserInfo" href="mailto:Sincere@april.biz">
            Leanne Graham
          </a>
        </article>

        <article data-id="2" className="TodoInfo">
          <h2 className="TodoInfo__title">
            quis ut nam facilis et officia qui
          </h2>

          <a className="UserInfo" href="mailto:Julianne.OConner@kory.org">
            Patricia Lebsack
          </a>
        </article>
      </section>
    </div>
  );
};
