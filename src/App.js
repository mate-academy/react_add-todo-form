import React from 'react';
import './App.css';
import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList';
import { FormTodo } from './components/FormTodo';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

function getUserId(item) {
  return users.find(user => user.id === item);
}

class App extends React.Component {
  state = {
    todosData: preparedTodos,
  }

  addTodo = (title, userId) => {
    this.setState((prevState) => {
      const newTodo = {
        userId,
        title,
        completed: false,
        id: prevState.todosData.length + 1,
        user: getUserId(userId),
      };

      return ({
        todosData: [...prevState.todosData, newTodo],
      });
    });
  }

  render() {
    const { todosData } = this.state;

    return (
      <div className="App">
        <h1>Add todo</h1>
        <FormTodo
          addTodo={this.addTodo}
          users={users}
        />
        <TodoList todos={todosData} />
      </div>
    );
  }
}

export default App;
