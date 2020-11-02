import React from 'react';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import { TodoList } from './components/TodoList/TodoList';
import { Form } from './components/Form';

const preperedTodos = todosFromServer.map((todo) => {
  const user = usersFromServer.find(person => person.id === todo.userId);

  return {
    ...todo,
    user,
  };
});

class App extends React.Component {
  state = {
    todos: preperedTodos,
  }

  addTodo = (title, username) => {
    const user = usersFromServer.find(person => (
      person.name === username
    ));

    const newTodo = {
      userId: user.id,
      id: this.state.todos.length + 1,
      title,
      completed: false,
      user,
    };

    this.setState(prevState => ({
      todos: [...prevState.todos, newTodo],
    }));
  };

  render() {
    const { todos } = this.state;

    return (
      <div className="app">
        <div className="app__form">
          <h2>Add task</h2>
          <Form
            users={usersFromServer}
            addTodo={this.addTodo}
          />
        </div>

        <div className="app__todos">
          <h2>List of tasks</h2>
          <table className="ui celled selectable table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Title</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <TodoList todos={todos} />
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
