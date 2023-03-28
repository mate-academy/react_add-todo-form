export interface User {
  id: number,
  name: string;
  username: string;
  email: string;
}

// export const App = () => {
//   const [goods, setGoods] = useState<Good[]>(goodsWithColor);
//   const [newGoodName, setNewGoodName] = useState('');
//   const [selectedColorId, setSelectedColorId] = useState(0);
//   const [hasNameError, setHasNameError] = useState(false);
//   const [hasColorError, setHasColorError] = useState(false);

//   const addNewGood = (name: string, colorId: number) => {
//     const newGood: Good = {
//       id: Date.now(),
//       name,
//       colorId,
//       color: getColorById(colorId),
//     };

//     setGoods((previousGoods) => [...previousGoods, newGood]);
//   };

//   const handleFormSubmit = (event: React.FormEvent) => {
//     event.preventDefault();

//     setHasNameError(!newGoodName);
//     setHasColorError(!selectedColorId);

//     if (newGoodName && selectedColorId) {
//       addNewGood(newGoodName, selectedColorId);
//     }
//   };

//   return (
//     <div className="App">
//       <form onSubmit={handleFormSubmit}>
//         <input
//           type="text"
//           value={newGoodName}
//           onChange={event => {
//             setNewGoodName(event.target.value);
//             setHasNameError(false);
//           }}
//           className={classNames({ 'with-error': hasNameError })}
//         />
//         {hasNameError && (
//           <span className="error">Name is required</span>
//         )}

//         <select
//           value={selectedColorId}
//           onChange={event => {
//             setSelectedColorId(Number(event.target.value));
//             setHasColorError(false);
//           }}
//           className={classNames({ 'with-error': hasColorError })}
//         >
//           <option value="0" disabled>Choose a color</option>
//           {colors.map((color) => (
//             <option key={color.id} value={color.id}>
//               {color.name}
//             </option>
//           ))}
//         </select>
//         {hasColorError && (
//           <span className="error">Color is required</span>
//         )}

//         <button type="submit">
//           Add
//         </button>
//       </form>
//     </div>
//   );
// };


