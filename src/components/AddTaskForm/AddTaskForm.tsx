import React, { ChangeEvent, FormEvent } from 'react';
import './AddTaskForm.scss';

type Props = {
  users:Users[];
  addNewTask: (taskName:string, selectedUser:string, userEmail:string)=> void;
};

type State = {
  users:Users[]
  taskText: string;
  selectedUser: string;
  taskTextErrorShow: boolean;
  userNameErrorShow: boolean;
  selectedUserEmail:string;
};

export class AddTaskForm extends React.PureComponent<Props, State> {
  state = {
    users: this.props.users,
    taskText: '',
    selectedUser: 'chose a user',
    taskTextErrorShow: false,
    userNameErrorShow: false,
    selectedUserEmail: 'No email',
  };

  handleFormSubmit = (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (this.state.taskText === '') {
      this.setState({
        taskTextErrorShow: true,
      });
    }

    if (this.state.selectedUser === 'chose a user') {
      this.setState({
        userNameErrorShow: true,
      });
    }

    if (this.state.selectedUser !== 'chose a user'
      && this.state.taskText !== '') {
      this.props.addNewTask(
        this.state.taskText,
        this.state.selectedUser,
        this.state.selectedUserEmail,
      );

      this.setState({
        taskText: '',
        selectedUser: 'chose a user',
      });
    }
  };

  changeInputText = (event:ChangeEvent<HTMLInputElement>) => {
    this.setState({
      taskText: (event.currentTarget.value),
      taskTextErrorShow: false,
    });
  };

  selectUser = (event:ChangeEvent<HTMLSelectElement>) => {
    this.setState((state) => {
      const userEmail = state.users.find(user => user.name
        === event.target.value);

      return {
        selectedUser: event.target.value,
        selectedUserEmail: userEmail ? userEmail.email : 'No email find',
        userNameErrorShow: false,
      };
    });
  };

  render() {
    return (
      <form
        className="AddTaskForm"
        onSubmit={(event) => this.handleFormSubmit(event)}
      >
        <div className="FormFieldsWrapper">
          <div>
            <input
              className="FormTextInput"
              type="text"
              maxLength={30}
              placeholder="Write new task name"
              onChange={this.changeInputText}
              value={this.state.taskText}
            />
            {this.state.taskTextErrorShow
              ? <p className="ErrorMessage">please write task name</p>
              : <p>30 characters max length</p>}
          </div>
          <div className="SelectWrapper">
            <select
              className="FormSelector"
              value={this.state.selectedUser}
              id="userSelect"
              onChange={
                (event:ChangeEvent<HTMLSelectElement>) => {
                  this.selectUser(event);
                }
              }
            >
              <option selected disabled value="chose a user">chose a user</option>
              {
                this.state.users.map(
                  user => (<option key={user.id} value={user.name}>{user.name}</option>),
                )
              }
            </select>
            {this.state.userNameErrorShow && <p className="ErrorMessage">please chose a user</p>}
          </div>
        </div>
        <button type="submit" className="AddButton">Add Task</button>
      </form>
    );
  }
}
