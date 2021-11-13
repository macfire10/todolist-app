import { Task } from '.prisma/client';
import * as actionTypes from './actionTypes';

export function getTasks() {
  return { type: actionTypes.GET_TASKS };
}

export function getTasksSuccess(tasks: Task[]) {
  return { type: actionTypes.GET_TASKS_SUCCESS, tasks };
}

export function createTask(title: string) {
  return { type: actionTypes.CREATE_TASK, title };
}

export function updateTask(id: string, taskBody: Partial<Task>) {
  return { type: actionTypes.UPDATE_TASK, id, taskBody };
}

export function deleteTask(id: string) {
  return { type: actionTypes.DELETE_TASK, id };
}