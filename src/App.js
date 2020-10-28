import React from 'react';
import './App.css';
import { NewTodo } from './NewTodo/NewTodo';
import { TodosList } from './TodoList&TodoItem/TodosList';
import users from './api/users';
import todosStart from './api/todos';

const usersNames = users.map(user => ({
  name: user.name,
  id: user.id,
}));

let newId = todosStart.length + 1;

class App extends React.Component {
  state ={
    todos: [...todosStart],
  }

  addTodo = (todo) => {
    newId += 1;

    return (
      this.setState(prevState => ({
        todos: [...prevState.todos, todo],
      })));
  }

  putFlag = id => (
    this.setState(prevState => ({
      todos: prevState.todos.map(
        todo => ((todo.id === id)
          ? {
            name: todo.name,
            id: todo.id,
            userId: todo.userId,
            done: !(prevState.todos.find(user => user.id === id).done),
          }
          : todo),
      ),
    }))
  )

  render() {
    const { todos } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <NewTodo usersNames={usersNames} addTodo={this.addTodo} id={newId} />
        <TodosList
          todos={todos}
          flag={this.putFlag}
        />
        <p>
          Total number of todos:&nbsp;
          {todos.length}
          &nbsp;&nbsp;
          Completed:&nbsp;
          {todos.filter(todo => todo.done).length}
        </p>
      </div>
    );
  }
}

export default App;
