//..
import { useState } from 'react';
import type { TodoType } from '../../types/TodoType';
import users from '../../api/users';

interface FormItemProps {
  addPost: (newPost: TodoType) => void;
  todos: TodoType[];
}

export const FormItem = ({ addPost, todos }: FormItemProps) => {
  const [title, setTitle] = useState(''); // стан для заголовка
  const [isErrorTitle, setIsErrorTitle] = useState(false); // стан для помилки заголовка
  const [userSelect, setUserSelect] = useState(0); // стан для значення селекта
  const [isErrorSelect, setIsErrorSelect] = useState(false); // стан для помилки для необраного селекта

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsErrorTitle(false);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserSelect(+event.target.value);
    setIsErrorSelect(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title === '') {
      setIsErrorTitle(true);

      return;
    }

    if (userSelect === 0) {
      setIsErrorSelect(true);

      return;
    }

    const user = users.find(el => el.id === userSelect);

    if (!user) {
      return;
    }

    const maxId = todos.length ? Math.max(...todos.map(t => t.id)) : 0;

    const newTodo: TodoType = {
      id: maxId + 1, // або інша логіка
      title: title,
      completed: false,
      userId: user.id,
    };

    addPost(newTodo);
  };

  return (
    <>
      <form onSubmit={handleSubmit} action="/api/todos" method="POST">
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitle}
          />
          {isErrorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userSelect}
            onChange={handleSelect}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {users.map(el => (
              <option value={el.id} key={el.id}>
                {el.name}
              </option>
            ))}
          </select>
          {isErrorSelect && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
    </>
  );
};
