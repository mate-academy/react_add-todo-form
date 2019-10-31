import React, { Component } from 'react';
import TodoItems from './TodoItems';
import './TodoList.css';
import users from '../api/users';

const INVALID_USER = 'invalid';
const EMPTY_FIELD = 'empty';

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      taskError: null,
    };

    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  addItem(event) {
    if (this.inputElement.value !== '') {
      const newItem = {
        text: this.inputElement.value,
        key: Date.now(),
      };

      this.setState(prevState => ({
        items: prevState.items.concat(newItem),
        taskError: null,
      }));
    } else if (this.inputElement.value === '') {
      this.setState({
        taskError: EMPTY_FIELD,
      });
    }

    this.inputElement.value = '';

    event.preventDefault();
  }

  deleteItem(key) {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const filteredItems = this.state.items.filter(item => item.key !== key);

    this.setState({
      items: filteredItems,
    });
  }

  render() {
    const { taskError } = this.state;
    const errorText = {
      [EMPTY_FIELD]: 'New task field is empty',
      [INVALID_USER]: 'Please choose a user',
    };

    return (
      <div className="todoListMain">
        <div className="header">
          <form onSubmit={this.addItem}>
            <p>
              {/* eslint-disable-next-line  */}
              <label htmlFor="new-task">Add Item</label>
              <input
                id="new-task"
                type="text"
                // eslint-disable-next-line no-return-assign
                ref={a => this.inputElement = a}
                placeholder="Add a new task..."
              />
              <button type="submit">Add</button>
            </p>
            <p>
              {/* eslint-disable-next-line  */}
              <label htmlFor="new-task">Select User</label>
              <select
                placeholder="Choose a user"
                onChange={this.selectChanged}
                value={this.selectName}
              >
                <option value="" disabled selected>Choose a user</option>
                {users.map(item => (
                  <option
                    key={item.id}
                    value={item.name}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </p>
            <h3>Todo</h3>
            {taskError && <span className="error">{errorText[taskError]}</span>}
          </form>
        </div>
        <TodoItems
          entries={this.state.items}
          delete={this.deleteItem}
        />
      </div>
    );
  }
}

export default TodoList;
