import users from '../../api/users';

interface Props {
  isErrorTitle: boolean,
  isErrorSelect: boolean,
  handleSubmit: (event:React.FormEvent) => void;
  todoTitle: string,
  selectedId: number,
  handleInput: (value:React.ChangeEvent<HTMLInputElement>) => void;
  handleSelect: (value: React.ChangeEvent<HTMLSelectElement>) => void;
}
export const TodoForm:React.FC<Props> = (props) => {
  const {
    isErrorSelect,
    isErrorTitle,
    handleSubmit,
    todoTitle,
    selectedId,
    handleInput,
    handleSelect,
  } = props;

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
          value={todoTitle}
          onChange={handleInput}
          placeholder="Enter your todo"
        />
        {isErrorTitle
        && (<span className="error">Please enter a title</span>)}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={selectedId}
          onChange={handleSelect}
        >
          <option value={0} disabled>Choose a user</option>
          {users.map(({ id, name }) => (
            <option value={id}>
              {name}
            </option>
          ))}
        </select>

        {isErrorSelect && (<span className="error">Please choose a user</span>)}
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
