import React from 'react';

class NewTodo extends React.Component {
  state = {
    userId: 0,
    errorsList: {},
  }

  handleFormSubmit = (event) => {
    const { addTodo, todos, users } = this.props;
    const errorsList = {};

    event.preventDefault();

    this.setState((prevState) => {
      if (!prevState.title) {
        errorsList.title = 'Error! Enter the Todo';
      }
      if (+prevState.userId === 0) {
        errorsList.user = 'Error! Select user first';
      }
      if (Object.keys(errorsList).length > 0) {
        return { errorsList };
      }

      addTodo({
        id: todos.length + 1,
        user: users.find(user => +user.id === +prevState.userId),
        title: prevState.title,
        completed: false,
      });
    });

    this.setState({
      title: '',
      userId: 0,
    });
  };

  handleTodoInput = (event) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
      errorsList: {
        title: '',
        user: '',
      },
    });
  };

  render() {
    const { users } = this.props;
    const { title, userId, errorsList } = this.state;

    return (
      <form onSubmit={this.handleFormSubmit}>
        <div className="addtodo__input">
          <span> Add new todo:{' '}</span>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              maxLength="50"
              onChange={this.handleTodoInput}
              placeholder=" Enter new Todo"
            />

          {errorsList.title && (
            <div className="error">
              {errorsList.title}
            </div>
          )}
        </div>
        <div className="addtodo__select">
          <span>Select a user:{' '}</span>
          <select
            name="userId"
            onChange={this.handleTodoInput}
            value={userId}
          >
            <option value={0}></option>

            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {errorsList.user && (
            <div className="error">
              {errorsList.user}
            </div>
          )}
        </div>

        <button type="submit">
          Add todo
        </button>
      </form>
    );
  }
}

export default NewTodo;
