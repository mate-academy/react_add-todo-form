import React from 'react';

interface Props {
  addTodo: (event: React.SyntheticEvent) => void;
  handleChangeSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  newTodo: string;
  selectedUser: string;
  titleError: boolean;
  userError: boolean;
  usersFromServer: User[];
}

export const AddTodoForm: React.FC<Props> = (props) => {
  const {
    addTodo,
    usersFromServer,
    handleChangeSelect,
    handleChangeInput,
    newTodo,
    selectedUser,
    titleError,
    userError,
  } = props;

  return (
    <form className="row gx-3 gy-2 align-items-center" onSubmit={addTodo}>
      <div className="col-auto">
        <input
          className="form-control"
          placeholder="Enter a title"
          type="text"
          name="todoInput"
          value={newTodo}
          onChange={handleChangeInput}
          pattern="^[A-Za-zА-Яа-яЁё0-9\s]+$"
        />
      </div>
      <div className="col-auto">
        <select
          className="form-select"
          value={selectedUser}
          onChange={handleChangeSelect}
        >
          <option value="">
            Choose a user
          </option>
          {usersFromServer.map((user: User) => (
            <option key={user && user.id} value={user && user.name}>
              {user && user.name}
            </option>
          ))}
        </select>
      </div>
      <div className="Error">
        {titleError && <div className="Error__message">Please enter the title</div>}
        {userError && <div className="Error__message">Please chose a user</div>}
      </div>
      <div className="col-auto">
        <button className="btn btn-primary btn-lg" type="submit">Add</button>
      </div>
    </form>
  );
};
