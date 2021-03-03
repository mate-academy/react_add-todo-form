import React from 'react';
import PropTypes from 'prop-types';
import { TodoForm } from '../TodoForm';
import { TodoList } from '../TodoList';
import { ErrorMessage } from '../ErrorMessage';
import './TodoNavigation.css';

export class TodoNavigation extends React.Component {
  state = {
    userId: 0,
    selectValue: 'Choose a user',
    todos: [...this.props.todos],
    inputValue: '',
    selectErrorHidden: true,
    titleErrorHidden: true,
    titleLengthErrorHidden: true,
    completed: false,
    checked: false,
  };

  select = (event) => {
    const { value } = event.target;
    const { users } = this.props;

    this.setState(state => ({
      todos: state.todos.map((todo) => {
        if (todo.user.name === value) {
          return ({
            ...todo,
            hidden: false,
          });
        }

        return ({
          ...todo,
          hidden: true,
        });
      }),
      userId: !value.includes('Choose a user')
        ? users.find(user => user.name === value).id
        : 0,
      selectValue: value,
      selectErrorHidden: true,
    }));
  }

  changeValue = (event) => {
    const { value } = event.target;

    this.setState({
      inputValue: value,
      titleErrorHidden: true,
      titleLengthErrorHidden: true,
    });
  }

  add = (event) => {
    event.preventDefault();

    this.setState((state) => {
      const newTodo = {
        userId: state.userId,
        id: state.todos.length + 1,
        title: state.inputValue,
        completed: false,
        hidden: false,
        user: this.props.users.find(user => user.id === state.userId),
      };

      if (state.selectValue === 'Choose a user') {
        return ({
          selectErrorHidden: false,
        });
      }

      if (!state.inputValue.length) {
        return ({
          titleErrorHidden: false,
        });
      }

      if (state.inputValue.length < 10) {
        return ({
          titleLengthErrorHidden: false,
        });
      }

      return ({
        todos: [...state.todos].concat(newTodo),
        inputValue: '',
      });
    });
  }

  status = (event) => {
    const { checked, id } = event.target;

    this.setState(state => ({
      todos: [...state.todos].map((todo) => {
        if (checked && todo.id === +id) {
          return ({
            ...todo,
            completed: true,
          });
        }

        if (!checked && todo.id === +id) {
          return ({
            ...todo,
            completed: false,
          });
        }

        return ({
          ...todo,
        });
      }),
    }));
  }

  render() {
    const { users } = this.props;

    return (
      <div className="TodoNavigation">
        <TodoForm
          users={users}
          select={this.select}
          changeValue={this.changeValue}
          add={this.add}
          {...this.state}
        />
        <ErrorMessage {...this.state} />
        <TodoList {...this.state} status={this.status} />
      </div>
    );
  }
}

TodoNavigation.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};
