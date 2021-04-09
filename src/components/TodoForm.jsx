import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import usersFromServer from '../api/users';
import todosFromServer from '../api/todos';
import { TodoList } from './TodoList';
import './todoForm.scss';

export class TodoForm extends React.Component {
  state = {
    isTodoValid: true,
    isSelectValid: true,
    query: '',
    selectedName: '',
    todos: [...this.props.todos],
    lastTodoId: todosFromServer.length,
  }

  addTodo = (event) => {
    event.preventDefault();
    const { query, selectedName } = this.state;

    if (!query) {
      this.setState({
        isTodoValid: false,
      });
    }

    if (!selectedName) {
      this.setState({
        isSelectValid: false,
      });
    }

    if (query && selectedName) {
      this.setState(state => ({
        query: '',
        selectedName: '',
        lastTodoId: state.lastTodoId + 1,
        todos: [...state.todos,
          {
            title: state.query,
            completed: false,
            user: { name: state.selectedName },
            id: state.lastTodoId + 1,
          },
        ],
      }));
    }
  }

  render() {
    const {
      isSelectValid,
      isTodoValid,
      query,
      selectedName,
      todos,
    } = this.state;

    return (
      <>
        <form
          className="inputs-panel"
          name="newTotoForm"
          onSubmit={this.addTodo}
        >
          <label className="inputs-label">
            <input
              type="text"
              className="input"
              placeholder="Please, enter todo"
              value={query}
              maxLength="30"
              onChange={e => (
                this.setState({
                  query: e.target.value,
                  isTodoValid: true,
                })
              )}
            />
            <span
              className="error-message"
            >
              {isTodoValid || 'Please enter the title *'}
            </span>
          </label>
          <label className="inputs-label">
            <select
              name="user"
              className="input"
              value={selectedName}
              onChange={e => (
                this.setState({
                  selectedName: e.target.value,
                  isSelectValid: true,
                })
              )}
            >
              <option value="" disabled>Please select a user</option>
              {[...usersFromServer].map(user => (
                <option
                  value={user.name}
                  key={uuidv4()}
                >
                  {user.name}
                </option>
              ))}
            </select>
            <span
              className="error-message"
            >
              {isSelectValid
                ? ' '
                : 'Please choose a user *'}
            </span>
          </label>

          <button
            type="submit"
            className="button"
          >
            Add
          </button>
        </form>
        <TodoList todos={todos} />
      </>
    );
  }
}

TodoForm.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
      completed: PropTypes.bool.isRequired,
    }),
  ).isRequired,
};
