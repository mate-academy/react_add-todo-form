import React, { useState } from 'react';
import './Form.css';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import users from '../../api/users';

export const Form = ({ startList, addTodo }) => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const obj = {
    id: startList[startList.length - 1].id + 1,
    title,
    completed: status === 'done',
    user: {
      name,
    },
  };

  const newList = (event) => {
    event.preventDefault();

    if (!name) {
      setError('Choose your name, please');
    } else if (!title) {
      setError(`Write todo's title, please`);
    } else if (!status) {
      setError('Do you already complete?');
    } else {
      addTodo([...startList, obj]);
      setName('');
      setTitle('');
      setStatus('');
    }
  };

  return (
    <form
      onSubmit={newList}
      className="form"
    >
      <select
        value={name}
        onChange={(event) => {
          setName(event.target.value);
          setError('');
        }}
      >
        <option>Choose a user</option>
        {users.map(user => (
          <option
            key={user.id}
            value={user.name}
          >
            {user.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        name="title"
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
          setError('');
        }}
      />
      <div className="radio">
        <label htmlFor="done">Done</label>
        <input
          type="radio"
          name="done"
          id="done"
          value="done"
          checked={status === 'done'}
          onChange={(event) => {
            setStatus(event.target.value);
            setError('');
          }}
        />
        <label htmlFor="done">Not-completed</label>
        <input
          type="radio"
          name="not-completed"
          id="not-completed"
          value="not-completed"
          checked={status === 'not-completed'}
          onChange={event => setStatus(event.target.value)}
        />
      </div>
      <button className="button" type="submit"> Add </button>
      <div className="error">
        {error && (
          (!name && (
            <p className={classNames({
              'error-name': error === 'Choose your name, please',
            })}
            >
              {error}
            </p>
          )) || (!title && (
            <p className={classNames({
              'error-title': error === `Write todo's title, please`,
            })}
            >
              {error}
            </p>
          )) || (!status && (
            <p className={classNames({
              'error-status': error === 'Do you already complete?',
            })}
            >
              {error}
            </p>
          ))
        )}
      </div>
    </form>
  );
};

Form.propTypes = {
  startList: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
  addTodo: PropTypes.func.isRequired,
};
