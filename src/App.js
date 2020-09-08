import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import { TodosList } from './components/TodosList';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    newTodo: preparedTodos,
    todo: '',
    id: 0,
    userError: false,
    titleError: false,
  }

 handleChange = (event) => {
   const { name, value } = event.target;

   this.setState({
     [name]: value.trim(),
     userError: false,
     titleError: false,
   });
 }

 handleSubmit = (event) => {
   const { todo, user } = this.state;

   event.preventDefault();

   if (user && todo) {
     this.setState(state => ({
       newTodo: [
         ...state.newTodo,
         {
           title: state.todo,
           id: state.newTodo.length + 1,
           user: users.find(usr => usr.name === state.user),
         },
       ],
     }));
   }

   if (!user) {
     this.setState({
       userError: true,
     });
   }

   if (!todo) {
     this.setState({
       titleError: true,
     });
   }

   this.setState(prevState => ({
     todo: '',
     id: prevState.id + 1,
   }));
 }

 render() {
   const { newTodo, todo, user, userError, titleError } = this.state;

   return (
     <div className="App">
       <h1>Add todo form</h1>

       <p>
         <span>Users: </span>
         {users.length}
       </p>

       <form onSubmit={this.handleSubmit}>
         {userError && <h3>Please choose a user</h3>}

         <select
           name="user"
           id=""
           value={user}
           onChange={this.handleChange}
         >

           {users.map(usr => (
             <option key={usr.id}>
               {usr.name}
             </option>
           ))}
         </select>

         {titleError && <h3>Please enter the message</h3>}

         <input
           type="text"
           name="todo"
           placeholder="Todo"
           value={todo}
           onChange={this.handleChange}
         />

         <button
           type="submit"
         >
           Add
         </button>
       </form>

       <TodosList todosArray={newTodo} />
     </div>
   );
 }
}

export default App;
