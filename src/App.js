import React from 'react';
import './App.css';
import PropTypes from 'prop-types';

class App extends React.Component {
  state = {
    colors: [
      {
        id: 1, name: 'red',
      },
      {
        id: 2, name: 'green',
      },
    ],
  }

  addColor = (colorName) => {
    const newColor = {
      id: +new Date(),
      name: colorName,
    };

    this.setState(prevState => ({
      colors: [...prevState.colors, newColor],
    }));
  }

  deleteColor = (colorId) => {
    this.setState(prevState => ({
      colors: prevState.colors.filter(color => (
        color.id !== colorId
      )),
    }));
  }

  renameColor = (colorId, newColorName) => {
    this.setState(prevState => ({
      colors: prevState.colors.map((color) => {
        if (colorId !== color.id) {
          return color;
        }

        return {
          ...color, name: newColorName,
        };
      }),
    }));
  }

  render() {
    const { colors } = this.state;

    return (
      <>
        <h1>Lifting state up</h1>
        <NewColorForm
          addColor={this.addColor}
        />
        <ColorsList
          colors={colors}
          deleteColor={this.deleteColor}
          renameColor={this.renameColor}
        />
      </>
    );
  }
}

class NewColorForm extends React.Component {
  state = {
    value: '',
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.addColor(this.state.value);

    this.setState({
      value: '',
    });
  }

  render() {
    const { value } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={this.handleChange}
        />

        <button type="submit">Add</button>
      </form>
    );
  }
}

NewColorForm.propTypes = {
  addColor: PropTypes.func.isRequired,
};

const ColorsList = ({ colors, deleteColor, renameColor }) => (
  <ul>
    {colors.map(color => (
      <li key={color.id}>
        {color.name}
        <input
          type="text"
          value={color.name}
          onChange={(event) => {
            renameColor(color.id, event.target.value);
          }}
        />

        <button
          type="button"
          onClick={() => deleteColor(color.id)}
        >
          X
        </button>
      </li>
    ))}
  </ul>
);

ColorsList.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteColor: PropTypes.func.isRequired,
  renameColor: PropTypes.func.isRequired,
};

export default App;
