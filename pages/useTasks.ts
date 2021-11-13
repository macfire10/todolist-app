import { Task, TaskStatus } from ".prisma/client";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as taskActions from '../redux/task/actions'

export function useTasks(preloadedTasks: Task[]) {
  const [inputValue, setInputValue] = useState('')

  const dispatch = useDispatch()

  const { enqueueSnackbar } = useSnackbar();

  const tasks = useSelector((state) => state[0]?.tasks) || preloadedTasks || []
  const isCreatingTask = useSelector((state) => state[0]?.createTaskLoading) || false
  const error = useSelector((state) => state[0]?.error)

  const getTasks = () => {
    dispatch(taskActions.getTasks())
  }
  
  const createTask = () => {
    dispatch(taskActions.createTask(inputValue))
  }

  const updateTaskStatus = (id: string, status: TaskStatus) => {
    dispatch(taskActions.updateTask(id, { status }))
  }

  const updateTask = (id: string, taskBody: Partial<Task>) => {
    dispatch(taskActions.updateTask(id, taskBody))
  }

  const deleteTask = (id: string) => {
    dispatch(taskActions.deleteTask(id))
  }

  useEffect(() => {
    getTasks()
  // getTasks is stable since dispatch is
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, {
        variant: 'error',
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  return {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    isCreatingTask,
    tasks,
    inputValue,
    setInputValue,
  }
}