import React from 'react';
import { v4 as uuidV4 } from 'uuid';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './TodoForm.scss';

import { SelectError, TextAreaError } from '../Error';

export class TodoForm extends React.Component {
  state = {
    error: '',
    userId: '',
    title: '',
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { userId, title } = this.state;

    if (!title.trim() || !userId) {
      this.setState(state => ({
        error: !state.userId ? 'userId' : 'title',
      }));

      return;
    }

    const newTodo = {
      userId,
      title,
      id: uuidV4(),
      completed: Math.random() > 0.5,
    };

    this.props.handleAddTodo(newTodo);

    this.resetState();
  };

  resetState = () => {
    this.setState({
      userId: '',
      title: '',
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      error: '',
      [name]: name === 'userId' ? +value : value,
    });
  }

  render() {
    const {
      error,
      title,
      userId,
    } = this.state;

    return (
      <form className="form" onSubmit={this.handleSubmit}>
        {error === 'userId' && <SelectError />}
        {error === 'title' && <TextAreaError />}

        <div className="wraper">
          <div className={classNames(
            'select is-fullwidth',
            {
              'is-success': userId,
              'is-danger': error === 'userId',
            },
          )}
          >
            <select
              name="userId"
              className={classNames(
                'is-fullwidth',
                {
                  'is-success': !!userId,
                  'is-danger': error === 'userId',
                },
              )}
              value={userId}
              onChange={this.handleChange}
            >
              <option value="">Choose a user</option>
              {
                  this.props.users.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))
                }
            </select>
          </div>

          <button type="submit" className="button is-outlined"> Submit </button>
        </div>
        <div className="control">
          <textarea
            name="title"
            className={classNames(
              'textarea',
              {
                'is-success': title && userId,
                'is-danger': error === 'title',
              },
            )}
            placeholder=" Todo title..."
            value={userId ? title : ''}
            disabled={!userId}
            onChange={this.handleChange}
          />
        </div>
      </form>
    );
  }
}

TodoForm.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
  handleAddTodo: PropTypes.func.isRequired,
};
