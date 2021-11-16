import React from "react";
import "./App.scss";
import { TodoList } from "./TodoList";
import users from "./api/users";
import todos from "./api/todos";
import { Todo } from "./types/types";

const preparedTodos = todos.map((todo) => ({
  ...todo,
  user: users.find((user) => user.id === todo.userId) || null,
}));

interface State {
  title: string;
  selectedUser: string;
  todoList: Todo[];
  invalidTitle: boolean;
  invalidPerson: boolean;
}

class App extends React.Component<{}, State> {
  state: State = {
    title: "",
    selectedUser: "",
    todoList: preparedTodos,
    invalidPerson: false,
    invalidTitle: false,
  };

  handleTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: event.target.value, invalidTitle: false });
  };

  handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ selectedUser: event.target.value, invalidPerson: false });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { title, selectedUser } = this.state;
    const index = users.findIndex((user) => user.name === selectedUser);

    if (title.length === 0 && !selectedUser) {
      this.setState({ invalidTitle: true, invalidPerson: true });
    } else if (title.length === 0) {
      this.setState({ invalidTitle: true });
    } else if (!selectedUser) {
      this.setState({ invalidPerson: true });
    } else {
      this.setState((state) => ({
        title: "",
        selectedUser: "",
        todoList: [
          ...state.todoList,
          {
            userId: users[index].id,
            id: state.todoList.length + 1,
            title: state.title,
          },
        ],
      }));
    }
  };

  render() {
    const { title, selectedUser, todoList, invalidPerson, invalidTitle } =
      this.state;

    return (
      <div className="App">
        <form action="/" className="App__form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={title}
            placeholder="Assign the task"
            onChange={this.handleTitleInput}
            className="App__title"
          />
          {invalidTitle && (
            <span className="App__error">Please enter the title</span>
          )}
          <select
            value={selectedUser}
            className="App__select"
            onChange={this.handleChange}
          >
            <option value="" disabled>
              Choose a person
            </option>
            {users.map((user) => {
              return (
                <option key={user.id} value={user.name}>
                  {user.name}
                </option>
              );
            })}
          </select>
          {invalidPerson && <span>Please choose a user</span>}
          <button type="submit" className="App__button">
            Add
          </button>
        </form>

        <TodoList todos={todoList} />
      </div>
    );
  }
}

export default App;
