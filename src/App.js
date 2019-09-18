import React from 'react';
import './App.css';
import users from './api/users';
import FormControll from './api/components/FormControll/FormControll';
import TodoList from './api/components/TodoList/TodoList';
import todosWithUsers from './api/function/dataFromServer';

class App extends React.Component {
  state = {
    todosToRender: [...todosWithUsers],
    users: [...users],
  };

  addNewTodo = (userId, newTask) => {
    this.setState((prevState) => (
      {
        todosToRender: [
          ...prevState.todosToRender,
          {
            userId: userId,
            id: prevState.todosToRender.length + 1,
            title: newTask,
            completed: true,
            user: prevState.users.find(person => (
              person.id === userId
            )),
          },
        ],
      }
    ));
  }

  render() {
    const {
      todosToRender,
      users,
    } = this.state;

    return (
      <>
        <h1 className="page-title">
          {'Todos list consist from'
          + ' '
          + todosToRender.length
          + ' '
          + 'todo'
          }
        </h1>

        <FormControll
          users={users}
          todosToRender={todosToRender}
          addNewTodo={this.addNewTodo}
        />

        <TodoList
          todos={todosToRender}
        />

      </>
    );
  }
}

export default App;
