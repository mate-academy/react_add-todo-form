import React from 'react';
import { Form } from './Form';
import './App.css';

import users from './api/users';
import todos from './api/todos';

class App extends React.Component {
  state = {
    todos,
  }

  addTodo = (todo) => {
    this.setState(prevsState => ({
      todos: [...prevsState.todos, todo],
    }));
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <Form
          users={users}
          addTodo={this.addTodo}
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
