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
    todo: '',
    id: preparedTodos.map(todo => todo.id).length + 1,
    userError: false,
    titleError: false,
  }

 handleChange = (event) => {
   const { name, value } = event.target;

   this.setState({
     [name]: value.trimLeft(),
     userError: false,
     titleError: false,
   });
 }

 handleSubmit = (event) => {
   const { todo, id, user } = this.state;

   event.preventDefault();

   if (user && todo) {
     preparedTodos.push({
       title: todo,
       id,
       user: users.find(usr => usr.name === this.state.user),
     });
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
   const { todo, user, userError, titleError } = this.state;

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

       <TodosList todosArray={preparedTodos} />
     </div>
   );
 }
}

export default App;
