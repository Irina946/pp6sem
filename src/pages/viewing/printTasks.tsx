import {
  GenerateMatrix,
  PrintMultiplyNumMatrix,
  type PrintMultiplyNumMatrixProps,
  PrintSumMatrix,
  PrintTask,
  GenerateVector,
  PrintMultiplyMatrix,
  type dataMultiplyMatrixProps,
  PrintEquationsMatrixAXB,
  type dataEquationsMatrixAXB,
  type dataEquationsMatrixAXBC,
  PrintEquationsMatrixAXBC,
  type dataSLU,
  PrintSLU,
  PrintSumVectors,
  PrintEqVectors,
  type DataThirdVectors
} from './printModels';

export interface DataOneMatrix {
  first: number[][]
  second: number[][]
}

export interface DataOneVectors {
  A: number[]
  B: number[]
}

export interface DataMultiplyTwoMatrix {
  matrix1: number[]
  matrix2: number[]
}

interface ElementMatrix {
  column_index: number
  matrix: number[][]
  row_index: number
}

interface ElementMatrix3x3 {
  columnIndex: number
  matrix: number[][]
  rowIndex: number
}

interface DeterminantMatrix {
  determinant: number
  matrix: number[][]
}

export interface StateItem {
  topic: string
  task: string
  data: DataOneMatrix
  | PrintMultiplyNumMatrixProps
  | number[][]
  | ElementMatrix
  | dataMultiplyMatrixProps
  | DeterminantMatrix
  | ElementMatrix3x3
  | dataEquationsMatrixAXB
  | dataEquationsMatrixAXBC
  | dataSLU
  | DataOneVectors
  | DataThirdVectors
  answer: number[][] | number | number[]
  moodle_task: string
};

interface PrintAllTasksProps {
  exercise: StateItem
  num: number
}

// const getMaxDepth = (arr: any[]): number => {
//   return (
//     Array.isArray(arr)
//       ? 1 + Math.max(0, ...arr.map(getMaxDepth))
//       : 0
//   );
// };

export const PrintAllTasks = (props: PrintAllTasksProps): JSX.Element => {
  const { exercise, num } = props;
  if (exercise.topic === 'Сумма матриц' && 'first' in exercise.data && Array.isArray(exercise.answer)) {
    return <PrintTask
      number={num}
      condition={exercise.task}
      task={<PrintSumMatrix data={exercise.data} />}
      answer={<GenerateMatrix data={exercise.answer as number[][]} />}
    />;
  } else if (exercise.topic === 'Произведение матрицы 3х3 на число' && 'matrix' in exercise.data && 'number' in exercise.data && Array.isArray(exercise.answer)) {
    return <PrintTask
      number={num}
      condition={exercise.task}
      task={<PrintMultiplyNumMatrix matrix={exercise.data.matrix} number={exercise.data.number} />}
      answer={<GenerateMatrix data={exercise.answer as number[][]} />}
    />;
  } else if (exercise.topic === 'Размер матрицы' && Array.isArray(exercise.data) && Array.isArray(exercise.answer) && !exercise.answer.some(item => Array.isArray(item))) {
    return <PrintTask
      number={num}
      condition={exercise.task}
      task={<GenerateMatrix data={exercise.data} />}
      answer={<GenerateVector data={exercise.answer as number[]} />}
    />;
  } else if (exercise.topic === 'Элемент матрицы' && 'column_index' in exercise.data && typeof exercise.answer === 'number') {
    return <PrintTask
      number={num}
      condition={exercise.task}
      task={<GenerateMatrix data={exercise.data.matrix} />}
      answer={String(exercise.answer)}
    />;
  } else if (exercise.topic === 'Транспонирование' && Array.isArray(exercise.data) && Array.isArray(exercise.answer)) {
    return <PrintTask
      number={num}
      condition={exercise.task}
      task={<GenerateMatrix data={exercise.data} />}
      answer={<GenerateMatrix data={exercise.answer as number[][]} />}
    />;
  } else if (exercise.topic === 'Произведение двух матриц (3х3)' && 'matrix1' in exercise.data && Array.isArray(exercise.answer)) {
    return <PrintTask
      number={num}
      condition={exercise.task}
      task={<PrintMultiplyMatrix data={exercise.data} />}
      answer={<GenerateMatrix data={exercise.answer as number[][]} />}
    />;
  } else if (exercise.topic === 'Вычислить определитель (3х3)' && Array.isArray(exercise.data) && typeof exercise.answer === 'number') {
    return <PrintTask
      number={num}
      condition={exercise.task}
      task={<GenerateMatrix data={exercise.data} nameMatrix='A= ' />}
      answer={String(exercise.answer)}
    />;
  } else if (exercise.topic === 'Уравнение в определителе (3х3)' && 'determinant' in exercise.data && typeof exercise.answer === 'number') {
    return <PrintTask
      number={num}
      condition={exercise.task}
      task={<GenerateMatrix data={exercise.data.matrix} nameMatrix='A= ' />}
      answer={String(exercise.answer)}
    />;
  } else if (exercise.topic === 'Обратная матрица (3х3)' && Array.isArray(exercise.data) && Array.isArray(exercise.answer)) {
    return <PrintTask
      number={num}
      condition={exercise.task}
      task={<GenerateMatrix data={exercise.data} nameMatrix='A= ' />}
      answer={<GenerateMatrix data={exercise.answer as number[][]} />}
    />;
  } else if (exercise.topic === 'Элемент обратной матрицы (3х3)' && 'columnIndex' in exercise.data && typeof exercise.answer === 'number') {
    return <PrintTask
      number={num}
      condition={exercise.task}
      task={<GenerateMatrix data={exercise.data.matrix} />}
      answer={String(exercise.answer)}
    />;
  } else if (exercise.topic === 'Матричное уравнение (АХ=В, 3х3)' && 'A' in exercise.data && Array.isArray(exercise.answer)) {
    return <PrintTask
      number={num}
      condition={exercise.task}
      task={<PrintEquationsMatrixAXB data={exercise.data as dataEquationsMatrixAXB} />}
      answer={<GenerateMatrix data={exercise.answer as number[][]} />}
    />;
  } else if (exercise.topic === 'Матричное уравнение (АХВ=С, 3х3)' && 'C' in exercise.data && Array.isArray(exercise.answer)) {
    return <PrintTask
      number={num}
      condition={exercise.task}
      task={<PrintEquationsMatrixAXBC data={exercise.data as dataEquationsMatrixAXBC} />}
      answer={<GenerateMatrix data={exercise.answer as number[][]} />}
    />;
  } else if (exercise.topic === 'СЛУ 3х3' && 'first_equation' in exercise.data && Array.isArray(exercise.answer)) {
    return <PrintTask
      number={num}
      condition={exercise.task}
      task={<PrintSLU data={exercise.data} />}
      answer={<GenerateMatrix data={exercise.answer as number[][]} />}
    />;
  } else if (exercise.topic === 'Ранг матрицы (в пределах 3х3)' && Array.isArray(exercise.data) && typeof exercise.answer === 'number') {
    return <PrintTask
      number={num}
      condition={exercise.task}
      task={<GenerateMatrix data={exercise.data} />}
      answer={String(exercise.answer)}
    />;
  } else if (exercise.topic === 'Вычислить скалярное произведение векторов' && 'A' in exercise.data && typeof exercise.answer === 'number') {
    return <PrintTask
      number={num}
      condition={exercise.task.slice(0, 41)}
      task={<PrintSumVectors data={exercise.data as DataOneVectors} />}
      answer={String(exercise.answer)}
    />;
  } else if (exercise.topic === 'Вычислить векторное произведение векторов' && 'A' in exercise.data && Array.isArray(exercise.answer)) {
    return <PrintTask
      number={num}
      condition={exercise.task.slice(0, 41)}
      task={<PrintSumVectors data={exercise.data as DataOneVectors} />}
      answer={<GenerateVector data={exercise.answer as number[]} />}
    />;
  } else if (exercise.topic === 'Вычислить модуль векторного произведения' && 'A' in exercise.data && typeof exercise.answer === 'number') {
    return <PrintTask
      number={num}
      condition={exercise.task}
      task={<PrintSumVectors data={exercise.data as DataOneVectors} />}
      answer={String(exercise.answer)}
    />;
  } else if (exercise.topic === 'Вычислить смешанное произведение векторов' && 'C' in exercise.data && typeof exercise.answer === 'number') {
    return <PrintTask
      number={num}
      condition={exercise.task.slice(0, 41)}
      task={<PrintEqVectors data={exercise.data as DataThirdVectors} />}
      answer={String(exercise.answer)}
    />;
  } else if (exercise.topic === 'Проверка коллинеарности векторов' && 'A' in exercise.data && typeof exercise.answer === 'string') {
    return <PrintTask
      number={num}
      condition={exercise.task}
      task={<PrintSumVectors data={exercise.data as DataOneVectors} />}
      answer={exercise.answer}
    />;
  } else if (exercise.topic === 'Проверка компланарности векторов' && 'C' in exercise.data && typeof exercise.answer === 'string') {
    return <PrintTask
      number={num}
      condition={exercise.task}
      task={<PrintEqVectors data={exercise.data as DataThirdVectors} />}
      answer={exercise.answer}
    />;
  } else if ((exercise.topic === 'Составить ур-е прямой через две точки' ||
    exercise.topic === 'Составить ур-е прямой параллельной данной' ||
    exercise.topic === 'Составить ур-е прямой параллельной BC' ||
    exercise.topic === 'Найти точку пересечения прямых AB и CD' ||
    exercise.topic === 'Определить расстояние от точки до прямой' ||
    exercise.topic === 'Составить ур-е плоскости по 3м точкам (определитель)' ||
    exercise.topic === 'Составить ур-е плоскости по нормали и точке' ||
    exercise.topic === 'Составить ур-е параллельной плоскости (нормаль и точка)' ||
    exercise.topic === 'Составить ур-е плоскости (2 точки) перпендикулярной данной (точка и нормаль)' ||
    exercise.topic === 'Проекция точки на прямую NM' ||
    exercise.topic === 'Проекция точки на плоскость (точка и нормаль)') &&
    typeof exercise.answer === 'string') {
    return <PrintTask
      number={num}
      condition={exercise.task}
      answer={exercise.answer}
    />;
  } else {
    return <>Невозможно отобразить</>;
  }
};
