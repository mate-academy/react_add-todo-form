import * as React from 'react';

interface Props {
  todoList: PrepearedTodo[];
  users: User[];
  addTodo: (todo: PrepearedTodo) => void,
}

interface State {
  title: string,
  name: string,
  selectError: boolean,
  inputEntered: boolean,
}

export class TodoList extends React.Component<Props, State> {
  latestId = Math.max(...this.props.todoList.map((todo) => todo.id)) + 1;

  state = {
    title: '',
    name: '',
    selectError: false,
    inputEntered: true,
  };

  clearState = () => {
    this.setState({
      title: '',
      name: '',
      selectError: false,
      inputEntered: true,
    });
  };

  addTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (this.state.title.length > 0) {
      this.setState({
        inputEntered: true,
      });
    }

    const { value } = event.target;

    this.setState({
      title: value,
    });
  };

  addName = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    if (value !== '') {
      this.setState({
        selectError: false,
      });
    }

    this.setState({
      name: value,
    });
  };

  handleForm = (event: React.FormEvent) => {
    const { users } = this.props;
    const { name, title } = this.state;

    event.preventDefault();

    if (title.length === 0) {
      this.setState({ inputEntered: false });

      return;
    }

    if (name === '') {
      this.setState({ selectError: true });

      return;
    }

    const newTodo: PrepearedTodo = {
      id: this.latestId + 1,
      title,
      user: users.find(user => user.name === name) as User || null,
    };

    this.latestId += 1;

    this.props.addTodo(newTodo);
    this.clearState();
  };

  render() {
    const { todoList, users } = this.props;
    const { title, name } = this.state;

    return (
      <div className="containerForTodos">
        <form
          style={
            {
              display: 'flex',
              justifyContent: 'center',
            }
          }
          method="Post"
          onSubmit={this.handleForm}
        >
          <div className="inputContainer">
            <input
              type="text"
              name="title"
              placeholder="write a title"
              value={title}
              onChange={this.addTitle}
            />

            {!this.state.inputEntered && (
              <div className="Error">
                Please enter the title
              </div>
            )}
          </div>

          <div className="inputContainer">
            <select
              name="userTodo"
              value={name}
              onChange={this.addName}
            >
              <option value="">
                Choose a user
              </option>
              {users.map(user => {
                return (
                  <option
                    key={user.id}
                    value={user.name}
                  >
                    {user.name}
                  </option>
                );
              })}
            </select>

            {this.state.selectError && (
              <div className="Error">
                Please choose a user
              </div>
            )}
          </div>

          <button type="submit">Add</button>
        </form>

        {todoList.map(todo => {
          return (
            <div className="containerForTodos__todo todo" key={todo.id}>
              <div className="todo__item">{todo.user.name}</div>
              <div className="todo__item">{todo.user.email}</div>
              <div className="todo__item">{todo.title}</div>
              <div className="todo__item">{todo.completed || 'in progress'}</div>
            </div>
          );
        })}
      </div>
    );
  }
}
