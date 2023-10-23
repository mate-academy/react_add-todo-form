// import React, { useState } from react;
// import cn from "classnames";


// export const TodoForm: React.FC = () => {
//   const [hasError, setHasError] = useState(false);

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     if (!task) {
//       setHasError(true);

//       return;
//     }

//     const newToDo: UsersToDos = {
//       id:
//       title,
//       completed: boolean,
//       userId: getUserById(userId),
//     }
//   }

//   return (
//     <form action="/api/todos" method="POST">
//         <div className="field">
//           <input type="text" data-cy="titleInput" />
//           <span className="error">Please enter a title</span>
//         </div>

//         <div className="field">
//           <select data-cy="userSelect">
//             <option value="0" disabled>Choose a user</option>
//           </select>

//           <span className="error">Please choose a user</span>
//         </div>

//         <button type="submit" data-cy="submitButton">
//           Add
//         </button>
//       </form>
//   )
// }
