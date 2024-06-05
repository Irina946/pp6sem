import { useState } from 'react';
import styles from './settingsParameters.module.css';
import Button from '../../../components/button/button';
import { Link } from 'react-router-dom';
import { type SubtopicTheme } from '../selected-module/SelectedModule';
import { getSendTaskRequestModel, sendTask } from '../../../transport';

interface settingsParametersProps {
  selectedTheme: SubtopicTheme
}

export interface subtopicParmeters {
  nameTopic: string
  id: string
  isVisible: boolean
  count: number
}

export function SettingsParameters(props: settingsParametersProps): JSX.Element {
  const themes = props.selectedTheme;

  const [check, setCheck] = useState(themes);

  const handleChangeCount = (idx: number, count: number): void => {
    const checkChange = { ...check };
    if (count <= 1) {
      count = 1;
    }
    checkChange.subtopic[idx].count = Number(count);
    setCheck(checkChange);
  };

  const handleChangeTheme = (idx: number, theme: string): void => {
    const checkChange = { ...check };
    checkChange.subtopic[idx].nameTopic = theme;
    setCheck(checkChange);
  };

  const [generating, setGenetating] = useState(false);
  const [dataTasks, setDataTasks] = useState<Promise<Response>>();
  const [promiseResult, setPromiseResult] = useState<Response>();
  dataTasks?.then(result => {
    setPromiseResult(result);
  }).catch(error => {
    console.log(error);
  }
  );
  const handleButtonGeneratingClick = (): void => {
    setGenetating(true);
    setDataTasks(sendTask(check));
  };

  const handleButtonDownloadClick = (data: string): void => {
    const blob = new Blob([data], { type: 'application/json' });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'Запрос.json');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className={styles.settingsParameters}
    >
      {themes.subtopic.map(
        (parametersContainer: subtopicParmeters, idx: number) => (
          !parametersContainer.isVisible
            ? <div
              key={idx}
            >
            </div>
            : <div
              key={idx}
              className={styles.oneTheme}
              id={`${idx + 100}`}
            >
              {parametersContainer.nameTopic}
              <div className={styles.parameters}>
                Введите название темы
              </div>
              <input
                className={styles.nameThemeInput}
                type="string"
                value={parametersContainer.nameTopic}
                onChange={(e) => { handleChangeTheme(idx, e.target.value); }}
              />
              <div className={styles.parameters}>
                Введите количество задач
              </div>
              <input
                className={styles.countInput}
                type="number"
                value={parametersContainer.count}
                onChange={(e) => { handleChangeCount(idx, Number(e.target.value)); }}
              />
            </div>
        )
      )}
      <div className={styles.buttonContainer}>
        <div className={generating ? styles.hidden : ''}>
          <Button
            title='Начать генерацию'
            typeButton='orange'
            size='big'
            click={() => { handleButtonGeneratingClick(); }}
          />
        </div>
        <Link
          to='viewing'
          className={generating ? '' : styles.hidden}
          state={ promiseResult }
        >
        <Button
          title='Перейти к просмотру'
          typeButton='orange'
          size='big'
        />
      </Link>
      <Button
        size='big'
        title='Скачать файл'
        disabled={!generating}
        click={() => { handleButtonDownloadClick(getSendTaskRequestModel(check)); }}
      />
    </div>
    </div >
  );
}
