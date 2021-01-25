import React from 'react';

import { TodoShape } from '../../shapes/TodoShape';
import { User } from '../User';

export const Todo = ({ title, completed, user }) => (
  <div className="item">
    <h3 className="ui top attached inverted green header">{title}</h3>
    <User {...user} />
    {completed
      ? <p className="ui green tag label">Completed</p>
      : <p className="ui orange tag label">In process</p>
    }
  </div>
);

Todo.propTypes = TodoShape;
