import React from 'react';
import { Form } from './Form';
import './App.css';

import users from './api/users';
import todos from './api/todos';

const { uuid } = require('uuidv4');

class App extends React.Component {
  state = {
    todos,
    selectedUserName: 'Choose User',
    title: '',
    shouldCreateTitleError: false,
    shouldCreateUserError: false,
  }

  handleSelectChange = (event) => {
    this.setState({
      selectedUserName: event.target.value,
    });

    if (event.target.value !== 'Choose User') {
      this.setState({
        shouldCreateUserError: false,
      });
    }
  }

  handleInputChange = (event) => {
    this.setState({
      title: event.target.value,
    });
    if (event.target.value !== '') {
      this.setState({
        shouldCreateTitleError: false,
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.title === '') {
      this.setState({
        shouldCreateTitleError: true,
      });
    }

    if (this.state.selectedUserName === 'Choose User') {
      this.setState({
        shouldCreateUserError: true,
      });
    }

    if (this.state.selectedUserName === 'Choose User'
      || this.state.title === '') {
      return;
    }

    const createdTodo = {
      userId: users.find(user => user.name === this.state.selectedUserName).id,
      id: uuid(),
      title: this.state.title,
      completed: false,
    };

    this.setState(prevState => ({
      todos: [...prevState.todos, createdTodo],
      selectedUserName: 'Choose User',
      title: '',
    }));
  }

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        {this.state.shouldCreateTitleError && (
          <p className="error">
            Warning: Please enter the title!!!
          </p>
        )}
        {this.state.shouldCreateUserError && (
          <p className="error">
            Warning: Please choose a user
          </p>
        )}
        <Form
          users={users}
          onSubmit={this.handleSubmit}
          title={this.state.title}
          onInputChange={this.handleInputChange}
          onSelectChange={this.handleSelectChange}
          selectedUserName={this.state.selectedUserName}
        />
        <ul className="todolist">
          {this.state.todos.map(todo => (
            <li key={todo.id}>
              <div className="todolist__card card">
                <div>
                  {`Title: `}
                  {todo.title}
                </div>
                <div>
                  {`User: `}
                  {
                    users.find(user => todo.userId === user.id).name
                  }
                </div>
                <div>
                  {`Completed: `}
                  {todo.completed
                    ? (
                      <span role="img" aria-label="Tick">
                        &#9989;
                      </span>
                    )
                    : (
                      <span role="img" aria-label="Cross">
                        &#10060;
                      </span>
                    )
                  }
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
