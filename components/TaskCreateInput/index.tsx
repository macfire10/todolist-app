import React from 'react'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import LoadingButton from '@mui/lab/LoadingButton'

import { TaskCreateInputProps } from './interface'

export const TaskCreateInput = ({ value, onFieldChange, onButtonClick, loading }: TaskCreateInputProps) => {
  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onFieldChange(event.target.value)
  }

  return (
    <Paper
      component="form"
      sx={{ p: '6px 4px', display: 'flex', alignItems: 'center', width: 500 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Add a Task"
        inputProps={{ 'aria-label': 'add task' }}
        value={value}
        onChange={handleFieldChange}
      />
      <LoadingButton
        variant="contained"
        disableElevation
        disableRipple
        onClick={onButtonClick}
        loading={loading}
        disabled={!value.length}
      >
        Add
      </LoadingButton>
    </Paper>
  )
}
