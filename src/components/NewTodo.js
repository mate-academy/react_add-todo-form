import React from 'react';
import PropTypes from 'prop-types';

class NewTodo extends React.Component {
  state = {
    user: this.props.users,
    select: 1,
  }

  sortBySelectedLength = (event) => {
    const { value } = event.target;

    this.setState({
      select: value,
    });
  }

  render() {
    const todo = this.state.user;

    return (
      <form>
        <label>
          <select
            className="button select"
            value={this.state.select}
            onChange={this.sortBySelectedLength}
          >
            {todo.map(item => (
              <option value={item.name} key={item.id}>{item.name}</option>
            ))}
          </select>
        </label>
      </form>
    );
  }
}

NewTodo.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default NewTodo;
