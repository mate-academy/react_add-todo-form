import React from 'react';
import './App.css';
import todos from './api/todos';
import users from './api/users';

class App extends React.Component {
  state = {
    todos: [...todos],
    usersForRender: [...users],
    userId: 0,
    title: '',
    isTitleErrorVisible: false,
    isUserErrorVisible: false,
  };

  render() {
    const { usersForRender, userId, title } = this.state;
    const todosForRender = this.state.todos
      .map(todo => ({
        ...todo,
        user: usersForRender
          .find(user => user.id === todo.userId),
      }));

    return (
      <div className="App">
        <h1 className="App__header">Add todo form</h1>
        <ul className="List">
          {todosForRender.map(todo => (
            <li
              className="List__item Item"
              key={todo.id}
            >
              <p className="Item__title">
                Task:
                {todo.title}
              </p>
              <p className="Item__status">
                Completed:
                {todo.completed ? 'Yes' : 'No'}
              </p>
              <p className="Item__contractor">
                User:
                {todo.user.name}
              </p>
            </li>
          ))}
        </ul>

        <form
          className="Form"
          onSubmit={((event) => {
            event.preventDefault();
            if (title.trimLeft() === '') {
              this.setState(state => ({
                isTitleErrorVisible: true,
              }));
            } else if (userId === 0) {
              this.setState(state => ({
                isUserErrorVisible: true,
              }));
            } else {
              this.setState(state => ({
                todos: [...state.todos, {
                  userName: state.userName,
                  userId: state.userId,
                  id: todosForRender.length + 1,
                  title: state.title,
                  completed: false,
                }],
                title: '',
                userId: 0,
              }));
            }
          })}
        >
          <label className="Form__input Form__input--title">
            Task:
            <input
              type="text"
              placeholder="Put title"
              value={title}
              onChange={((event) => {
                this.setState({
                  title: event.target.value,
                  isTitleErrorVisible: false,
                });
              })}
            />
          </label>
          <p
            className={
              `Form__Error-message
              Form__Error-message--title
              ${!this.state.isTitleErrorVisible && 'hidden'}`
            }
          >
            Please enter a task
          </p>
          <label className="Form__select Form__select--contractor">
            User:
            <select
              id="select-contractor"
              name="user"
              value={userId}
              onChange={((event) => {
                this.setState({
                  userId: +event.target.value,
                  isUserErrorVisible: false,
                });
              })}
            >
              <option value="">
                Сhoose a user
              </option>
              {usersForRender.map(user => (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          <p
            className={
              `Form__Error-message
              Form__Error-message--contractor
              ${!this.state.isUserErrorVisible && 'hidden'}`
            }
          >
            Please choose a user
          </p>
          <button className="Form__submit-button" type="submit">Add</button>
        </form>
        <p>
          <span>Users: </span>
          {users.length}
        </p>
      </div>
    );
  }
}

export default App;
