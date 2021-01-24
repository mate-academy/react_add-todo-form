/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { User } from '../User';

import './Todo.css';

export class Todo extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    const { title, completed, user } = this.props;

    return (
      <>
        <td>{title}</td>
        <td className="user-name">
          <User {...user} />
        </td>
        <td className={completed ? 'completed' : 'not-completed'}>
          {completed ? 'Completed' : 'In progress'}
        </td>
      </>
    );
  }
}
