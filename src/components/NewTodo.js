import React from 'react';
import PropTypes from 'prop-types';

export class NewTodo extends React.Component {
  state = {
    addTodo: this.props.addTodo,
    users: this.props.users,
    todo: {
      userId: 0,
      id: this.props.todos.length,
      title: '',
      completed: false,
    },
    titleTemp: '',
  }

  submit = (event) => {
    this.setState(prev => ({ todo: {
      ...prev.todo, id: prev.todo.id + 1,
    } }), () => {
      this.state.addTodo(this.state.todo);

      this.setState(prev => ({
        todo: {
          ...prev.todo, title: '', userId: 0,
        },
      }));
    });
  }

  render() {
    const todo = { ...this.state.todo };

    return (
      <form
        id="form"
        onSubmit={(e) => {
          e.preventDefault();
          todo.title = this.state.titleTemp.trim();
          this.setState(() => ({
            todo: { ...todo },
          }), () => {
            if (this.state.todo.title.length !== 0
              && this.state.todo.userId !== 0) {
              document.querySelector('#form').reset();
              this.setState({ titleTemp: '' });
              this.submit();
            } else {
              if (this.state.todo.userId === 0) {
                document.querySelector('#users').style.backgroundColor = 'red';
              }

              if (this.state.todo.title.length === 0) {
                document.querySelector('#title').style.backgroundColor = 'red';
              }
            }
          });
        }}
      >
        <input
          id="title"
          type="text"
          value={this.state.titleTemp}
          onChange={(event) => {
            document
              .querySelector('#title')
              .style.removeProperty('background-color');
            this.setState({
              titleTemp: event.target.value
                .replace(/[^\w\d\s]/ig, '')
                .replace('  ', ' '),
            });
          }}
        />
        <select
          name="users"
          id="users"
          value={this.state.value}
          onChange={(e) => {
            todo.userId = +e.target.value;
            document
              .querySelector('#users')
              .style.removeProperty('background-color');

            this.setState(() => ({
              todo: { ...todo },
            }));
          }}
        >
          <option value="0">Choose a user</option>

          {this.state.users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <button type="submit">
          Submit
        </button>
      </form>
    );
  }
}

NewTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
  users: PropTypes.instanceOf(Array).isRequired,
  todos: PropTypes.instanceOf(Array).isRequired,
};
