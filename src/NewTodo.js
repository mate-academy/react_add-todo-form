import React from 'react';

class NewTodo extends React.PureComponent {
  state = {
    // eslint-disable-next-line react/no-unused-state,react/prop-types
    users: this.props.user,
  }

  render() {
    return (
      <>
        <form className="form__wrapper">
          <p className="form__header">Todo blank form</p>
          {/* eslint-disable-next-line max-len */}
          <input placeholder="Enter a new task" type="text" className="form__input" required />
          <select className="form__selection">
            {this.state.users.map((user, index) => (
              <option key={user.email}>{user.name}</option>
            ))}
          </select>
          <button type="submit" className="form__button">Add</button>
        </form>
      </>
    );
  }
}

export default NewTodo;
