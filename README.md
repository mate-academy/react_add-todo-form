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


1. Створіть компонент `App`, який зберігатиме масив `todos` та відображатиме його за допомогою `TodoList`.
1. Створіть форму для додавання нових TODO:
- має бути поле для введення тексту для `title` з атрибутом `data-cy="titleInput"`;
- додайте `<select>` з атрибутом `data-cy="userSelect"`, що відображає всіх заданих користувачів;
- додайте мітки та заповнювачі, де вони потрібні;
- додайте нове завдання до списку після натискання кнопки `Додати`;
- кожен елемент TODO повинен мати такі поля:
- `id`,
- `title`,
- `userId`,
- заповнено (`false` за замовчуванням),
- та об'єкт користувача, що містить: `id`, `name`, `username`, `email`
- `id` - це найбільший `id` у масиві + 1 (додайте атрибут `data-id={todo.id}` до кожного `.TodoInfo`).
1. Додайте перевірку до форми:
- додайте порожній варіант за замовчуванням `Виберіть користувача` до поля `select`;
- перед створенням завдання перевірте, чи було вибрано `користувача`; якщо ні, відобразіть повідомлення про помилку поруч із полем `select` (`Business choose a user`);
- якщо поле `title` порожнє, відобразіть повідомлення про помилку поруч із полем `title` (`Business enter a title`);
- помилки повинні з'являтися лише після натискання кнопки `Add`;
- приховуйте повідомлення одразу після будь-якої зміни поля з помилкою;
1. Якщо форма дійсна, додайте завдання до списку та очистіть форму.
1. (* **Необов'язково**) Дозволити введення лише літер (`ua` та `en`), цифр та `пробілів` у полі `title`. Просто видаліть будь-які інші символи з `title`.
## Instructions
- Install Prettier Extention and use this [VSCode settings](https://mate-academy.github.io/fe-program/tools/vscode/settings.json) to enable format on save.
- Implement a solution following the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline).
- Use the [React TypeScript cheat sheet](https://mate-academy.github.io/fe-program/js/extra/react-typescript).
- Open one more terminal and run tests with `npm test` to ensure your solution is correct.
- Replace `<your_account>` with your Github username in the [DEMO LINK](https://ElinaMrachkovska.github.io/react_add-todo-form/) and add it to the PR description.
