import { useState } from 'react';
import usersFromServer from '../../api/users';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Todos = {
  user: User | null;
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

type Props = {
  addTodo: (todo: Todos) => void,
};

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId)
      || null;
}

export const TodoForm: React.FC<Props> = ({ addTodo }) => {
  const [formFields, setFormFields] = useState({
    title: '',
    userId: '',
  });

  const { title, userId } = formFields;
  const [hasErrorTitle, setHasErrorTitle] = useState('');
  const [hasErrorUserId, setHasErrorUserId] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormFields(formField => (
      {
        ...formField,
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

      setFormFields({
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
