import React, { Component } from 'react';
import PropTypes from 'prop-types';
import users from '../api/users';

class Input extends Component {
  constructor(props) {
    super(props);
    this.submitted = this.submitted.bind(this);
    this.submittedParent = this.props.onSubmit;
    this.state = {
      input: '',
      select: '0',
      inputError: false,
      selectError: false,
    };
    this.changedTitle = this.changedTitle.bind(this);
    this.changedSelect = this.changedSelect.bind(this);
    this.submitted = this.submitted.bind(this);
    this.clickedSelect = this.clickedSelect.bind(this);
  }

  submitted(event) {
    event.preventDefault();
    const inputBol = this.state.input.trim() === '';
    const selectBol = this.state.select === '0';

    if (inputBol) {
      this.setState({ inputError: true });
    }

    if (selectBol) {
      this.setState({ selectError: true });
    }

    if (inputBol || selectBol) {
      return;
    }

    const userToParent = users.find(user => (
      user.id === +this.state.select
    ));

    this.submittedParent(this.state.input, userToParent);
    this.setState({ input: '', select: '0' });
  }

  changedTitle(action) {
    this.setState({ input: action.target.value, inputError: false });
  }

  changedSelect(action) {
    this.setState({ select: action.target.value, selectError: false });
  }

  clickedSelect() {
    this.setState({ selectError: false });
  }

  render() {
    const {
      input: valueInput, select: valueSelect,
      inputError, selectError,
    } = this.state;
    let spanInput;
    let spanSelect;
    let classForInput = '';
    let classForSelect = '';

    if (inputError === true) {
      spanInput = <span className="error">Please, type the title</span>;
      classForInput += 'error-box';
    }

    if (selectError === true) {
      spanSelect = <span className="error">Please, select the user</span>;
      classForSelect += 'error-box';
    }

    return (
      <form onSubmit={this.submitted}>
        <input
          type="text"
          className={classForInput}
          onChange={this.changedTitle}
          value={valueInput}
        />
        { spanInput }
        <select
          onChange={this.changedSelect}
          value={valueSelect}
          className={classForSelect}
          onClick={this.clickedSelect}
        >
          <option key="0" value="0">Choose user</option>
          {
            users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))
          }
        </select>
        { spanSelect }
        <button type="submit" onClick={this.submitted}>Ты кнопка!!</button>
      </form>
    );
  }
}

Input.propTypes = {
  onSubmit: PropTypes.instanceOf(Function).isRequired,
};

export default Input;
