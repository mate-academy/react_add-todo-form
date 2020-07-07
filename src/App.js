import React from 'react';
import './App.css';
import NewTodo from './components/NewTodo/NewTodo';
import TodoList from './components/TodoList/TodoList';
import users from './api/users';
import todos from './api/todos';

const usersList = users.map(user => ({
  id: user.id,
  name: user.name,
}));

const todosList = todos.map(todo => ({
  userId: todo.userId,
  task: todo.title,
  name: users.find(user => user.id === todo.userId).name,
}));

class App extends React.Component {
  state = {
    generalList: todosList,
  }

  handleUnify = (dynamicList) => {
    this.setState(prevState => ({
      generalList: [
        ...prevState.generalList,
        ...dynamicList,
      ],
    }));
  }

  render() {
    const { generalList } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <p>
          <span>Users: </span>
          {users.length}
        </p>
        <NewTodo
          usersList={usersList}
          todosList={todosList}
          handleUnify={this.handleUnify}
        />
        <TodoList generalList={generalList} />
      </div>
    );
  }
}

export default App;
