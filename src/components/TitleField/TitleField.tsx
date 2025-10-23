import { ChangeEvent, FC } from 'react';
import { FormErrors } from '../../types/formErrors';

interface Props {
  onTitleChange: (newTitle: string) => void;
  onErrorsChange: (payload: FormErrors) => void;
  title: string;
  errors: FormErrors;
}

export const TitleField: FC<Props> = ({
  onTitleChange,
  onErrorsChange,
  title,
  errors,
}) => {
  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    onTitleChange(event.target.value);
    onErrorsChange({ ...errors, title: '' });
  };

  return (
    <div className="field">
      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        data-cy="titleInput"
        value={title}
        onChange={handleChangeInput}
        placeholder="Enter title"
      />
      {errors.title && (
        <span className="error" data-cy="titleError">
          {errors.title}
        </span>
      )}
    </div>
  );
};
