import React from 'react';
import TodoInput from '../TodoInput/TodoInput';
import TodoNameBox from '../TodoNameBox/TodoNameBox';
import TodoButton from '../TodoButton/TodoButton';
import TodoList from '../TodoList/TodoList';
import { UsersListShape } from '../Shapes/UsersListShape';
import { TodosListShape } from '../Shapes/TodosListShape';
import './NewTodo.css';

class NewTodo extends React.Component {
  state = {
    task: '',
    dynamicList: [],
    userId: '',
    name: '',
  }

  handleTaskChange = (event) => {
    this.setState({
      task: event.target.value,
    });
  }

  handleNameChange = (event) => {
    this.setState({
      userId: event.target.value,
      name: this.props.usersList
        .find(user => user.id === Number(event.target.value)).name,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState(prevState => ({
      dynamicList: [...prevState.dynamicList, {
        task: prevState.task,
        userId: prevState.userId,
        name: prevState.name,
      }],
      userId: '',
      task: '',
    }));
  }

  render() {
    const { todosList } = this.props;
    const { usersList } = this.props;
    const { dynamicList } = this.state;
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
        <TodoList dynamicList={dynamicList} todosList={todosList} />
      </div>
    );
  }
}

NewTodo.propTypes = {
  usersList: UsersListShape.isRequired,
  todosList: TodosListShape.isRequired,
};

export default NewTodo;
