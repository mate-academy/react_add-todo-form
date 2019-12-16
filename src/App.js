import React from 'react';
import './App.css';

import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

const todosArr = todosFromServer
  .map((todo) => {
    const user = usersFromServer.find(person => person.id === todo.userId);

    return {
      ...todo,
      user,
    };
  });

class App extends React.Component {
  state = {
    todos: [...todosArr],
  };

 addTodo = (title, userId) => {
   this.setState((state) => {
     const inputedTodo = {
       userId: +userId,
       user: usersFromServer.find(person => person.id === +userId),
       id: state.todos.length + 1,
       title,
       status: false,
     };

     return {
       todos: [...state.todos, inputedTodo],
     };
   });
 };

 render() {
   return (
     <div className="App">
       <h1>Static list of todos</h1>

       <NewTodo users={usersFromServer} addTodo={this.addTodo} />

       <TodoList todos={this.state.todos} />
     </div>
   );
 }
}

export default App;
