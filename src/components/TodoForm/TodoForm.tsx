import usersFromServer from '../../api/users';

const TITLE_ERROR_MSG = 'Please enter a title';
const USER_ERROR_MSG = 'Please choose a user';

interface Props {
  handleSubmit: (event: React.FormEvent) => void;
  handleTitleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUserSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;

  formInputs: {
    title: string;
    userId: number;
  };
  firstOptionDisabled: boolean;
  errorStatuses: {
    title: boolean,
    user: boolean,
  };
}

export function TodoForm({
  handleSubmit,
  handleTitleInput,
  handleUserSelect,
  formInputs,
  errorStatuses,
  firstOptionDisabled,
}: Props) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          placeholder="Please enter a title"
          value={formInputs.title}
          onChange={handleTitleInput}
        />

        {errorStatuses.title && (
          <span className="error">
            {TITLE_ERROR_MSG}
          </span>
        )}
      </div>

      <div className="field">
        <select
          value={formInputs.userId}
          data-cy="userSelect"
          onChange={handleUserSelect}
        >
          <option value="0" disabled={firstOptionDisabled}>
            Сhoose a user
          </option>
          {usersFromServer.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {errorStatuses.user && (
          <span className="error">
            {USER_ERROR_MSG}
          </span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
}
