import { useState } from 'react';
import { Todo } from '../../types/Todo';
import User from '../../types/User';
import { engUkrSpacesOnly } from '../../helpers/regex';

interface TodoFormProps {
  users: User[];
  todos: Todo[];
  onAddTodo: (todo: Todo) => void;
}

export const TodoForm = ({ users, todos, onAddTodo }: TodoFormProps) => {
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [todoTitle, setTodoTitle] = useState<string>('');

  const [titleErrMsg, setTitleErrMsg] = useState<string>('');
  const [userIdErrMsg, setUserIdErrMsg] = useState<string>('');

  const isTitleValid = (title: string) => title.length > 0;
  const isUserIdValid = (userId: number) => userId > 0;

  const reset = () => {
    setSelectedUserId(0);
    setTodoTitle('');
    setTitleErrMsg('');
    setUserIdErrMsg('');
  };

  const handleTitleChange = (title: string) => {
    if (isTitleValid(title)) {
      setTitleErrMsg('');
    }

    setTodoTitle(title);
  };

  const handleUserIdChange = (userId: number) => {
    if (isUserIdValid(userId)) {
      setUserIdErrMsg('');
    }

    setSelectedUserId(userId);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let isValidForSubmit: boolean = true;

    if (!isUserIdValid(selectedUserId)) {
      setUserIdErrMsg('Please choose a user');

      isValidForSubmit = false;
    }

    if (!isTitleValid(todoTitle)) {
      setTitleErrMsg('Please enter a title');

      isValidForSubmit = false;
    }

    if (!isValidForSubmit) {
      return;
    }

    onAddTodo({
      id: todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1,
      completed: false,
      title: engUkrSpacesOnly(todoTitle),
      userId: selectedUserId,
    });

    reset();
  };

  return (
    <form onSubmit={event => handleSubmit(event)}>
      <div className="field">
        <label htmlFor="title">Title:&nbsp;</label>
        <input
          type="text"
          name="title"
          id="title"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={todoTitle}
          onChange={event => handleTitleChange(event.target.value)}
        />
        {titleErrMsg && <span className="error">{titleErrMsg}</span>}
      </div>

      <div className="field">
        <label htmlFor="userSelect">User:&nbsp;</label>
        <select
          data-cy="userSelect"
          id="userSelect"
          name="userSelect"
          value={selectedUserId}
          onChange={event => handleUserIdChange(+event.target.value)}
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
        {userIdErrMsg && <span className="error">{userIdErrMsg}</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};

export default TodoForm;
