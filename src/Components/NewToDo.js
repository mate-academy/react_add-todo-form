import React, { Component } from 'react';

class NewToDo extends Component {
  render() {
    const {
      users,
      selectUser,
      changeInput,
      value,
      valid,
      addItem,
    } = this.props;
    return (
      <div>
        <form onSubmit={addItem}>
          <input
            type="text"
            onChange={changeInput}
            value={value}
            disabled={!valid}
          />
          <button type="submit">ADD</button>
          <select className="form-control mb-3" onChange={selectUser}>
            <option value="0">Choose a user</option>
            { users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>))}
          </select>
        </form>
        <h1></h1>
      </div>
    );
  }
}

export default NewToDo;
