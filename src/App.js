import React from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

import users from './api/users';
import todos from './api/todos';

class App extends React.Component {
  state = {
    todoList: todos.map(todo => ({
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
      name: users.find(person => person.id
        === todo.userId).name,
    })),
    inputText: 's',
    selectValue: 's',
  }

  render() {
    const { inputText, selectValue } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <p>
          <span>Users: </span>
          <table>
            <tr>
              <th>№</th>
              <th>Task</th>
              <th>Status</th>
              <th>User</th>
            </tr>

            {
              this.state.todoList.map((todo) => {
                const { id, title, completed, name } = todo;

                return (
                  <tr key={uuidv4()}>
                    <td>{id}</td>
                    <td>{title}</td>
                    <td>{completed ? 'completed' : 'not completed'}</td>
                    <td>
                      {name}
                    </td>
                  </tr>
                );
              })
            }
          </table>
          <form onSubmit={(event) => {
            event.preventDefault();
            this.setState(({ todoList }) => ({
              todoList: [...todoList,
                {
                  id: todoList.length + 1,
                  title: inputText,
                  completed: false,
                  name: selectValue,
                },
              ],
            }));
          }}
          >
            <input
              type="text"
              onChange={(event) => {
                this.setState({ inputText: event.target.value });
              }}
              value={this.state.inputText}
            />
            <select
              value={this.state.selectValue}
              onChange={(event) => {
                this.setState({ selectValue: event.target.value });
              }}
            >
              {
                users.map((person) => {
                  const { name } = person;

                  return (
                    <option value={name}>
                      {name}
                    </option>
                  );
                })
              }

            </select>
            <button
              type="submit"
            >
              add
            </button>
          </form>
        </p>
      </div>
    );
  }
}

export default App;
