import { useState } from 'react';
import usersFromServer from '../../api/users';
import { User } from '../../types/User';
import { Todos } from '../../types/Todos';

type Props = {
  addTodo: (todo: Todos) => void,
};

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId)
      || null;
}

export const TodoForm: React.FC<Props> = ({ addTodo }) => {
  const [addNewTodo, setAddNewTodo] = useState({
    title: '',
    userId: '',
  });

  const { title, userId } = addNewTodo;
  const [hasErrorTitle, setHasErrorTitle] = useState('');
  const [hasErrorUserId, setHasErrorUserId] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setAddNewTodo(newTodo => (
      {
        ...newTodo,
        [name]: value,
      }
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      setHasErrorTitle('Please enter a title');
    }

    if (!userId) {
      setHasErrorUserId('Please choose a user');
    }

    if (title && userId) {
      addTodo({
        user: getUserById(+userId),
        id: 0,
        title,
        completed: false,
        userId: (+userId),
      });

      setAddNewTodo({
        title: '',
        userId: '',
      });
      setHasErrorTitle('');
      setHasErrorUserId('');
    }
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <label className="label" htmlFor="todoTitle">Title: </label>

        <input
          name="title"
          id="todoTitle"
          type="text"
          data-cy="titleInput"
          value={title}
          placeholder="Enter a title"
          onChange={handleChange}
        />
        {
          hasErrorTitle && (
            <span className="error">{hasErrorTitle}</span>
          )
        }

        {
          (title && hasErrorTitle) && (
            setHasErrorTitle('')
          )
        }
      </div>

      <div className="field">
        <label className="label" htmlFor="idUSer">User: </label>

        <select
          name="userId"
          id="idUser"
          data-cy="userSelect"
          value={userId}
          onChange={handleChange}
        >
          <option value="" disabled>Choose a user</option>
          {
            usersFromServer.map((user) => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))
          }
        </select>

        {
          hasErrorUserId && (
            <span className="error">{hasErrorUserId}</span>
          )
        }

        {
          userId && hasErrorUserId && (
            setHasErrorUserId('')
          )
        }
      </div>

      <button
        type="submit"
        data-cy="submitButton"
      >
        Add
      </button>
    </form>
  );
};
