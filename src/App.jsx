import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import { TodosList } from './components/todosList';

const TodosWithUsers = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId).name,
  isVisible: true,
}));

class App extends React.Component {
  state = {
    renderList: [...TodosWithUsers],
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

  eventUserOnChange = event => (
    this.setState({
      user: event.target.value,
      userError: true,
    }));

  addNewTask = (event) => {
    event.preventDefault();
    const { title, user } = this.state;

    if (!title) {
      this.setState({ taskError: false });
    }

    if (!user) {
      this.setState({ userError: false });
    }

    if (title && user) {
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
    const { renderList, title, user, userError, taskError } = this.state;

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
            value={title}
            onChange={this.eventTitleOnChange}
          />

          {!taskError
            && <div className="App__error">Pls write a new task</div>}

          <select
            className="App__select"
            value={user}
            onChange={this.eventUserOnChange}
          >
            <option value="">Choose a user</option>

            {users.map(man => (
              <option key={man.id}>
                {man.name}
              </option>
            ))}
          </select>

          {!userError
            && <div className="App__error">Pls choose a user</div>}

          <button type="submit" className="App__button">
            Add a new task
          </button>
        </form>

        <TodosList todos={renderList} />
      </div>
    );
  }
}

export default App;
