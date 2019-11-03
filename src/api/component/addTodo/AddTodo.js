import React from 'react';
import PropTypes from 'prop-types';
import './AddTodo.css';

const AddTodo = ({
  submitHandler, changeTitle, title, selectedHandler, selectRef, users, id,
}) => (
  <form onSubmit={submitHandler}>
    <div className="ui input">
      <input
        type="text"
        placeholder="що треба зробити?"
        onChange={changeTitle}
        value={title}
      />
    </div>
    <select
      onChange={selectedHandler}
      className="ui fluid dropdown"
      ref={selectRef}
    >
      <option value="">Виберіть відповідального</option>
      {users.map((item, index) => (
        <option
          key={id}
        >
          {item.name}
        </option>
      ))}
    </select>

    <button type="submit">
        Додати
    </button>
  </form>
);

AddTodo.propTypes = {
  submitHandler: PropTypes.func.isRequired,
  changeTitle: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  selectedHandler: PropTypes.func.isRequired,
  selectRef: PropTypes.objectOf(PropTypes.func).isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.number.isRequired,
};

export default AddTodo;
