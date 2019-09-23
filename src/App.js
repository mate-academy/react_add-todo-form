import React from 'react';
import './App.css';
import users from './api/users';
import NewTodo from './components/NewTodo/NewTodo';
import TodoList from './components/TodoList/TodoList';
import todosWithUsers from './api/const/Data';

class App extends React.Component {
  state = {
    todosToRender: [...todosWithUsers],
    users: [...users],
  };

  addNewTodo = (userId, newTask) => {
    const user = this.state.users.find(person => (
      person.id === userId
    ));

    return this.setState(prevState => ({
      todosToRender: [...prevState.todosToRender,
        {
          userId,
          id: prevState.todosToRender.length + 1,
          title: newTask,
          completed: true,
          user,
        },
      ],
    }
    ));
  }

  render() {
    const { todosToRender } = this.state;

    return (
      <>
        <h1>
          Todos counter:
          {todosToRender.length}
        </h1>
        <NewTodo
          users={users}
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
