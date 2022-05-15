import React from 'react';
import './App.scss';
import { TodoList } from './Components/TodoList/TodoList';
import { Todo } from './Components/Types/Todo';
import users from './api/users';
import todosFromServer from './api/todos';

interface State {
  name: string,
  isCompleted: boolean,
  todos: Todo[],
  title: string,
  select: number,
  choosenTitle: boolean,
  choosenPerson: boolean,
}

class App extends React.Component<{}, State> {
  state = {
    name: '',
    isCompleted: false,
    todos: [...todosFromServer],
    title: '',
    select: 0,
    choosenTitle: true,
    choosenPerson: true,
  };

  clear = () => {
    this.setState({
      title: '',
      select: 0,
      choosenTitle: true,
      choosenPerson: true,
    });
  };

  catchErrors = () => {
    this.setState(state => {
      const { title, select } = state;

      return {
        choosenTitle: Boolean(title),
        choosenPerson: Boolean(select),
      };
    });
  };

  addTodo = (event: React.FormEvent) => {
    event.preventDefault();
    this.catchErrors();

    if (this.state.title && this.state.select) {
      this.setState(state => ({
        todos: [...state.todos, {
          userId: state.select,
          name: state.name,
          id: state.todos.length + 1,
          title: state.title,
          completed: state.isCompleted,
        }],
      }));

      this.clear();
    }
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, children } = event.target;

    const errorName = name === 'title' ? 'choosenTitle' : 'choosenPerson';
    const userName = children.length ? children[+value].innerHTML : '';

    this.setState(state => ({
      ...state,
      [name]: value,
      [errorName]: true,
      name: userName,
    }));
  };

  render() {
    return (
      <div className="App">
        <h1 className="App__header">Add todo form</h1>
        <form className="form" onSubmit={this.addTodo}>
          <div className="form__title">
            <input
              className="form__field"
              type="text"
              name="title"
              placeholder="Title"
              value={this.state.title}
              onChange={this.handleChange}
            />

            {!this.state.choosenTitle
            && (
              <p className="form__error">
                Input title
              </p>
            )}
          </div>

          <div className="form__user">
            <select
              className="form__field"
              name="select"
              value={this.state.select}
              onChange={this.handleChange}
            >
              <option
                value="0"
                disabled
              >
                User
              </option>
              {users.map(({ id, name }) => (
                <option value={id} key={id}>
                  {name}
                </option>
              ))}
            </select>

            {!this.state.choosenPerson
              && (
                <p className="form__error">
                  Choose a user
                </p>
              )}
          </div>

          <button
            className="form__add"
            type="submit"
          >
            ADD
          </button>
        </form>

        <span className="form__users">Users: </span>
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
