import React from 'react';
import './App.scss';
import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todosList: preparedTodos,
    newTodo: '',
    currentUser: '',
    validateTitle: false,
    validateUserSelect: false,
  }

  addTodo = () => {
    const {
      todosList,
      newTodo,
      currentUser,
    } = this.state;

    const newTodoItem = {
      ...todosList[0],
      userId: +currentUser,
      id: todosList.length + 1,
      title: newTodo,
      user: users.find(user => user.id === +currentUser),
    };

    this.validate();

    if (newTodo.length > 0 && currentUser.length > 0) {
      this.setState(state => ({
        newTodo: '',
        todosList: [
          ...state.todosList,
          newTodoItem,
        ],
      }));
    }
  }

  validate = () => {
    const { currentUser, newTodo } = this.state;

    this.setState({
      validateUserSelect: currentUser.length === 0,
      validateTitle: newTodo.length === 0,
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      validateTitle: false,
      validateUserSelect: false,
    });
  }

  render() {
    const { state, handleChange, addTodo } = this;
    const {
      todosList,
      newTodo,
      currentUser,
      validateUserSelect,
      validateTitle,
    } = state;

    return (
      <div className="app">
        <div className="wrapper">
          <div className="wrapper__bg" />
          <p className="title">
            { currentUser !== ''
              ? `Todo list of ${users[+currentUser - 1].name}`
              : 'Please choose a user'
            }
          </p>
          <div className="todo">
            { validateUserSelect
              && (
              <span className="todo__select-tooltip tooltip">
                Please choose a user
              </span>
              )
            }
            <div className="todo__select">

              <select
                className="todo__select-item"
                name="currentUser"
                value={currentUser}
                onChange={handleChange}
              >
                <option value="">Choose a user</option>
                {users.map((user) => {
                  const { id, name } = user;

                  return (
                    <option key={id} value={id}>{name}</option>
                  );
                })}
              </select>
            </div>

            <div className="todo__form form">
              <form
                className="form"
                onSubmit={(event) => {
                  event.preventDefault();
                  addTodo();
                }}
              >
                { validateTitle
                  && (
                  <span className="todo__form-tooltip tooltip">
                    Please enter the title
                  </span>
                  )
                }
                <input
                  className="form__input-search"
                  type="text"
                  name="newTodo"
                  autoComplete="off"
                  placeholder="Add new todo"
                  value={newTodo}
                  onChange={handleChange}
                />
                <button
                  className="form__button"
                  type="submit"
                >
                  Add
                </button>
              </form>
            </div>

            <TodoList listTodos={todosList} currentUser={currentUser} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
