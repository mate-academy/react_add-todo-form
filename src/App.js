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
    todoToAdd: '',
    selectedUser: '0',
    todos: [...todosStart],
    isDisabled: true,
    userWasSelected: false,
    nameWasEntered: false,
    showErrorTodo: false,
  }

  selectUser = value => (this.setState(prevState => ({
    selectedUser: value,
    userWasSelected: true,
    isDisabled: !prevState.nameWasEntered,
  })))

  onSubmit = (ev) => {
    ev.preventDefault();

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
        selectedUser: '0',
        isDisabled: true,
      })));
  }

  changedInput = value => (this.setState(() => ({
    todoToAdd: value,
    showErrorTodo: false,
  })))

  onBlur = (value) => {
    if (value.length > 4) {
      return (this.setState(prevState => ({
        nameWasEntered: true,
        isDisabled: !prevState.userWasSelected,
      })));
    }

    return (this.setState(() => ({
      showErrorTodo: true,
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
    const {
      selectedUser, todos, todoToAdd, isDisabled,
      showErrorTodo, showErrorSelect,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form className="Form" onSubmit={ev => this.onSubmit(ev)}>
          <input
            className="input-text"
            placeholder="Add TODO"
            type="text"
            name="added_todo"
            value={todoToAdd}
            onChange={ev => this.changedInput(ev.target.value)}
            onBlur={ev => this.onBlur(ev.target.value)}
          />
          {
            (showErrorTodo)
              ? (
                <p className="Error">
                  Enter todo please, min length is 5 chars
                </p>
              )
              : <></>
          }

          <Select
            toSelect={this.selectUser}
            selected={selectedUser}
            users={usersNames}
          />
          {
            (showErrorSelect)
              ? <p className="Error">Choose the user please</p>
              : <></>
          }
          <input
            className="btn"
            type="submit"
            name="but"
            value="ADD NEW TODO"
            disabled={isDisabled}
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
