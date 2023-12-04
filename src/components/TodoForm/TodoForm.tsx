import usersFromServer from '../../api/users';

type Props = {
  handleSubmit: (event: React.FormEvent) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUserIdChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;

  formInputs: {
    title: string;
    userId: number;
  };

  titleErrorMessage: string;
  userErrorMessage: string;
};

export const TodoForm: React.FC<Props> = (props: Props) => {
  return (
    <>
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={props.handleSubmit}
      >

        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              value={props.formInputs.title}
              onChange={props.handleInputChange}
              placeholder="Enter a title"
            />
          </label>

          {props.titleErrorMessage && (
            <span className="error">
              {props.titleErrorMessage}
            </span>
          )}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={props.formInputs.userId}
              onChange={props.handleUserIdChange}
            >
              <option value="0" disabled>Choose a user</option>

              {usersFromServer.map(user => (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))}

            </select>
          </label>

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
    </>
  );
};
