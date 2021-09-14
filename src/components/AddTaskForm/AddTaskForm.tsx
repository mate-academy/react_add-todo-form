import React from 'react';
import './AddTaskForm.scss';

type Props = {
  users:Users[];
};

type State = {

};

export class AddTaskForm extends React.PureComponent<Props, State> {
  users = this.props.users;

  addNewTask = () => {

  };

  render() {
    return (
      <form className="AddTaskForm" onSubmit={this.addNewTask}>
        <input type="text" placeholder="Write new task name" />
        <select name="" id="">
          {
            this.users.map(user => (<option value={user.name}>{user.name}</option>))
          }
        </select>
      </form>
    );
  }
}
