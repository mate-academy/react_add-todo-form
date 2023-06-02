import { useState, useEffect } from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import usersFromServer from '../../api/users';

type Props = {
  todos: Todo[],
};

function getUser(id:number): User | null {
  const foundUser = usersFromServer.find(user => user.id === id);

  return foundUser || null;
}

function createNewTodo(
  todos: Todo[],
  id: number,
  title: string,
) {
  const foundUser = getUser(id);
  const largestId = todos.reduce((acc, todo) => {
    return acc < todo.id ? todo.id : acc;
  }, 0);

  // const newId = Math.max(...todos.map(todo => todo.id)) + 1;
  const newId = largestId + 1;

  return {
    userId: id,
    id: newId,
    title,
    completed: false,
    user: foundUser,
  };
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  const [id, setId] = useState(0);
  const [newTitle, setNewTitle] = useState('');
  const [submited, setSubmited] = useState(false);
  const [todoList, setTodoList] = useState(todos);

  const [idError, setIdError] = useState(false);
  const [titleError, setTitleError] = useState(false);

  const handleSubmit = (submitEvent: React.SyntheticEvent) => {
    submitEvent.preventDefault();
    setIdError(!id && true);
    setTitleError(!newTitle && true);
    setSubmited(current => (!current));
  };

  useEffect(() => {
    setIdError(id === null);
  }, [id]);

  useEffect(() => {
    setTitleError(newTitle === null);
  }, [newTitle]);

  useEffect(() => {
    if (id && newTitle) {
      const newTodo = createNewTodo(todoList, id, newTitle);

      setTodoList(current => [...current, newTodo]);
      setNewTitle('');
      setId(0);
    }
  }, [submited]);

  return (
    <section className="TodoList">
      <form onSubmit={submitEvent => handleSubmit(submitEvent)}>
        <label style={{ display: 'block' }}>
          Title:
          <input
            data-cy="titleInput"
            type="text"
            value={newTitle}
            placeholder="Enter a title"
            onChange={(titleEvent) => setNewTitle(titleEvent.target.value)}
          />
          {titleError && (
            <span style={{ color: '#ff0000' }} className="error">
              Please enter a title
            </span>
          )}
        </label>

        <label style={{ display: 'block' }}>
          User:
          <select
            data-cy="userSelect"
            value={id}
            onChange={(selectEvent) => setId(Number(selectEvent.target.value))}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map((user) => (
              <option value={user.id}>{user.name}</option>
            ))}
          </select>

          {idError && (
            <span style={{ color: '#ff0000' }} className="error">
              Please choose a user
            </span>
          )}
        </label>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      {todoList.map(todo => (
        <TodoInfo todo={todo} key={todo.id} data-id={todo.id} />
      ))}
    </section>
  );
};
