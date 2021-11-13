import { all, put, takeLatest, takeEvery } from 'redux-saga/effects'
import * as Actions from './actions'
import * as actionTypes from './actionTypes'

const TASK_ENDPOINT = '/api/task'

function* createTask(action: ReturnType<typeof Actions.createTask>) {
  try {
    const { title } = action

    const taskCreated = yield fetch(TASK_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    } as any)
      .then((response) => response.json())
      .then((data) => data)
    yield put({ type: actionTypes.CREATE_TASK_SUCCESS, task: taskCreated })
  } catch (error) {
    yield put({
      type: actionTypes.CREATE_TASK_FAILED,
      error: 'Error creating tasks. Please try again.',
    })
  }
}

function* updateTask(action: ReturnType<typeof Actions.updateTask>) {
  try {
    const { id, taskBody } = action

    const taskUpdated = yield fetch(`${TASK_ENDPOINT}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskBody),
    } as any)
      .then((response) => response.json())
      .then((data) => data)
    yield put({ type: actionTypes.UPDATE_TASK_SUCCESS, task: taskUpdated })
  } catch (error) {
    yield put({
      type: actionTypes.UPDATE_TASK_FAILED,
      error: 'Error updating a task. Please try again.',
    })
  }
}

function* deleteTask(action: ReturnType<typeof Actions.deleteTask>) {
  try {
    const { id } = action

    const taskUpdated = yield fetch(`${TASK_ENDPOINT}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    } as any)
      .then((response) => response.json())
      .then((data) => data)
    yield put({ type: actionTypes.DELETE_TASK_SUCCESS, task: taskUpdated })
  } catch (error) {
    yield put({
      type: actionTypes.DELETE_TASK_FAILED,
      error: 'Error deleting a task. Please try again.',
    })
  }
}

function* getTasks() {
  try {
    const tasks = yield fetch(TASK_ENDPOINT)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        return data
      })
    yield put({ type: actionTypes.GET_TASKS_SUCCESS, tasks })
  } catch (error) {
    yield put({
      type: actionTypes.GET_TASKS_FAILED,
      error: 'Error fetching tasks. Please try again.',
    })
  }
}

export function* taskSaga() {
  yield all([
    takeEvery(actionTypes.CREATE_TASK, createTask),
    takeEvery(actionTypes.UPDATE_TASK, updateTask),
    takeEvery(actionTypes.DELETE_TASK, deleteTask),
    takeEvery(
      [
        actionTypes.GET_TASKS,
        actionTypes.CREATE_TASK_SUCCESS,
        actionTypes.UPDATE_TASK_SUCCESS,
        actionTypes.DELETE_TASK_SUCCESS,
      ],
      getTasks
    ),
  ])
}
