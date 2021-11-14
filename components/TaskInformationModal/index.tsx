import React, { useMemo, useState } from 'react'
import {
  DialogTitle,
  DialogContent,
  IconButton,
  useMediaQuery,
  Grid,
  Typography,
  useTheme,
  Theme,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { TaskStatus } from '.prisma/client'

import { TaskStatusDropdown } from '../TaskStatusDropdown'
import { EditableField } from '../EditableField'

import { ActionsMenu } from './ActionsMenu'
import { StyledDialog, StyledEditableTitle } from './styles'
import { TaskInformationModalProps } from './interface'
import { TaskDeleteConfirmation } from './TaskDeleteConfirmation'

export const TaskInformationModal = ({
  open,
  onClose,
  task,
  updateTask,
  deleteTask,
}: TaskInformationModalProps) => {
  const theme = useTheme()
  const matchesMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  const taskActions = useMemo(() => [
    {
      name: 'Delete',
      cb: () => setDeleteModalOpen(true),
    }
  ], [])

  if (!task) return null

  const { id, title, description, status } = task

  const handleStatusUpdate = (status: TaskStatus) => {
    updateTask(id, { status })
  }

  const handleTitleUpdate = (title: string) => {
    updateTask(id, { title })
  }

  const handleDescriptionUpdate = (description: string) => {
    updateTask(id, { description })
  }

  const handleDeleteConfirm = () => {
    deleteTask(id)

    setDeleteModalOpen(false)
    onClose()
  }

  const mainModalOpen = open && !deleteModalOpen

  return (
    <>
      <TaskDeleteConfirmation
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDeleteConfirm={handleDeleteConfirm}
      />
      <StyledDialog
        onClose={onClose}
        open={mainModalOpen}
        fullWidth
        maxWidth="md"
        fullScreen={matchesMobile}
      >
        <DialogTitle>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <StyledEditableTitle
                value={title}
                onChangeConfirm={handleTitleUpdate}
                placeholder="Add a title..."
                fullWidth
              />
            </Grid>
            <>
              <ActionsMenu
                sx={{
                  position: 'absolute',
                  right: 48,
                  top: 8,
                  color: (theme: Theme) => theme.palette.grey[500],
                }}
                options={taskActions}
              />
              {onClose ? (
                <IconButton
                  aria-label="close"
                  onClick={onClose}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CloseIcon />
                </IconButton>
              ) : null}
            </>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <Typography variant="subtitle2" display="block" gutterBottom>
                Description
              </Typography>
              <EditableField
                value={description}
                onChangeConfirm={handleDescriptionUpdate}
                placeholder="Add a description..."
                multiline
                minRows={3}
                maxRows={10}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle2" display="block" gutterBottom>
                Status
              </Typography>
              <TaskStatusDropdown
                currentStatus={status}
                onTaskStatusChange={handleStatusUpdate}
              />
            </Grid>
          </Grid>
        </DialogContent>
      </StyledDialog>
    </>
  )
}
