import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

const tasksWithUsers = todos.map(todo => ({
  ...todo,
  user: (users.find(user => user.id === todo.userId)).name,
}));

const headers = ['id', 'title', 'user'];

export class App extends React.Component {
  state = {
    textInput: '',
    tasks: tasksWithUsers,
    selectedUserId: 0,
    isComplited: false,
    hasTitleError: false,
    hasUserError: false,
  }

  addTodo = (task) => {
    this.setState(prevState => ({
      tasks: [...prevState.tasks, task],
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { tasks, selectedUserId, textInput, isComplited } = this.state;

    if (textInput === '') {
      this.setState({ hasTitleError: true });

      return;
    }

    if (selectedUserId === 0) {
      this.setState({ hasUserError: true });

      return;
    }

    const task = {
      id: tasks.length + 1,
      userId: selectedUserId,
      title: textInput,
      completed: isComplited,
      user: (users.find(user => user.id === selectedUserId)).name,
    };

    this.addTodo(task);
    this.setState({
      selectedUserId: 0,
      textInput: '',
      hasTitleError: false,
      hasUserError: false,
    });
  };

  render() {
    const {
      tasks,
      textInput,
      selectedUserId,
      hasTitleError,
      hasUserError,
    } = this.state;

    return (
      <>
        <div className="App">
          <form
            className="form"
            onSubmit={this.handleSubmit}
          >
            <input
              className="form__task"
              type="text"
              placeholder="Write what to do"
              value={textInput}
              onChange={(event) => {
                this.setState({ textInput: event.target.value });
              }}
            />
            {hasTitleError
              ? <div style={{ color: 'red' }}>Please enter a title</div>
              : null
            }
            <select
              className="form__user"
              value={selectedUserId}
              onChange={(event) => {
                this.setState({ selectedUserId: Number(event.target.value) });
              }}
            >
              <option value="0">Select user</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {hasUserError
              ? <div style={{ color: 'red' }}>Please choose a user</div>
              : null
            }
            <button type="submit" className="form__add">Add</button>
          </form>
          <table className="todos">
            <thead>
              <tr>
                {headers.map(title => (
                  <th key={title}>
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr
                  key={task.id}
                  className={
                    task.completed ? 'todo--complete' : 'todo--isntComplete'
                  }
                >
                  {headers.map(key => (
                    <td key={key}>{task[key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default App;
