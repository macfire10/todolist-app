import React, { useEffect, useState } from 'react'

import { StyledCheckIcon, StyledSelect, StyledMenuItem } from './styles'
import { SelectItemProps, TaskStatusDropdownProps } from './interface'
import { TaskStatus } from '.prisma/client'

export const paletteKeyMap = {
  [TaskStatus.TODO]: 'primary',
  [TaskStatus.IN_PROGRESS]: 'info',
  [TaskStatus.ON_HOLD]: 'warning',
  [TaskStatus.COMPLETED]: 'success',
}

export const TaskStatusDropdown = ({
  currentStatus,
  onTaskStatusChange,
}: TaskStatusDropdownProps) => {
  const [internalValue, setInternalValue] = useState<TaskStatus>(currentStatus)

  const handleChange = (event) => {
    setInternalValue(event.target.value)
    onTaskStatusChange(event.target.value as TaskStatus)
  }

  useEffect(() => {
    if (currentStatus !== internalValue) {
      setInternalValue(currentStatus)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStatus])

  const SelectItem = ({
    status,
    children,
    ...rest
  }: SelectItemProps) => {
    const checkedIcon = currentStatus === status && <StyledCheckIcon />
  
    return (
      <StyledMenuItem value={status} paletteKey={paletteKeyMap[status]} {...rest}>
          {children}
          {checkedIcon}
      </StyledMenuItem>
    )
  }

  return (
    <StyledSelect
      labelId="task-status-select-label"
      id="task-status-select"
      aria-label="Change status"
      value={internalValue}
      onChange={handleChange}
      paletteKey={paletteKeyMap[internalValue]}
      MenuProps={{
        elevation: 1,
        sx: {
          marginTop: '2px',
          '& .MuiList-root': {
            padding: 0,
          }
        }
      }}
    >
      <SelectItem value={TaskStatus.TODO} status={TaskStatus.TODO}>To Do</SelectItem>
      <SelectItem value={TaskStatus.IN_PROGRESS} status={TaskStatus.IN_PROGRESS}>In Progress</SelectItem>
      <SelectItem value={TaskStatus.ON_HOLD} status={TaskStatus.ON_HOLD}>On Hold</SelectItem>
      <SelectItem value={TaskStatus.COMPLETED} status={TaskStatus.COMPLETED}>Completed</SelectItem>
    </StyledSelect>
  )
}