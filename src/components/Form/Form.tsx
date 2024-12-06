import { useState } from "react";
import usersFromServer from '../../api/users';
import { EnrichedTodo } from "../../types/EnrichedTodo";
import { getUserById } from "../../services/user";

type Props = {
  onSubmit: (todo: EnrichedTodo) => void
}

export const Form: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title === '' || userId === 0) {
      return
    }

    onSubmit({
      id: 0,
      title,
      completed: false,
      userId,
      user: getUserById(userId)
    })

    setTitle('')
    setUserId(0)
  }

  return (
    <form action="/api/todos" method="POST">
      <div className="field">
        <label htmlFor="title">
          Title:
          <input
            id='title'
            required
            type="text"
            data-cy="titleInput"
            placeholder='Enter a title'
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        {title === '' && (<span className="error">Please enter a title</span>)}
      </div>
      <div className="field">
        <label htmlFor="user">
          User:
          <select
            id='user'
            data-cy="userSelect"
            required
            value={userId}
            onChange={(event) => setUserId(+event.target.value)}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map((user) => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>
        {userId === 0 && (<span className="error">Please choose a user</span>)}
      </div>

      <button
        type="submit"
        data-cy="submitButton"
        onClick={(event) => handleSubmit(event)}
      >
        Add
      </button>
    </form>
  )
};
