import React from 'react';
import TodoItem from './TodoItem';
import todos from './api/todos';
import users from './api/users';
import GetTodosWithUsers from './GetTodosWithUsers';

class TodoList extends React.Component {
  state = {
    copyTodos: [...todos],
    getTodos: GetTodosWithUsers(todos, users),
    todosId: todos.length,
    personId: 1,
    todoTitle: '',
    isDone: true,
    errorUserIsNotSelected: true,
    clickedEror: false,
  }

  personSelect = (e) => {
    if (e.target.value !== 'Choose a user') {
      const userId = users.find(user => user.name === e.target.value).id;

      this.setState({
        personId: userId,
        errorUserIsNotSelected: false,
        clickedEror: false,
      });
    } else {
      this.setState({ errorUserIsNotSelected: true });
    }
  }

  inputTitle = (e) => {
    this.setState({
      todoTitle: e.target.value,
      clickedEror: false,
    });
  }

  checkdone = (e) => {
    const bool = e.target.value === 'true';

    this.setState({ isDone: bool });
  }

  addToList = () => {
    if (!this.state.errorUserIsNotSelected && this.state.todoTitle) {
      const newDo = {};

      newDo.userId = this.state.personId;
      newDo.id = this.state.todosId + 1;
      newDo.title = this.state.todoTitle;
      newDo.completed = this.state.isDone;

      this.setState(state => ({
        todosId: state.todosId + 1,
        todoTitle: '',
        copyTodos: [...state.copyTodos, newDo],
      }));

      setTimeout(() => {
        this.setState(state => ({
          getTodos:
          GetTodosWithUsers(state.copyTodos, users),
        }));
      }, 50);
    } else {
      this.setState({ clickedEror: true });
    }
  }

  NewTodo = () => (
    <>
      <form className="form">
        <input
          type="text"
          name="title"
          placeholder="title"
          onChange={this.inputTitle}
          value={this.state.todoTitle}
        />
        <select onChange={this.personSelect}>
          <option>
          Choose a user
          </option>
          {
            users.map(user => (
              <option key={user.id}>
                {
                  user.name
                }
              </option>
            ))
          }
        </select>
        Is done:
        <select onChange={this.checkdone}>
          <option>true</option>
          <option>false</option>
        </select>
        <button type="button" onClick={this.addToList}>
        Add to the list
        </button>
      </form>
      {
        (this.state.errorUserIsNotSelected && this.state.clickedEror)
          ? (
            <p className="error">
          Please choose a user
            </p>
          )
          : <p />
      }
      {
        (!this.state.todoTitle && this.state.clickedEror)
          ? (
            <p className="error">
          Please enter the title
            </p>
          )
          : <p />
      }
    </>
  )

  render() {
    const { getTodos } = this.state;

    return (
      <>
        { this.NewTodo() }
        <table className="App">
          <thead>
            <tr className="head">
              <td>ID</td>
              <td>Title</td>
              <td>User name</td>
              <td>Status</td>
            </tr>
          </thead>
          <tbody>
            {getTodos.map(todo => (
              <TodoItem todo={todo} key={todo.id} />
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default TodoList;
