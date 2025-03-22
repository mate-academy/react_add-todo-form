import { useState } from 'react';
import { Todo } from '../../types/todo';
import { User } from '../../types/user';
import { nullUser } from '../../App';

type Props = { users: User[]; onAdd: (todo: Todo) => void; maxId: number };

export const AddTodoForm: React.FC<Props> = ({ users, onAdd, maxId }) => {
  const [newTodo, setNewTodo] = useState<Todo>({
    id: maxId + 1,
    title: '',
    completed: false,
    userId: 0,
    user: nullUser,
  });
  //const [titleTouched, setTitleTouched] = useState(false);
  //const [usersTouched, setUsersTouched] = useState(false);
  const [isUserError, setUserError] = useState(false);
  const [isTitleError, setTitleError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newTodo.user.id || !newTodo.title.trim()) {
      if (!newTodo.user.id) {
        setUserError(true);
      }

      if (!newTodo.title.trim()) {
        setTitleError(true);
      }

      return;
    }

    onAdd(newTodo);
    //setTitleTouched(false);
    //setUsersTouched(false);
    setNewTodo({
      id: maxId + 1,
      title: '',
      completed: false,
      userId: 0,
      user: nullUser,
    });
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          title="Title"
          placeholder="Title"
          value={newTodo.title}
          onChange={event => {
            //setTitleTouched(false);
            setTitleError(false);
            setNewTodo(prev => ({
              ...prev,
              title: event.target.value
                .split('')
                .filter(
                  char => char === ' ' || char.toLowerCase !== char.toUpperCase,
                )
                .join(''),
            }));
          }}
          //onBlur={() => setTitleTouched(true)}
        />
        {isTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          title="userSelect"
          defaultValue={'0'}
          value={newTodo.userId}
          onChange={event => {
            //setUsersTouched(false);
            setUserError(false);
            setNewTodo(prev => ({
              ...prev,
              userId: +event.target.value,
              user:
                users.find(user => user.id === +event.target.value) || nullUser,
            }));
          }}
          //onBlur={() => setUsersTouched(true)}
        >
          <option value={'0'}>Choose a user</option>
          {users.map(user => (
            <option key={user.id} value={String(user.id)}>
              {user.name}
            </option>
          ))}
        </select>

        {isUserError && <span className="error">Please choose a user</span>}
      </div>

      <button
        type="submit"
        data-cy="submitButton"
        //disabled={!newTodo.title || newTodo.user.id === 0}
      >
        Add
      </button>
    </form>
  );
};
