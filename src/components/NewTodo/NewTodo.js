import React from 'react';
import PropTypes from 'prop-types';
import { Select } from '../Select/Select';
import './NewTodo.css';

export class NewTodo extends React.Component {
  state = {
    title: '',
    userId: 0,
    inputError: false,
    selectError: false,
  }

  inputHandler = (evt) => {
    const { target: { value } } = evt;

    this.setState({
      title: value.trim(),
      inputError: false,
    });
  }

  submitHandler = (evt) => {
    evt.preventDefault();
    const { title, userId } = this.state;

    if (!title.length) {
      this.setState({
        inputError: true,
      });
    }

    if (userId === 0) {
      this.setState({
        selectError: true,
      });
    }

    if (title.length > 0 && userId !== 0) {
      const { users } = this.props;
      const user = users.find(person => person.id === userId);

      this.props.addNewTodo({
        userId,
        title,
        user,
      });

      this.setState({
        title: '',
        userId: 0,
      });
    }
  }

  selectHandler = (evt) => {
    const { target: { value } } = evt;

    this.setState({
      userId: Number(value),
      selectError: false,
    });
  }

  render() {
    const { users } = this.props;
    const { title, userId, inputError, selectError } = this.state;

    const inputErrorClassName = (inputError)
      ? 'form__error--visible' : 'form__error';
    const selectErrorClassName = (selectError)
      ? 'form__error--visible' : 'form__error';

    return (
      <form className="form" onSubmit={this.submitHandler}>
        <p className="form__item">
          <label className="form__label">
            <input
              type="text"
              onChange={this.inputHandler}
              className="form__input"
              value={title}
              placeholder="Write down todo"
            />
          </label>
          <span className={inputErrorClassName}>
            Please, write down your todo
          </span>
        </p>

        <p className="form__item">
          <Select users={users} value={userId} onChange={this.selectHandler} />
          <span className={selectErrorClassName}>
            Please, select user
          </span>
        </p>
        <button className="form__button" type="submit">Add</button>
      </form>
    );
  }
}

NewTodo.propTypes = {
  addNewTodo: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ).isRequired,
};
