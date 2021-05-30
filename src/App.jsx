import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

const TodosWithUsers = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId).name,
  isVisible: true,
}));

class App extends React.Component {
  state = {
    renderList: TodosWithUsers,
    title: '',
    user: '',
    completed: false,
    taskError: true,
    userError: true,
  }

  eventTitleOnChange = event => (
    this.setState({
      title: event.target.value,
      taskError: true,
    }));

  eventUserOnChange = event => this.setState({
    user: event.target.value,
    userError: true,
  });

  addNewTask = (event) => {
    event.preventDefault();

    if (!this.state.title) {
      this.setState({ taskError: false });
    } else {
      this.setState({ taskError: true });
    }

    if (!this.state.user) {
      this.setState({ userError: false });
    } else {
      this.setState({ userError: true });
    }

    if (this.state.title && this.state.user) {
      this.setState(state => ({
        renderList: [
          ...state.renderList,
          {
            id: state.renderList.length + 1,
            title: state.title,
            completed: state.completed,
            user: state.user,
          },
        ],

        title: '',
        completed: false,
        user: '',
      }));
    }
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>

        <form
          className="App__form"
          onSubmit={this.addNewTask}
        >
          <input
            className="App__enterText"
            type="text"
            name="title"
            placeholder="Enter a new task"
            value={this.state.title}
            onChange={this.eventTitleOnChange}
          />

          {!this.state.taskError
            && <div className="App__error">Pls write a new task</div>}

          <select
            className="App__select"
            value={this.state.user}
            onChange={this.eventUserOnChange}
          >
            <option value="">Choose a user</option>

            {users.map(user => (
              <option key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {!this.state.userError
            && <div className="App__error">Pls choose a user</div>}

          <button type="submit" className="App__button">
            Add a new task
          </button>
        </form>

        <ul className="App__list">
          {this.state.renderList.map(todo => (
            <li key={todo.id} className="App__item">
              <h3>{todo.user}</h3>

              <span>
                {`Task: `}
                <strong className="App__card-title">{todo.title}</strong>
              </span>

              <p>
                {`Status: `}
                {todo.completed
                  ? <strong className="App__card-completed">Completed</strong>
                  : (
                    <strong className="App__card-notCompleted">
                      Not completed
                    </strong>
                  )
                }
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
