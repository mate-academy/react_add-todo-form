import { FC } from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { ToDo } from '../../App';
import users from '../../api/users';
import { useState } from 'react';

interface Props {
  todos: ToDo[] | null;
  addNewTodo: (todo: ToDo) => void;
}

export const TodoList: FC<Props> = ({ todos, addNewTodo }) => {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [titleError, setTitleError] = useState<string>('');
  const [userError, setUserError] = useState<string>('');

  const getLargestId = Math.max(...(todos?.map(el => el.id) || [])) + 1;
  const errorsDisable = () => {
    setUserError('');
    setTitleError('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newTodoTitle.trim()) {
      setTitleError('Please enter a title');
    }

    if (!selectedUserId) {
      setUserError('Please choose a user');
    }

    if (!selectedUserId || !newTodoTitle.trim()) {
      return;
    }

    const newTodo: ToDo = {
      id: getLargestId,
      title: newTodoTitle,
      completed: false,
      userId: selectedUserId,
      user: users.find(user => user.id === selectedUserId) || null,
    };

    addNewTodo(newTodo);
    setNewTodoTitle('');
    setSelectedUserId(0);
  };

  return (
    <section className="TodoList">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            data-cy="titleInput"
            value={newTodoTitle}
            onChange={event => setNewTodoTitle(event.target.value)}
            placeholder="Enter todo title"
          />
          {titleError && !newTodoTitle && (
            <span className="error" style={{ color: 'red' }}>
              {titleError}
            </span>
          )}
        </div>
        <br />
        <div>
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={event => setSelectedUserId(Number(event.target.value))}
          >
            <option value="0">Choose a user</option>
            {users.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userError && !selectedUserId && (
            <span className="error" style={{ color: 'red' }}>
              {userError}
            </span>
          )}
        </div>
        <br />
        <div>
          <button type="submit" onClick={errorsDisable} data-cy="submitButton">
            Add
          </button>
        </div>
      </form>
      {todos?.map(todo => <TodoInfo key={todo.id} todo={todo} />)}
    </section>
  );
};
