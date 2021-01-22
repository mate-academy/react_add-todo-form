import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import users from './api/users';
import todos from './api/todos';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const findUser = personId => users.find(person => person.id === personId);

const todoFromServer = todos.map(todo => ({
  ...todo,
  user: findUser(todo.userId),
}));

class App extends React.Component {
  state = {
    todoData: todoFromServer,
    lastId: todoFromServer.length,
  }

  addTodo = (arg) => {
    this.setState(prevState => ({
      todoData: [...prevState.todoData, arg],
    }));
  }

  render() {
    const { todoData, lastId } = this.state;

    return (
      <div className="App">
        <div className="App__section">
          <h1>Add todo form</h1>
          <p>
            <span>Users: </span>
            {users.length}
          </p>
          <TodoForm
            usersData={users}
            addTodo={this.addTodo}
            idLast={lastId}
          />
          <TodoList todoList={todoData} />
        </div>
      </div>
    );
  }
}

export default App;
