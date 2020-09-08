import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const NewTodoForm = ({ todoId, users, addNewTodo }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [id, setId] = useState(todoId);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUser, setErrorUser] = useState(false);

  const handleTitleNewTodo = (event) => {
    setTitle(event.target.value);
    setErrorTitle(false);
  };

  const handleChangeUser = (event) => {
    setUserId(event.target.value);
    setErrorUser(false);
  };

  const clearForm = () => {
    setTitle('');
    setUserId('');
    setId(todoId + 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim()) {
      setErrorTitle(true);

      return;
    }

    if (!userId) {
      setErrorUser(true);

      return;
    }

    const newTodo = {
      userId,
      title,
      id,
      person: users.find(user => user.id === +userId),
    };

    addNewTodo(newTodo);

    clearForm();
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <label className="form__item">
        TODO Title:
        <br />
        <input
          className="form__field"
          type="text"
          value={title}
          maxLength={100}
          onChange={handleTitleNewTodo}
        />
        {
          errorTitle
            ? (
              <div className="form__messageError">
                Please Enter The Title
              </div>
            )
            : ''
        }
      </label>

      <label className="form__item">
        Person:
        <br />
        <select
          className="form__field"
          value={userId}
          onChange={handleChangeUser}
        >
          {users.map(user => (
            <option
              key={user.id}
              value={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>
        {errorUser
          ? <div className="form__messageError">Please Make Your Choice</div>
          : ''}
      </label>
      <button type="submit" className="form__button form__item">
        ADD
      </button>
    </form>
  );
};

NewTodoForm.propTypes = {
  addNewTodo: PropTypes.func.isRequired,
  todoId: PropTypes.number.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
};
