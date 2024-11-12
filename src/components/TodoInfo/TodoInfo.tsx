export const TodoInfo = () => {
  return (
    <>
      <div className="field">
        <label htmlFor="title-input">Title: </label>
        <input
          id="title-input"
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
        />

        <span className="error">Please enter a title</span>
      </div>

      <div className="field">
        <label htmlFor="title-input">User: </label>
        <select data-cy="userSelect">
          <option value="0" disabled>
            Choose a user
          </option>
        </select>

        <span className="error">Please choose a user</span>
      </div>
    </>
  );
};
