import React from 'react';
import PropTypes from 'prop-types';

const NewToDo = (
  { users,
    userId,
    newTodoTitle,
    handleTitleNewTodo,
    handleChangeUser,
    handleSubmit },
) => (
  <form onSubmit={handleSubmit} className="form__newTodo">
    <label>
      ToDo title:
      <input
        type="text"
        value={newTodoTitle}
        maxLength={100}
        onChange={handleTitleNewTodo}
      />
    </label>
    <label>
      Person:
      <select
        value={userId}
        onChange={handleChangeUser}
        required
      >
        <option value={' '} />
        {users.map(user => (
          <option
            key={user.id}
            value={user.id}
          >
            {user.name}
          </option>
        ))}
      </select>
      {/* {!errorUser && <div>Please choose the user</div>} */}
    </label>
    <button type="submit" className="form__button">
      Add ToDo
    </button>
  </form>
);

NewToDo.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  newTodoTitle: PropTypes.string.isRequired,
  handleTitleNewTodo: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  handleChangeUser: PropTypes.func.isRequired,
};

export default NewToDo;
