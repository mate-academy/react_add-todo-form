import React from 'react';
import {
  FormWithConstraints,
  FieldFeedbacks,
  FieldFeedback,
} from 'react-form-with-constraints';
import './App.css';
import { TodoList } from './components/TodoList';
import users from './api/users';
import todos from './api/todos';

const preparedList = todos.map(todo => ({
  ...todo,
  users: users.find(user => todo.userId === user.id),
}));

export default class App extends React.Component {
  state = {
    prepered: preparedList,
    nameOfTodo: '',
    selectName: '',
    userError: false,
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.form.validateFields(event.target);

    this.setState({
      [name]: value,
      userError: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.form.validateFields();

    const { nameOfTodo, selectName } = this.state;

    if (!selectName) {
      this.setState(state => ({
        userError: !state.selectName,
      }));

      return;
    }

    if (nameOfTodo && selectName) {
      this.setState(state => ({
        prepered: [...state.prepered, {
          title: state.nameOfTodo,
          name: state.selectName,
          id: state.prepered.length + 1,
        }],
      }));
    }

    this.setState({
      nameOfTodo: '',
      selectName: '',
    });
  }

  render() {
    return (
      <FormWithConstraints
        // eslint-disable-next-line no-return-assign
        ref={form => this.form = form}
        onSubmit={this.contactSubmit}
        noValidate
      >

        <div className="App">
          <h1>Add todo form</h1>
          <b>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="text">
                Todo:
              </label>
              <input
                type="text"
                name="nameOfTodo"
                placeholder="enter todo"
                value={this.state.nameOfTodo}
                onChange={this.handleChange}
              />
              <ul className="validator">
                <FieldFeedbacks for="nameOfTodo" stop="no">
                  <li>
                    <FieldFeedback
                      when={value => value.length === 0}
                    >
                      Please choose a user
                    </FieldFeedback>
                  </li>
                </FieldFeedbacks>
              </ul>
              <label htmlFor="text">
                Select user:
              </label>
              <select
                name="selectName"
                className="namesel"
                value={this.state.selectName}
                onChange={this.handleChange}
              >
                <option>Choose name</option>
                {users.map(user => (
                  <option
                    key={user.id}
                    value={user.name}
                  >
                    {user.name}
                  </option>
                ))}

              </select>
              <p
                className="user-error"
                hidden={!this.state.userError}
              >
                Please choose a user
              </p>
              <button type="submit">Add</button>
            </form>
          </b>

          <p>
            <span>Users: </span>

            <TodoList preparedList={this.state.prepered} />

          </p>
        </div>

      </FormWithConstraints>
    );
  }
}
