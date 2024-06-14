import { type SubtopicTheme } from './pages/create/selected-module/SelectedModule';

export function getSendTaskRequestModel(check: SubtopicTheme): string {
  const requestModel = check.subtopic
    .filter(element => element.isVisible)
    .map(element => ({
      uuid: element.id,
      count: +element.count,
      topic: element.nameTopic
    }));
  return JSON.stringify(requestModel);
}

export async function sendTask(data: SubtopicTheme): Promise<Response> {
  const response = await fetch('https://math-generator-jqum.onrender.com/get_tasks', {
    method: 'POST',
    body: getSendTaskRequestModel(data),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return await response.json();
}

export interface TasksScheme {
  topic: string
  task: string
  data: any
  answer: any
  moodle_task: string
  uuid: string
}

export type dictType = Record<string, number>;

export function getSendTasksXML(data: TasksScheme[]): string {
  const counts: dictType = {};
  data.forEach((element) => {
    if (counts[element.topic] !== undefined && !isNaN(counts[element.task])) {
      counts[element.topic] += 1;
    } else {
      counts[element.topic] = 1;
    }
  });
  const requestModel = data
    .map(element => (
      {
        topic: element.topic,
        moodle_task: element.moodle_task
      }
    ));
  const req = {
    tasks: requestModel,
    topics: counts
  };
  return JSON.stringify(req);
}

export async function getTasksXML(data: TasksScheme[]): Promise<Blob> {
  const response = await fetch('https://math-generator-jqum.onrender.com/get_convert', {
    method: 'POST',
    body: getSendTasksXML(data),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return await response.blob();
}

export async function sendImportTasks(data: string): Promise<Response> {
  const response = await fetch('https://math-generator-jqum.onrender.com/get_tasks', {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return await response.json();
}
