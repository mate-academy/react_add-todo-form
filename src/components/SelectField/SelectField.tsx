import classNames from 'classnames';
import users from '../../api/users';
import { capitalize } from '../../services/services';
import { FormField } from '../FormField';

interface Props {
  fieldName: string;
  value: number;
  label?: string;
  placeholder?: string;
  onChange?: (newValue: number) => void;
  hasError?: boolean;
  updateHasError?: (newState: boolean) => void;
}

export const SelectField: React.FC<Props> = ({
  fieldName,
  value,
  label = capitalize(fieldName),
  placeholder = `Choose a ${fieldName}`,
  onChange = () => {},
  hasError = false,
  updateHasError = () => {},
}) => (
  <FormField
    fieldName={fieldName}
    label={label}
    errorMessage={`Please choose a ${fieldName}`}
    hasError={hasError}
  >
    <div className="control has-icons-left">
      <div className={classNames('select', { 'is-danger': hasError })}>
        <select
          data-cy={`${fieldName}Select`}
          id={fieldName}
          value={value}
          onChange={event => {
            onChange(+event.target.value);
            updateHasError(false);
          }}
        >
          <option value="0">{placeholder}</option>
          {users.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <div className="icon is-left">
        <i className="fas fa-user"></i>
      </div>
    </div>
  </FormField>
);
