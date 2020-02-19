import React from 'react';
import PropTypes from 'prop-types';

import './TodoList.css';

import { Todo } from '../Todo/Todo';
import { NewTodo } from '../NewTodo/NewTodo';

export class TodoList extends React.Component {
  state = {
    todos: this.props.todos,
    users: this.props.users,
    title: '',
    userId: 0,
    id: 3,
    errors: false,
  }

    selectedUserId = (event) => {
      const userId = Number(event.target.value);

      this.setState({
        userId,
      });
    }

    handleChange = (event) => {
      const title = event.target.value;

      this.setState({
        title,
      });
    }

    addTask = (event) => {
      event.preventDefault();
      const { title, userId } = this.state;

      if (title.length > 0 && userId > 0) {
        this.setState(prevState => ({
          todos: [
            ...prevState.todos,
            {
              id: prevState.id,
              userId: prevState.userId,
              title: prevState.title.trim(),
              completed: false,
            },
          ],
          title: '',
          userId: 0,
          id: prevState.id + 1,
          errors: false,
        }));
      } else {
        this.setState({
          errors: true,
        });
      }
    }

    render() {
      const { todos, title, users, userId, errors } = this.state;

      return (
        <>
          <table className="tableWrapper">
            <thead>
              <tr className="tableTitle">
                <th className="tableCell">№</th>
                <th className="tableCell">Task</th>
                <th className="tableCell">User id</th>
              </tr>
            </thead>
            <tbody>
              {todos.map(todo => <Todo key={todo.title} todo={todo} />)}
            </tbody>
          </table>
          <NewTodo
            addTask={this.addTask}
            handleChange={this.handleChange}
            selectedUserId={this.selectedUserId}
            title={title}
            userId={userId}
            users={users}
            errors={errors}
          />
        </>
      );
    }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
  users: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
};
