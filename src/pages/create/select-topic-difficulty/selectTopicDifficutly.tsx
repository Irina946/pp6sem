// import { useState } from 'react';
// import styles from './SelectedDifficutly.module.css';
// import Button from '../../../components/button/button';

// interface SelectedTopicDifficutlyProps {
//   id: number
//   onChangeComplexity: (complexity: string) => void
// }

// export default function SelectedTopicDifficutly(props: SelectedTopicDifficutlyProps): JSX.Element {
//   const [selectedButtonId, setSelectedButtonId] = useState<number>(props.id);

//   const handleClick = (buttonId: number, complexity: string): void => {
//     setSelectedButtonId(buttonId);
//     props.onChangeComplexity(complexity);
//   };

//   return (
//     <div className={styles.buttons}>
//       <Button
//         title='Низкий'
//         active={selectedButtonId === (props.id + 0) ? 'active' : ''}
//         typeButton="empty"
//         click={() => { handleClick(props.id + 0, 'easy'); }}
//       />
//       <Button
//         title='Средний'
//         active={selectedButtonId === (props.id + 1) ? 'active' : ''}
//         typeButton="empty"
//         click={() => { handleClick(props.id + 1, 'medium'); }}
//       />
//       <Button
//         title='Высокий'
//         active={selectedButtonId === (props.id + 2) ? 'active' : ''}
//         typeButton="empty"
//         click={() => { handleClick(props.id + 2, 'hard'); }}
//       />
//     </div>
//   );
// }
