import { ChangeEvent, FormEvent, useState } from 'react';

import users from '../../api/users';
import { getNextTodoId } from '../../utils/todo/getNextTodoId';
import { ITodo } from '../../types/todo';

interface IProps {
  todos: ITodo[];
  addTodo: (todo: ITodo) => void;
}

const TodosForm = ({ todos, addTodo }: IProps) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState<number>(0);

  const handleReset = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !userId) {
      return;
    }

    const todo = {
      id: getNextTodoId(todos),
      title,
      userId,
      completed: false,
    };

    addTodo(todo);
    handleReset();
  };

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  const handleChangeUserId = (e: ChangeEvent<HTMLSelectElement>) =>
    setUserId(+e.target.value);

  return (
    <form action="/api/todos.ts" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          name="title"
          value={title}
          onChange={handleChangeTitle}
          required
          placeholder="Enter the title"
        />

        {!title && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          name="userId"
          value={userId}
          onChange={handleChangeUserId}
          required
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {users.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>

        {!userId && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};

export default TodosForm;
