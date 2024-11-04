import {
  Dispatch,
  SetStateAction,
  ChangeEvent,
  FormEvent,
  useState,
} from 'react';

import users from '../../api/users';
import { getNextTodoId } from '../../utils/todo/getNextTodoId';
import { ITodo } from '../../types/todo';

interface IProps {
  todos: ITodo[];
  setTodos: Dispatch<SetStateAction<ITodo[]>>;
}

const TodosForm = ({ todos, setTodos }: IProps) => {
  const [title, setTitle] = useState<string | null>('');
  const [userId, setUserId] = useState<number | null>(0);

  const handleReset = () => {
    setTitle('');
    setUserId(0);
  };

  const checkTodoFormState = () => {
    if (!title) {
      setTitle(null);
    }
    if (!userId) {
      setUserId(null);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !userId) {
      return checkTodoFormState();
    }

    const todo = {
      id: getNextTodoId(todos),
      title,
      userId,
      completed: false,
    };

    setTodos((prevState: ITodo[]) => [...prevState, todo]);
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
          value={title !== null ? title : ''}
          onChange={handleChangeTitle}
          placeholder="Enter the title"
        />

        {title === null && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          name="userId"
          value={userId !== null ? userId : 0}
          onChange={handleChangeUserId}
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

        {userId === null && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};

export default TodosForm;
