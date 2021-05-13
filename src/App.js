import React from 'react';
import './App.css';
import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList';

class App extends React.Component {
  state = {
    todoList: todos.map(todo => (
      {
        ...todo,
        user: users.find(user => todo.userId === user.id),
      }
    )),
    title: '',
    userId: '',
    titleValid: true,
    userIdValid: true,
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });

    switch (name) {
      case 'title':
        this.setState({
          titleValid: true,
        });
        break;
      case 'userId':
        this.setState({
          userIdValid: true,
        });
        break;
      default:
        break;
    }
  }

  addTodo = (userId, title) => {
    this.setState({
      titleValid: /^\w+$/.test(title),
      userIdValid: userId,
    });

    if (this.state.title !== '' && this.state.userId !== ''
    && /^\w+$/.test(title)) {
      this.setState(state => ({
        todoList: [
          ...state.todoList,
          {
            title: state.title,
            id: state.todoList.length + 1,
            user: users.find(user => user.id === parseFloat(userId)),
            userId: parseFloat(state.userId),
            completed: false,
          },
        ],
        title: '',
        userId: '',
      }));
    }
  }

  render() {
    const { title, userId, titleValid, userIdValid, todoList } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            this.addTodo(userId, title);
          }}
        >
          <label>
            Todo title:
            <textarea
              name="title"
              placeholder="Todo title"
              value={title}
              onChange={this.handleChange}
            />
            {!titleValid
            && <span>Please, enter the title</span>
            }
          </label>
          <label>
            Todo user:
            <select
              name="userId"
              value={userId}
              onChange={this.handleChange}
            >
              <option value="">Choose user</option>
              {users.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {!userIdValid
            && <span>Please, choose user</span>
            }
          </label>
          <button
            type="submit"
          >
            Add todo
          </button>
        </form>

        <TodoList preparedTodos={todoList} />
      </div>
    );
  }
}

export default App;
