import React from 'react';
import './App.css';
import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList';
import { AddTaskForm } from './components/AddTaskForm';

type State = {
  users: Users[];
  todos: Todos[];
  preparedToDos: PreparedToDo[];
  todoMaxId:number;
};
type Props = {

};

class App extends React.Component<Props, State> {
  state:State = {
    users,
    todos,
    todoMaxId: Math.max(...todos.map(todo => todo.id)),
    preparedToDos: todos.map(
      todo => {
        const UserFromToDo = users.find(user => user.id === todo.userId);
        const preparedObj:PreparedToDo = {
          tittle: todo.title,
          status: todo.completed,
          id: todo.id,
          name: UserFromToDo !== undefined ? UserFromToDo.name : 'No user was assign',
          email: UserFromToDo !== undefined ? UserFromToDo.email : 'No email was assign',
        };

        return preparedObj;
      },
    ),
  };

  addNewTask = (taskName:string, selectedUser:string, userEmail:string) => {
    const newTask = {
      name: selectedUser,
      email: userEmail,
      tittle: taskName,
      status: false,
      id: this.state.todoMaxId + 1,
    };

    this.setState(
      state => ({
        todoMaxId: state.todoMaxId + 1,
      }),
    );

    this.setState(
      state => ({
        preparedToDos: [...state.preparedToDos, newTask],
      }),
    );
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <h2>
          Current count of tasks:
          {' '}
          <span className="Todo__CountNumber">
            {this.state.todos.length}
          </span>
        </h2>
        <p className="Todo__description">To add new task: 1)write task name 2)chose a user</p>
        <AddTaskForm users={this.state.users} addNewTask={this.addNewTask} />
        <TodoList preparedToDos={this.state.preparedToDos} />
      </div>
    );
  }
}

export default App;
