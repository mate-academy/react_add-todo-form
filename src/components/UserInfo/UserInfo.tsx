import { User } from '../../types/index';

type UserProps = {
  user: User;
};
export const UserInfo = ({ user }: UserProps) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
/*
import React from 'react';
import { User } from '../../types/User';
// import { Post } from '../../types/Post';

type Props = {
  users: User[];
  makeNewPost: (pickedUserId: number, title: string) => void;
};
/*
 {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
  }


export const UserInfo: React.FC<Props> = ({ users, makeNewPost }) => {
  const [inputTitle, setInputTitle] = React.useState('');
  const [selectedUserId, setSelectedUserId] = React.useState(0);
  const [isErrorTile, setIsErrorTile] = React.useState(false);
  const [isErrorUser, setIsErrorUser] = React.useState(false);

  const handleTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(event.target.value);
    setIsErrorTile(false);
  };

  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = Number(event.target.value);

    setSelectedUserId(userId);
    setIsErrorUser(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputTitle.trim() && selectedUserId !== 0) {
      makeNewPost(Number(selectedUserId), inputTitle.trim());
      setInputTitle('');
      setSelectedUserId(0);
      setIsErrorTile(false);
      setIsErrorUser(false);

      return;
    }

    if (!inputTitle.trim()) {
      setIsErrorTile(true);
    }

    if (selectedUserId === 0) {
      setIsErrorUser(true);
    }
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={inputTitle}
          onChange={handleTitleInput}
        />
        {isErrorTile && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="user">User: </label>
        <select
          data-cy="userSelect"
          value={selectedUserId}
          onChange={e => handleUserSelect(e)}
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {users.map(user => {
            return (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            );
          })}
        </select>
        {isErrorUser && <span className="error">Please select a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
*/
