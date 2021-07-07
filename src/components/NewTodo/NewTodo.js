import React from 'react';
import PropTypes from 'prop-types';
import TodoInput from '../TodoInput/TodoInput';
import TodoNameBox from '../TodoNameBox/TodoNameBox';
import TodoButton from '../TodoButton/TodoButton';
import { UsersListShape } from '../Shapes/UsersListShape';
import './NewTodo.css';

class NewTodo extends React.Component {
  state = {
    task: '',
    dynamicList: [],
    userId: '',
  }

  handleTaskChange = (event) => {
    this.setState({
      task: event.target.value,
    });
  }

  handleNameChange = (event) => {
    this.setState({
      userId: event.target.value,
    });
  }

  handleAddList = () => {
    this.setState(prevState => ({
      dynamicList: [{
        task: prevState.task,
        userId: Number(prevState.userId),
        name: this.props.usersList
          .find(user => user.id === Number(prevState.userId)).name,
      }],
      userId: '',
      task: '',
    }), () => this.props.handleUnify(this.state.dynamicList));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.handleAddList();
  }

  render() {
    const { usersList } = this.props;
    const { userId } = this.state;
    const { task } = this.state;

    return (
      <div className="App__container">
        <form onSubmit={this.handleSubmit} className="App__form">
          <TodoInput handleTaskChange={this.handleTaskChange} task={task} />
          <TodoNameBox
            usersList={usersList}
            userId={userId}
            handleNameChange={this.handleNameChange}
          />
          <TodoButton />
        </form>
      </div>
    );
  }
}

NewTodo.propTypes = {
  usersList: PropTypes.arrayOf(UsersListShape).isRequired,
  handleUnify: PropTypes.func.isRequired,
};

export default NewTodo;
