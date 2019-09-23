import React, { Component } from 'react';

import cx from 'classnames';
import './Form.css';
import FormField from '../FormField/FormField';

class Form extends Component {
  state = {
    title: {
      value: '',
      error: '',
    },
    selectedUser: {
      value:'',
      error:'',
    },
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState(prevState => ({
      [name]: { value, error: prevState[name].error },
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleAddTodo({
      title: this.state.title,
      selectedUser: this.state.selectedUser,
    });
    // event.target.title.value = '';
    // event.target.select.value = '0';
  }

 render () {
  const {users} = this.props;
  const {title, selectedUser} = this.state;
  const selectClass = cx('select', { 'error-message': !!selectedUser.error });

  return (
    <form onSubmit={this.handleSubmit}  action="" method="" className="new-todo">
      <FormField
        {...title}
        name="title"
        type="text"
        label="title"
        placeholder="Please type in"
        onChange={this.handleChange}
      />

        <select onChange={this.handleChange} name="selectedUser" className={selectClass}>
          <option value="0" selected disabled hidden>Select user</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
        {selectedUser.error && (<p className='error-message'>{selectedUser.error}</p>)}

      <button type="submit" className="submit">Ad TODO</button>
    </form>
  );
 }
}

Form.propTypes = {};
export default Form;
