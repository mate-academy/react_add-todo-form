import React from 'react';

class NewTodo extends React.Component {
  state = {

  }

  // const ({ users, addNewTask }) = this.props;

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Enter a new todo"
        />
      </form>
    );
  }
}

export default NewTodo;
