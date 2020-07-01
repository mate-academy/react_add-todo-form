import React from 'react';
import { TodoShape } from '../../Shapes';
import './NewTodo.css';

export class NewTodo extends React.Component {
  state = {
    title: '',
    selectedUserId: 0,
    errorInput: false,
    errorSelect: false,
  }

  setTodoTitle = (value) => {
    this.setState({
      title: value.replace(/\s/, ' '),
      errorInput: false,
    });
  }

  setSelectUser = (value) => {
    this.setState({
      selectedUserId: Number(value),
      errorSelect: false,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { title, selectedUserId } = this.state;
    const { createTodo, users, allTodos } = this.props;

    if (!title) {
      this.setState({
        errorInput: true,
      });

      return false;
    }

    if (selectedUserId === 0) {
      this.setState({
        errorSelect: true,
      });

      return false;
    }

    this.setState(prevState => ({
      maxId: prevState.maxId + 1,
    }));

    createTodo({
      id: allTodos.length + 1,
      user: users.find(user => user.id === selectedUserId),
      title,
    });

    this.setState({
      title: '',
      selectedUserId: 0,
    });

    return true;
  }

  render() {
    const { selectedUserId, title, errorInput, errorSelect } = this.state;
    const { users } = this.props;

    return (
      <form className="form" onSubmit={this.handleSubmit}>
        {
          errorInput && (
            <div className="form__error">
              Please add todo description
            </div>
          )
        }
        <input
          type="text"
          name="todo"
          className="form__item form__input"
          placeholder="Write what do you need..."
          maxLength="100"
          onChange={e => this.setTodoTitle(e.target.value)}
          value={title}
        />
        {
          errorSelect && (
            <div className="form__error">
              Please chose a user
            </div>
          )
        }
        <select
          className="form__item"
          onChange={e => this.setSelectUser(e.target.value)}
          value={selectedUserId}
        >
          <option value={0}>Chose user</option>
          {users.map(user => (
            <option
              key={user.id}
              value={user.id}
              className="form__option"
            >
              {user.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="form__button form__item"
        >
          Add todo
        </button>
      </form>
    );
  }
}

NewTodo.propTypes = TodoShape.isRequired;
