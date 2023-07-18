import usersFromServer from '../../api/users';

type Props = {
  onSubmit: (event: React.FormEvent) => void,
  title: string;
  setTitle: (value: string) => void,
  userId: number;
  setUserId: (value: number) => void,
  titleError: string;
  setTitleError: (value: string) => void,
  userIdError: string,
  setUserIdError: (value: string) => void,
};

export const TodoForm: React.FC<Props> = ({
  onSubmit,
  title,
  setTitle,
  userId,
  setUserId,
  titleError,
  setTitleError,
  userIdError,
  setUserIdError,
}) => (
  <form
    action="/api/todos"
    method="POST"
    onSubmit={onSubmit}
  >
    <div className="field">
      <label htmlFor="title">Title: </label>
      <input
        type="text"
        data-cy="titleInput"
        id="title"
        placeholder="Enter a title"
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
          setTitleError('');
        }}
      />
      {titleError && (
        <span className="error">{titleError}</span>
      )}
    </div>

    <div className="field">
      <label htmlFor="userSelect">User: </label>
      <select
        data-cy="userSelect"
        id="userSelect"
        value={userId}
        onChange={(event) => {
          setUserId(+event.target.value);
          setUserIdError('');
        }}
      >
        <option value="0" disabled>Choose a user</option>
        {usersFromServer.map(user => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>

      {userIdError && (
        <span className="error">{userIdError}</span>
      )}
    </div>

    <button
      type="submit"
      data-cy="submitButton"
    >
      Add
    </button>
  </form>
);
