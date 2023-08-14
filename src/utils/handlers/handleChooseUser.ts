export const handleChooseUser = (
  event: React.ChangeEvent<HTMLSelectElement>,
  setValue: React.Dispatch<React.SetStateAction<number>>,
) => {
  setValue(+event.target.value);
};
