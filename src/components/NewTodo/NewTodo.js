import React from "react";
import "./NewTodo.css";

export class NewTodo extends React.Component {
  state = {
    selected: null,
    title: '',
    errorTitle: null,
    errorUser: null,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    if (name === 'title') {
      this.setState({
        title: value,
        errorTitle: null,
      });
    } else if (name === 'username') {
      this.setState({
        selected: value,
        errorUser: null,
      });
    }
  };

  handleClick = (event) => {
    event.preventDefault();
    const { title, username } = event.target;
    const { users, todos, addTodo } = this.props;

    if (!username.value && title.value.length === 0) {
      this.setState({
        errorUser: 'You must choose a user',
        errorTitle: 'You must write todo',
      });
    } else if (!username.value) {
      this.setState({
        errorUser: 'You must choose a user',
      });
    } else if (title.value.length === 0) {
      this.setState({
        errorTitle: 'You must write todo',
      });
    } else {
      const newTodo = {
        title: title.value,
        user: users[username.value],
        completed: false,
        id: todos.length + 1,
        userId: users[username.value].id,
      };

      this.setState({
        title: '',
        selected: '',
      });

      addTodo(newTodo);
    }
  };

  render() {
    const { users } = this.props;
    const {
      title,
      selected,
      errorTitle,
      errorUser,
    } = this.state;

    return (
      <div className="main-form">
        <h2>Add new task</h2>
        <form onSubmit={this.handleClick} className="form">
          <div className="form-group">
            <input
              className="form-control"
              id="formGroupExampleInput"
              type="text"
              name="title"
              placeholder="Add your todo"
              onChange={this.handleChange}
              value={title}
              maxLength={30}
            />
            {errorTitle && <small className="font-italic">{errorTitle}</small>}
          </div>
          <div className="form-group">
            <select
              className="custom-select"
              name="username"
              id=""
              onChange={this.handleChange}
              value={selected}
            >
              <option selected disabled value="">
                Choose a user
              </option>
              {users.map((user, i) => (
                <option value={i}>{user.name}</option>
              ))}
            </select>
            {errorUser && <small className="font-italic">{errorUser}</small>}
          </div>
          <button type="submit" className="btn btn-dark">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
