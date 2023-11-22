import usersFromServer from '../../api/users';

type Props = {
  handleSubmit: (e: any) => void
  handlePersonChange: (e: any) => void
  handleTitleChange: (e: any) => void
  title: string,
  personValue: string
};

export const TodoForm: React.FC<Props> = ({
  handleSubmit,
  handlePersonChange,
  handleTitleChange,
  title,
  personValue,
}) => {
  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={handleTitleChange}
        />
        {title.length === 0
          ? <span className="error">Enter a title</span> : ''}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={personValue}
          onChange={handlePersonChange}
        >
          <option value="" disabled>Choose a user</option>
          {usersFromServer.map((user) => (
            <option
              value={user.name}
              key={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>

        {personValue === ''
          ? <span className="error">Choose a user</span> : ''}
      </div>

      <button
        type="submit"
        data-cy="submitButton"
        disabled={!title.trim()
           || title.length === 0 || personValue.length === 0}
      >
        Add
      </button>
    </form>

  );
};
