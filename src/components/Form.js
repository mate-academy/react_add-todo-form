import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      errorTitle: false,
      errorSelect: false,
      selectValue: '0',
    };

    this.onTextChanged = this.onTextChanged.bind(this);
    this.onEnterClicked = this.onEnterClicked.bind(this);
    this.onChangeSelect = this.onChangeSelect.bind(this);
  }

  onTextChanged(event) {
    this.setState({
      text: event.target.value,
    });
    if (event.target.value.trim() !== '') {
      this.setState({
        errorTitle: false,
      });
    }
  }

  onEnterClicked(event) {
    event.preventDefault();
    if (this.state.text.trim() === '') {
      this.setState({
        errorTitle: true,
      });
    }

    if (this.state.selectValue === '0') {
      this.setState({
        errorSelect: true,
      });
    }

    if (this.state.text.trim() !== '' && this.state.selectValue !== '0') {
      this.props.onSubmitted({
        userId: +this.state.selectValue,
        title: this.state.text,
        completed: false,
      });
      this.setState({
        text: '',
        selectValue: '0',
      });
    }
  }

  onChangeSelect(event) {
    this.setState({
      selectValue: event.target.value,
    });
    if (event.target.value === '0') {
      this.setState({
        errorSelect: true,
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.onEnterClicked}>
        <input
          type="text"
          value={this.state.text}
          onChange={this.onTextChanged}
          placeholder="Add TODO..."
        />
        {
          this.state.errorTitle
            ? <span className="error">Please enter the title</span>
            : ''
        }
        <br />
        <select
          name="number"
          onChange={this.onChangeSelect}
          size="5"
          value={this.state.selectValue}
        >
          <option value="0">choose user</option>
          {
            this.props.users.map(
              element => <option value={element.id}>{element.name}</option>
            )
          }
        </select>
        {
          this.state.errorSelect
            ? <span className="error">Please choose a user</span>
            : ''
        }
        <br />
        <input type="submit" value="Add" />
      </form>
    );
  }
}

Form.propTypes = {
  onSubmitted: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
  })).isRequired,
};

export default Form;
