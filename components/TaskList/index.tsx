import React from 'react'

import { TaskListProps } from './interface'
import {
  Divider,
  ListItem,
} from '@mui/material'
import { TaskStatusDropdown } from '../TaskStatusDropdown'
import { StyledPaper, StyledList, StyledListItemButton, StyledListItemText } from './styles'

export const TaskList = ({
  tasks,
  onTaskSelect,
  onTaskStatusUpdate,
}: TaskListProps) => {
  return (
    <StyledPaper
      component="ul"
    >
      <StyledList>
        {tasks.map((task, index) => {
          const { id, title, description, status } = task

          const divider = index !== tasks.length - 1 && (
            <Divider component="li" />
          )

          return (
            <React.Fragment key={id}>
              <ListItem
                secondaryAction={
                  <TaskStatusDropdown
                    currentStatus={status}
                    onTaskStatusChange={(taskStatus) =>
                      onTaskStatusUpdate(id, taskStatus)
                    }
                  />
                }
                disablePadding
              >
                <StyledListItemButton
                  onClick={() => onTaskSelect(task)}
                  disableRipple
                >
                  <StyledListItemText primary={title} secondary={description} />
                </StyledListItemButton>
              </ListItem>
              {divider}
            </React.Fragment>
          )
        })}
      </StyledList>
    </StyledPaper>
  )
}
