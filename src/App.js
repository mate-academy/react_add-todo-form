import React from 'react';
import './App.scss';
import classNames from 'classnames';
import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList/TodoList';

const preparedTodos = todos.map(
  todo => ({
    ...todo,
    user: users.find(human => (human.id === todo.userId)),
  }),
);

class App extends React.PureComponent {
  state = {
    todoList: [...preparedTodos],
    id: todos.length + 1,
    userId: '',
    title: '',
    completed: false,
    submitWasPressed: false,
  };

  onChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  createTodo = () => {
    const { userId, id, title, completed } = this.state;
    const user = users.find(human => (human.id === +userId));

    if (title !== '' && userId !== '') {
      this.state.todoList.push({
        userId: +userId,
        id,
        title,
        completed,
        user,
      });

      this.setState(state => ({
        id: state.id + 1,
        userId: '',
        title: '',
        submitWasPressed: false,
      }));
    } else {
      this.setState({ submitWasPressed: true });
    }
  }

  render() {
    const {
      userId,
      title,
      todoList,
      submitWasPressed,
    } = this.state;

    return (
      <div className="App">
        <form
          className="addTodoForm"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <h1
            className="addTodoForm__title"
          >
            Add todo card
          </h1>
          <input
            type="text"
            name="title"
            className="addTodoForm__title-input"
            placeholder="Enter todo title"
            value={title}
            onChange={this.onChange}
          />
          <span
            className={
                classNames(
                  (!title && submitWasPressed)
                    ? 'showError'
                    : 'hideError',
                )
              }
          >
            Please, enter the title.
          </span>
          <select
            name="userId"
            className="addTodoForm__select-user"
            value={userId}
            onChange={this.onChange}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          <span
            className={
                classNames(
                  (!userId && submitWasPressed)
                    ? 'showError'
                    : 'hideError',
                )
              }
          >
            Please, choose a user.
          </span>
          <button
            type="submit"
            className="addTodoForm__submit-button"
            onClick={this.createTodo}
          >
            Create new todo
          </button>
        </form>
        <TodoList preparedTodos={todoList} />
      </div>
    );
  }
}

export default App;
