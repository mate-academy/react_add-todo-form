import React from 'react';
import './AddTodoForm.css';
import PropTypes from 'prop-types';

import users from '../../api/users';

export class AddTodoForm extends React.Component {
  state = {
    authors: users
      .concat({
        id: Math.random(),
        name: 'Choose an author',
      })
      .sort((author1, author2) => author1.id - author2.id),

    selectedAuthor: 'Choose an author',
    title: '',
    errors: {
      missingTitle: false,
      missingAuthor: false,
    },
  }

  handleChangeTitle = (event) => {
    this.setState({ title: event.target.value });
    this.changeErrorStatus('missingTitle', false);
  }

  handleSelectAuthor = ({ target }) => {
    this.setState({
      selectedAuthor: target.value,
    });
    this.changeErrorStatus('missingAuthor', false);
  }

  changeErrorStatus = (errorName, status) => {
    this.setState(state => ({
      errors: {
        ...state.errors,
        [errorName]: status,
      },
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, selectedAuthor } = this.state;
    const { addTodo } = this.props;

    this.changeErrorStatus('missingTitle', (!title));
    this.changeErrorStatus(
      'missingAuthor',
      (selectedAuthor === 'Choose an author'),
    );

    if (!title) {
      return;
    }

    if (selectedAuthor === 'Choose an author') {
      return;
    }

    addTodo(title, selectedAuthor);

    this.setState({
      selectedAuthor: 'Choose an author',
      title: '',
    });
  }

  render() {
    const { authors, selectedAuthor, errors } = this.state;

    return (
      <form
        className="AddTodoForm"
        onSubmit={this.handleSubmit}
      >
        <label htmlFor="title" className="AddTodoForm__title">
          Type your todo title
        </label>

        <input
          type="text"
          id="title"
          name="title"
          className="AddTodoForm__input"
          placeholder="Title"
          value={this.state.title}
          style={errors.missingTitle ? { border: '1px solid red' } : null}
          onChange={this.handleChangeTitle}
        />
        {
          errors.missingTitle && (
            <span className="AddTodoForm__error">
              Please type your todo title here
            </span>
          )
        }

        <select
          name="authors"
          style={errors.missingAuthor ? { border: '1px solid red' } : null}
          value={selectedAuthor}
          onChange={this.handleSelectAuthor}
          className="AddTodoForm__authorsSelect"
        >
          {authors.map(author => (
            <option
              key={author.id}
            >
              {author.name}
            </option>
          ))}
        </select>
        {
          errors.missingAuthor && (
            <span className="AddTodoForm__error">
              Please choose todo author here
            </span>
          )
        }

        <button type="submit" className="AddTodoForm__submitBtn">
          Add todo
        </button>
      </form>
    );
  }
}

AddTodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
