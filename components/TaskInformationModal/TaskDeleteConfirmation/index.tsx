import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  DialogActions,
} from '@mui/material'
import { TaskDeleteConfirmationProps } from './interface'

export const TaskDeleteConfirmation = ({
  open,
  onClose,
  onDeleteConfirm,
}: TaskDeleteConfirmationProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete task?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please confirm if you want to delete the task.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onDeleteConfirm} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}
