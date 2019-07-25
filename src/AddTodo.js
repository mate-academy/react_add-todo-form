import React from 'react';

import './addTodo.css';

class AddTodo extends React.Component {
  state = {
    errorsList: {
    },
  }

  handleFormSubmit = (event) => {
    const { addTodo, todos, users } = this.props;
    const errorsList = {};

    event.preventDefault();

    this.setState((prevState) => {
      switch (true) {
        case (!prevState.title):
          errorsList.title = 'Enter the Todo';

        case (+prevState.userId === 0):
          errorsList.user = 'Select user first';

        case (Object.keys(errorsList).length > 0):
          return { errorsList };
      }

      addTodo({
        id: todos.length +1,
        user: users.find(user => user.id === +prevState.userId),
        title: prevState.title,
        completed: false,
      });
    });

    this.setState({
      title: '',
      userId: '',
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
      <form className="newTodo" onSubmit={this.handleFormSubmit}>
        <div>
        <span>Add new todo:&ensp;</span>
            <input
              className="newTodo__title"
              type="text"
              name="title"
              id="title"
              value={title}
              maxLength="50"
              onChange={this.handleTodoInput}
              placeholder=" Add new Todo"
            />

          {errorsList.title && (
            <div className="error">
              {errorsList.title}
            </div>
          )}
        </div>

        <div>
          <span>Select a user: &ensp;</span>
          <select
            name="userId"
            onChange={this.handleTodoInput}
            value={userId}
            className="newTodo__user"
          >
            <option value="0"></option>

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

        <button type="submit" className="add-button">
          Add todo
        </button>
      </form>
    );
  }
}

export default AddTodo;
