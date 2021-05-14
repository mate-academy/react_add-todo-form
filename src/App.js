import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/todosList';
import { AddTodoForm } from './components/AddTodoForm';

class App extends React.Component {
  state = {
    todoList: [...todos],
  }

  addTodo = addTodoForm => () => {
    if (addTodoForm.state.todoTitle === '') {
      addTodoForm.setState({ err: 'You can\'t create todo without title' });

      return;
    }

    if (addTodoForm.state.chosenUser === 0) {
      addTodoForm.setState({ err: 'Choose the user' });

      return;
    }

    this.setState(state => ({
      todoList: [{
        title: addTodoForm.state.todoTitle,
        id: state.todoList[state.todoList.length - 1].id + 1,
        userId: addTodoForm.state.chosenUser,
      }, ...state.todoList],
    }));
  };

  render() {
    return (
      <>
        <div className="App">
          <AddTodoForm addTodo={this.addTodo} />
          <TodoList
            todos={this.state.todoList}
            users={users}
          />
        </div>
      </>
    );
  }
}

export default App;
