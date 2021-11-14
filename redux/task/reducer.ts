import * as actionTypes from './actionTypes'

export default function subscriberReducer(
  state = { isLoading: false },
  action = null
) {
  switch (action.type) {
    case actionTypes.CREATE_TASK:
      return { ...state, createTaskLoading: true }
    case actionTypes.CREATE_TASK_SUCCESS:
      return { ...state, createTaskLoading: false, createdTask: action.task }
    case actionTypes.CREATE_TASK_FAILED:
      return { ...state, createTaskLoading: false, error: action.error }
    case actionTypes.UPDATE_TASK:
      return { ...state, updateTaskLoading: true }
    case actionTypes.UPDATE_TASK_SUCCESS:
      return { ...state, updateTaskLoading: false, updatedTask: action.task }
    case actionTypes.UPDATE_TASK_FAILED:
      return { ...state, updateTaskLoading: false, error: action.error }
    case actionTypes.DELETE_TASK:
      return { ...state, deleteTaskLoading: true }
    case actionTypes.DELETE_TASK_SUCCESS:
      return { ...state, deleteTaskLoading: false, deletedTask: action.task }
    case actionTypes.DELETE_TASK_FAILED:
      return { ...state, deleteTaskLoading: false, error: action.error }
    case actionTypes.GET_TASKS:
      return { ...state, isLoading: true }
    case actionTypes.GET_TASKS_SUCCESS:
      return { ...state, isLoading: false, tasks: action.tasks }
    case actionTypes.GET_TASKS_FAILED:
      return { ...state, isLoading: false, error: action.error }
    default:
      return state
  }
}
