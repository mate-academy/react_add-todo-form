import React from 'react';
import PropTypes from 'prop-types';
import colors from '../api/colors';

class AddGoodForm extends React.Component {
  state = {
    newGoodName: '',
    selectedColorId: 0,
    hasNameError: false,
    hasColorError: false,
  }

  handleNameChange = (event) => {
    this.setState({
      newGoodName: event.target.value,
      hasNameError: false,
    });
  }

  handleColorChange = (event) => {
    this.setState({
      selectedColorId: +event.target.value,
      hasColorError: false,
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { newGoodName, selectedColorId } = this.state;

    if (!newGoodName || !selectedColorId) {
      this.setState({
        hasNameError: !newGoodName,
        hasColorError: !selectedColorId,
      });

      return;
    }

    this.props.addGood(newGoodName, selectedColorId);

    this.setState({
      newGoodName: '',
      selectedColorId: 0,
    });
  }

  render() {
    const {
      newGoodName,
      selectedColorId,
      hasNameError,
      hasColorError,
    } = this.state;

    return (
      <form
        onSubmit={this.handleFormSubmit}
      >
        <div>
          <input
            type="text"
            value={newGoodName}
            onChange={this.handleNameChange}
          />
          {hasNameError && (
            <span className="error">Please enter value</span>
          )}
        </div>

        <div>
          <select
            value={selectedColorId}
            onChange={this.handleColorChange}
          >
            <option value="0">Choose a color</option>

            {colors.map(({ id, name }) => (
              <option
                key={id}
                value={id}
              >
                {name}
              </option>
            ))}
          </select>
          {hasColorError && (
            <span className="error">Please choose color</span>
          )}
        </div>

        <button type="submit">Add</button>
      </form>
    );
  }
}

AddGoodForm.propTypes = {
  addGood: PropTypes.func.isRequired,
};

export default AddGoodForm;
