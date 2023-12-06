import { Users } from '../types';

interface Props {
  isErrorTitle:boolean,
  isErrorSelect:boolean,
  handleSubmit: (event:React.FormEvent) => void;
  todoTitle: string,
  setTodoTitle:(event:string) => void;
  selectedId: number,
  setSelectedId:(id:number) => void,
  setIsErrorTitle: (value:boolean) => void,
  setIsErrorSelect: (value:boolean) => void
  usersFromServer: Users[]
}
export const TodoForm:React.FC<Props> = (props) => {
  const {
    isErrorSelect,
    isErrorTitle,
    handleSubmit,
    todoTitle,
    setTodoTitle,
    selectedId,
    setSelectedId,
    setIsErrorSelect,
    setIsErrorTitle,
    usersFromServer,
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
          onChange={(event) => {
            setTodoTitle(event.target.value);
            setIsErrorTitle(false);
          }}
          placeholder="Enter your todo"
        />
        {isErrorTitle
        && (<span className="error">Please enter a title</span>)}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={selectedId}
          onChange={(event) => {
            setSelectedId(Number(event.target.value));
            setIsErrorSelect(false);
          }}
        >
          <option value={0} disabled>Choose a user</option>
          {usersFromServer.map(user => (
            <option value={user?.id}>
              {user?.name}
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
