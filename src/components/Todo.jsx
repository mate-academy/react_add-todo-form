import React from 'react';
import User from './User';
import TodoType from '../type';

const Todo = ({ title, completed, user }) => (
  <>
    <p>
      name:
      {' '}
      {' '}
      <User {...user} />
    </p>
    <p>
      {`title: ${title}`}
    </p>
    <p>
      status:
      {' '}
      {' '}
      {completed === true
        ? <span className="done">done</span>
        : <span className="undone">to do</span>
      }
    </p>
  </>
);

Todo.propTypes = TodoType.isRequired;

export default Todo;
