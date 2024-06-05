import styles from './right.module.css';
import Button from '../../../components/button/button';
import { Link } from 'react-router-dom';

export const RightMain = (): JSX.Element => {
  return (
    <div className={styles.rightMain}>
      <div className={styles.outside}>
        <h2 className={styles.header}>
          Создавай
        </h2>
        <div className={styles.description}>
          Или&nbsp;же введите нужные параметры и&nbsp;наш сервис
          автоматически создаст подходящие вам тесты из&nbsp;уникальных задач
        </div>
        <Link to='/create'>
          <Button
            title="Создать"
            typeButton="arrowWhite"
            size="big" />
        </Link>
      </div>
    </div>
  );
};
