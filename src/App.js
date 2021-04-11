import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/todosList';

class App extends React.Component {
  state = {
    todoList: [...todos],
    todoTitle: '',
    err: '',
    chosenUser: 0,
  }

  render() {
    const addTodo = () => {
      if (this.state.todoTitle === '') {
        this.setState({ err: 'You can\'t create todo without title' });

        return;
      }

      if (this.state.chosenUser === 0) {
        this.setState({ err: 'Choose the user' });

        return;
      }

      this.setState(state => ({
        todoList: [...state.todoList, {
          title: state.todoTitle,
          id: state.todoList[state.todoList.length - 1].id + 1,
          userId: state.chosenUser,
        }],
        todoTitle: '',
        err: '',
      }));
    };

    return (
      <>
        <div className="App">
          <h1>Add todo form</h1>
          <div className="addTodoFormBlock">
            <input
              className="addTodoForm"
              value={this.state.todoTitle}
              onChange={
                (event) => {
                  this.setState({ todoTitle: event.target.value });
                }
              }
              placeholder="What do you need to do?"
            />
            <button
              type="button"
              className="addTodoButton"
              onClick={addTodo}
            >
              addTodo
            </button>
          </div>

          <select
            onChange={
              ({ target }) => {
                this.setState({ chosenUser: +target.value });
              }
            }
          >
            <option
              key={0}
              value=""
            >
              choose the user
            </option>
            {users.map(user => (
              <option
                key={`u${user.id}`}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          <div className="ErrBlock">
            <em>
              {this.state.err}
            </em>
          </div>
          <TodoList
            todos={this.state.todoList}
            users={users}
          />
          <p>
            <span>Users: </span>
            {users.length}
          </p>
        </div>
      </>
    );
  }
}

export default App;
