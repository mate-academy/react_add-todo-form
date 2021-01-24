import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { TodoList } from './components/TodoList/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';

import users from './api/users';
import todos from './api/todos';

const prepearedtodos = todos.map(todo => ({
  ...todo,
  userName: users.find(user => user.id === todo.userId).name,
}));

class App extends React.Component {
  state = {
    todosOnPage: prepearedtodos,
  }

  addTodo = ({ todoTitle, userName }) => {
    this.setState(state => ({
      todosOnPage: [...state.todosOnPage, {
        completed: false,
        id: state.todosOnPage[state.todosOnPage.length - 1].id + 1,
        title: todoTitle,
        userName,
        userId: users.find(user => user.name === userName).id,
      }],
    }));
  }

  render() {
    const { todosOnPage } = this.state;

    return (
      <Container className="App">
        <h1>Add todo form</h1>

        <TodoForm
          onAdd={this.addTodo}
        />

        <TodoList todos={todosOnPage} />
      </Container>
    );
  }
}

export default App;
