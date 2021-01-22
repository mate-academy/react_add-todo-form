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
    inValidSelect: false,
    inValidLength: false,
    isTooLong: false,
    containsSymbols: false,
    containsWords: true,
  }

  changeInSelect(e) {
    this.setState({
      user: e.target.value,
      inValidSelect: false,
    });
  }

  formSubmit(e, user, todo, containsSymbols, isTooLong, containsWords) {
    e.preventDefault();
    if (user.length > 0 && todo.length > 0
      && !containsSymbols && !isTooLong && !containsWords) {
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

    if (e.target.value.replace(/ /g, '').replace(/[0-9]/g, '').length === 0) {
      this.setState({
        containsWords: false,
      });
    } else {
      this.setState({
        containsWords: true,
      });
    }

    this.setState({
      todo: e.target.value,
      inValidLength: false,
    });
  }

  clickOnButton(todo, user, listOfTodos, isTooLong,
    containsSymbols, containsWords) {
    if (user.length > 0 && todo.length > 0 && !isTooLong
      && !containsSymbols && containsWords) {
      const targetUser = listOfTodos.find(person => (
        person.name === user
      ));

      if (targetUser) {
        targetUser.todo.push({
          userId: targetUser.id,
          id: Math.floor(Math.random() * 100),
          title: todo,
          completed: false,
        });
      }

      this.forceUpdate();
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
      isTooLong, containsSymbols, containsWords } = this.state;

    return (
      <div className="App">
        <div>
          <h1>Add todo form</h1>
          <form
            className="form"
            method="POST"
            action="/api/userTodo"
            onSubmit={e => this.formSubmit(e, user, todo,
              containsSymbols, isTooLong, containsWords)}
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
            {!containsWords && <p>Please, enter the words</p>}
            <button
              type="submit"
              className="form__field"
              onClick={() => (
                this.clickOnButton(todo, user, listOfTodos,
                  isTooLong, containsSymbols, containsWords)
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
