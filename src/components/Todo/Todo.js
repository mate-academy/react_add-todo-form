import React from 'react';
import { TodoShape } from './TodoShape';
import { User } from '../User';
import './Todo.css';

const classNames = require('classnames');

export const Todo = React.memo(
  ({ title, completed, user }) => (
    <div className="App__list">
      <div>
        <strong>
          Task
        </strong>
        {' : '}
        {title}
        <User {...user} />
      </div>
      <div>
        <div className={
          classNames({
            App__positive: completed,
            App__negative: !completed,
          })
        }
        />
      </div>
    </div>
  ),
);

Todo.propTypes = TodoShape;
