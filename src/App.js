import React from 'react';
import './App.css';
import { ToDoList } from './components/ToDoList';

import users from './api/users';
import todos from './api/todos';

const prepearedTodos = users.map(user => ({
  ...user,
  todo: todos.filter(todo => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    listOfTodos: [...prepearedTodos],
    user: '',
    todo: '',
    todoId: 0,
    inValidSelect: false,
    inValidLength: false,
    isTooLong: false,
    containsSymbols: false,
  }

  changeInSelect(e) {
    this.setState({
      user: e.target.value,
      inValidSelect: false,
    });
  }

  formSubmit(e, user, todo, containsSymbols, isTooLong) {
    e.preventDefault();
    if (user.length > 0 && todo.length > 0 && !containsSymbols && !isTooLong) {
      this.setState({
        user: '',
        todo: '',
      });
    }
  }

  changeInput(e) {
    if (e.target.value.length > 10) {
      this.setState({
        isTooLong: true,
      });
    } else {
      this.setState({
        isTooLong: false,
      });
    }

    if (/[^\w\s]/.test(e.target.value)) {
      this.setState({
        containsSymbols: true,
      });
    } else {
      this.setState({
        containsSymbols: false,
      });
    }

    this.setState({
      todo: e.target.value,
      inValidLength: false,
    });
  }

  clickOnButton(todo, user, todoId, listOfTodos, isTooLong, containsSymbols) {
    if (user.length > 0 && todo.length > 0 && !isTooLong && !containsSymbols) {
      const targetUser = listOfTodos.find(person => (
        person.name === user
      ));

      if (targetUser) {
        targetUser.todo.push({
          userId: targetUser.id,
          id: todoId,
          title: todo,
          completed: false,
        });
      }

      this.forceUpdate();
      this.setState({
        todoId: Math.floor(Math.random() * 100),
      });
    }

    if (user.length === 0) {
      this.setState({
        inValidSelect: true,
      });
    }

    if (todo.length === 0) {
      this.setState({
        inValidLength: true,
      });
    }
  }

  render() {
    const { listOfTodos, user, todo, inValidSelect, inValidLength,
      isTooLong, containsSymbols, todoId } = this.state;

    return (
      <div className="App">
        <div>
          <h1>Add todo form</h1>
          <form
            className="form"
            method="POST"
            action="/api/userTodo"
            onSubmit={e => this.formSubmit(e, user, todo,
              containsSymbols, isTooLong)}
          >
            <select
              className="form__field"
              name="user"
              value={user}
              onChange={e => this.changeInSelect(e)}
            >
              <option>Choose a user</option>
              {listOfTodos.map(person => (
                <option
                  key={person.id}
                  value={person.name}
                >
                  {person.name}
                </option>
              ))}
            </select>
            {inValidSelect && <p>Please choose a user</p>}
            <label>
              <input
                className="form__field form__field--wide"
                name="todo"
                placeholder="Add something to do"
                value={todo}
                onChange={e => this.changeInput(e)}
              />
            </label>
            {inValidLength && <p>Please enter a Todo</p>}
            {isTooLong
              && <p>A Todo shouldn&apos;t be longer than 10 characters</p>}
            {containsSymbols
              && <p>A Todo should contain only latin characters or digits</p>}
            <button
              type="submit"
              className="form__field"
              onClick={() => (
                this.clickOnButton(todo, user, todoId, listOfTodos,
                  isTooLong, containsSymbols)
              )}
            >
              Add
            </button>
          </form>
        </div>
        <ToDoList listOfTodos={listOfTodos} />
      </div>
    );
  }
}

export default App;
