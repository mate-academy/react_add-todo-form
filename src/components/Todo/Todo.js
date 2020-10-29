import React from 'react';

import { TodoShape } from '../shapes/TodoShape';
import { User } from '../User';

export const Todo = ({ title, completed, user }) => (
  <div className="item">
    <h2 className="ui top attached header">{title}</h2>
    <User {...user} />
    <div className="ui bottom attached segment">
      {completed
        ? <p className="ui green horizontal label">Completed</p>
        : <p className="ui red horizontal label">In process</p>
      }
    </div>
  </div>
);

Todo.propTypes = TodoShape;
