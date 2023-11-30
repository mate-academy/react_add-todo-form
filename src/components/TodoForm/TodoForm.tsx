import usersFromServer from '../../api/users';

interface Props {
  handleSubmit: (event: React.FormEvent) => void;
  handleTitleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUserSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;

  formInputs: {
    title: string;
    userId: number;
  };
  titleErrorMessage: string;
  firstOptionDisabled: boolean;
  userErrorMessage: string;
}

export function TodoForm(props: Props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          placeholder="Please enter a title"
          value={props.formInputs.title}
          onChange={props.handleTitleInput}
        />

        {props.titleErrorMessage && (
          <span className="error">
            {props.titleErrorMessage}
          </span>
        )}
      </div>

      <div className="field">
        <select
          value={props.formInputs.userId}
          data-cy="userSelect"
          onChange={props.handleUserSelect}
        >
          <option value="0" disabled={props.firstOptionDisabled}>
            Сhoose a user
          </option>
          {usersFromServer.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {props.userErrorMessage && (
          <span className="error">
            {props.userErrorMessage}
          </span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
}
