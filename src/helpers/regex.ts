export const engUkrSpacesOnly = (text: string): string =>
  text.replace(/[^A-Za-z0-9А-Яа-яіІєЄїЇґҐ\s]/g, '');
