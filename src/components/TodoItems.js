import React, { Component } from 'react';

class TodoItems extends Component {
  constructor(props) {
    super(props);

    this.createTasks = this.createTasks.bind(this);
  }

  // createTasks(item) {
  //   return (
  //     // eslint-disable-next-line no-noninteractive-element-interactions
  //     <li
  //       onClick={() => this.delete(item.key)}
  //       key={item.key}
  //     >
  //       {item.text}
  //     </li>
  //   );
  // }

  delete(key) {
    // eslint-disable-next-line react/prop-types
    this.props.delete(key);
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const todoEntries = this.props.entries;
    const listItems = todoEntries.map(this.createTasks);

    return (
      <ul className="theList">
        {listItems}
      </ul>
    );
  }
}

export default TodoItems;
