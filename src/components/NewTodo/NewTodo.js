import React from 'react';
import './NewTodo.css';

class NewTodo extends React.Component {
  state = {
    title: '',
    user: null,
    titleError: null,
    selectError: null,
  }

  handleInputChange = ({ target }) => {
    const { value } = target;

    this.setState({
      title: value,
      titleError: null,
    });
  };

  handleSelectChange = ({ target }) => {
    const { value } = target.value;

    this.setState({
      user: value,
      selectError: null,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, userSelect } = event.target;
    const { todos, users, addTodo } = this.props;

    if (
      !userSelect.value
      && title.value.length === 0
    ) {
      this.setState({
        selectError: 'You must choose a user',
        titleError: 'You must write todo',
      });
    } else if (!userSelect.value) {
      this.setState({
        selectError: 'You must choose a user',
      });
    } else if (title.value.length === 0) {
      this.setState({
        titleError: 'You must write todo',
      });
    } else {
      const newTodo = {
        title: title.value,
        completed: false,
        user: users[userSelect.value],
        id: todos.length + 1,
        userId: users[userSelect.value].id,
      };

      this.setState({
        title: '',
        user: '',
      });

      addTodo(newTodo);
    }
  };

  render() {
    const { users } = this.props;
    const {
      title,
      user,
      selectError,
      titleError,
    } = this.state;

    return (
      <form className="ui inverted form error" onSubmit={this.handleSubmit}>
        <div className="field">
          <labe>To-Do</labe>
          <input
            maxLength={30}
            type="text"
            name="title"
            placeholder="Write your title"
            onChange={this.handleInputChange}
            value={title}
          />
          {titleError && (
            <div className="ui error message input">
              <p>{titleError}</p>
            </div>
          )}
        </div>
        <div className="select-container">
          <select
            name="userSelect"
            id="userSelect"
            value={user}
            onChange={this.handleSelectChange}
            className="ui dropdown"
          >
            <option selected value="">
              Choose a user
            </option>
            {users.map((userSelected, i) => (
              <option value={i}>{userSelected.name}</option>
            ))}
          </select>
          {selectError && (
            <small className="ui error message select">{selectError}</small>
          )}
        </div>
        <button type="submit" className="positive ui button">
          Submit
        </button>
      </form>
    );
  }
}

export default NewTodo;
