import React from 'react';
import { TodoShape } from '../Shapes/TodoShape';
import { User } from '../User';

export const Todo = ({ title, completed, user }) => (
  <>
    <User {...user} />
    <td>
      {title}
    </td>
    {completed
      ? <td className="positive">Completed</td>
      : <td className="negative">In process</td>
    }
  </>
);

Todo.propTypes = TodoShape;
