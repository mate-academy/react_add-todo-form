# React Add TODO Form

Implement the ability to add TODOs to the `TodoList` implemented in the **Static List of TODOs**
> Here is [the working example](https://mate-academy.github.io/react_add-todo-form/)

1. Create an `App` component storing the `todos` array and displaying it using the `TodoList`.
1. Create a form to add new TODOs:
  - there should be a text input for the `title` with `data-cy="titleInput"` attribute;
  - add a `<select>` with `data-cy="userSelect"` attribute showing all the given users;
  - add labels and placeholders where they are needed;
  - add a new todo to the list after clicking the `Add` button;
  - each TODO item must have the following fields:
     - `id`,
     - `title`,
     - `userId`,
     - completed (`false` by default),
     - and a user object containing: `id`, `name`, `username`, `email`
  - `id` is the largest `id` in the array + 1 (add `data-id={todo.id}` attribute to each `.TodoInfo`).
1. Add validation to the form:
  - add a default empty option `Choose a user` to the select;
  - before creating a todo, check if a `user` was selected; if not, show an error message next to the `select` (`Please choose a user`);
  - if the `title` is empty, show an error message next to the `title` field (`Please enter a title`);
  - errors should appear only after clicking the `Add` button;
  - hide the message immediately after any change of the field with an error;
1. If the form is valid, add a todo to the list and clear the form.
1. (* **Optional**) Allow entering only letters (`ua` and `en`), digits, and `spaces` in the `title` field. Just remove any other characters from the `title`.

## Instructions
- Install Prettier Extention and use this [VSCode settings](https://mate-academy.github.io/fe-program/tools/vscode/settings.json) to enable format on save.
- Implement a solution following the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline).
- Use the [React TypeScript cheat sheet](https://mate-academy.github.io/fe-program/js/extra/react-typescript).
- Open one more terminal and run tests with `npm test` to ensure your solution is correct.
- Replace `<your_account>` with your Github username in the [DEMO LINK](https://OlhaLishenko.github.io/react_add-todo-form/) and add it to the PR description.
