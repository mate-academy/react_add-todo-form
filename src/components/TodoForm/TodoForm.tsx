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

export const TodoForm = (props: Props) => (
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
        data-cy="userSelect"
        value={props.formInputs.userId}
        onChange={props.handleUserSelect}
      >
        <option
          value="0"
          disabled={props.firstOptionDisabled}
        >
          Choose a user
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
