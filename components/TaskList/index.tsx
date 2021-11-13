import React from 'react'
import Paper from '@mui/material/Paper'

import { TaskListProps } from './interface'
import {
  Checkbox,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import { TaskStatusDropdown } from '../TaskStatusDropdown'
import { StyledList, StyledListItemButton, StyledListItemText } from './styles'

export const TaskList = ({
  tasks,
  onTaskSelect,
  onTaskStatusUpdate,
}: TaskListProps) => {
  return (
    <Paper
      component="ul"
      sx={{ p: '0px', display: 'flex', alignItems: 'center', width: 500 }}
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
    </Paper>
  )
}
