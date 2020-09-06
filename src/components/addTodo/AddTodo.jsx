import React from 'react';
import './AddTodo.css';

import todosFromServer from '../../api/todos';
import users from '../../api/users';

import { ShowTodos } from '../showTodos';

const prepTodos = todosFromServer.map(todo => (
  {
    ...todo,
    user: users.find(user => user.id === todo.userId),
  }
));

export class AddTodos extends React.Component {
  state = {
    todos: prepTodos,
    eror: false,
    user: '',
    title: '',
  }

  toUser = (event) => {
    this.setState({
      user: event.target.value,
      eror: false,
    });
  }

  addTask = (event) => {
    this.setState({
      title: event.target.value,
      eror: false,
    });
  }

  submitForm = (event) => {
    const { todos, title, user } = this.state;

    event.preventDefault();

    if (user === '' && title === '') {
      this.setState({ eror: 'PLEASE CHOOSE A USER AND ENTER THE TASK !!!' });
    } else if (user === '') {
      this.setState({ eror: 'PLEASE CHOOSE A USER !!!' });
    } else if (title === '') {
      this.setState({ eror: 'PLEASE ENTER THE TASK !!!' });
    } else {
      this.setState({
        todos: [...todos, {
          userId: users.find(usr => usr.name === user).id,
          id: todos.length + 1,
          title,
          completed: false,
          user: users.find(usr => usr.name === user),
        }],
        title: '',
        user: '',
        eror: false,
      });
    }
  }

  render() {
    const { todos, title, eror } = this.state;

    return (
      <>
        <form
          onSubmit={this.submitForm}
          className="form"
        >
          <div>
            <select
              className="form__field"
              onChange={this.toUser}
              value={this.state.user}
            >
              <option value="">
                Choose a user
              </option>
              {users.map(user => (
                <option
                  key={user.id}
                  value={user.name}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <input
              value={title}
              type="text"
              placeholder="Pleas write a task for user"
              onChange={this.addTask}
              className="form__field"
            />
            <button
              className="form__field"
              type="submit"
            >
              Send
            </button>

            <div className={eror ? 'form__eror' : ''}>
              {eror}
            </div>
          </div>
        </form>

        <ShowTodos todos={todos} />
      </>
    );
  }
}
