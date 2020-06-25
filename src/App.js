/* eslint-disable consistent-return */
/* eslint-disable no-alert */
import React from 'react';
import './App.css';
import { Select } from './Select&Option/Select';
import { TodosList } from './TodoList&TodoItem/TodosList';
import users from './api/users';
import todosStart from './api/todos';

const usersNames = users.map(user => ({
  name: user.name,
  id: user.id,
}));

let todoId = todosStart.length;

class App extends React.Component {
  state ={
    selectedUser: 'Select User',
    todoToAdd: '',
    todos: [...todosStart],
  }

  selectUser = (ev) => {
    ev.persist();

    return (this.setState(prevState => ({
      selectedUser: ev.target.value,
    })));
  }

  addTodo = (ev) => {
    ev.preventDefault();
    if (this.state.selectedUser === 'Select User') {
      alert('You need to choose user');
    } else if (this.state.todoToAdd.length < 10) {
      alert('Min length 10 letters');
    } else {
      todoId += 1;

      return (
        this.setState(prevState => ({
          todos: [...prevState.todos, {
            name: prevState.todoToAdd,
            userId: users.find(user => user.name === prevState.selectedUser).id,
            id: todoId,
            done: false,
          }],
          todoToAdd: '',
          selectedUser: 'Select User',
        })));
    }
  }

  changedInput = (ev) => {
    ev.persist();

    return (this.setState(prevState => ({
      todoToAdd: ev.target.value,
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
    const { selectedUser, todos, todoToAdd } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form className="Form" onSubmit={ev => this.addTodo(ev)}>
          <input
            className="input-text"
            placeholder="Add TODO"
            type="text"
            name="added_todo"
            value={todoToAdd}
            onChange={ev => this.changedInput(ev)}
          />

          <Select
            toSelect={this.selectUser}
            selected={selectedUser}
            users={usersNames}
          />
          <input
            className="btn"
            type="submit"
            name="but"
            value="ADD NEW TODO"
          />
        </form>
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
