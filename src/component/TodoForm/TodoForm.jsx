import React from 'react';
import PropTypes from 'prop-types';
import './TodoForm.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

export class TodoForm extends React.Component {
  state = {
    human: '',
    title: '',
  }

  render() {
    const {
      usersList,
      handleChange,
    } = this.props;

    const {
      human,
      title,
    } = this.state;

    return (
      <form className="block-form">
        <textarea
          className="block-form__text"
          type="text"
          name="title"
          placeholder="Please, enter the text"
          value={title}
          onChange={({ target }) => {
            this.setState({
              title: target.value,
            });
          }}
        />
        <select
          className="block-form__list-person"
          name="person"
          value={human}
          onChange={({ target }) => {
            this.setState({
              human: target.value,
            });
          }}
        >
          <option
            value=""
            disabled
          >
            Please select a user
          </option>
          {usersList.map(person => (
            <option key={person.name}>
              {person.name}
            </option>
          ))}
        </select>
        <button
          className="btn btn-outline-info"
          type="button"
          onClick={() => {
            handleChange(human, title);
            this.setState({
              human: '',
              title: '',
            });
          }}
        >
          Add todo
        </button>
      </form>
    );
  }
}

TodoForm.propTypes = {
  usersList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })).isRequired,
  handleChange: PropTypes.func.isRequired,
};
