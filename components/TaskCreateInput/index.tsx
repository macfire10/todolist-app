import React from 'react'
import InputBase from '@mui/material/InputBase'
import LoadingButton from '@mui/lab/LoadingButton'

import { TaskCreateInputProps } from './interface'
import { StyledPaper } from './styles'

export const TaskCreateInput = ({ value, onFieldChange, onFormSubmit, loading }: TaskCreateInputProps) => {
  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onFieldChange(event.target.value)
  }

  const handleFormSubmit: React.FormEventHandler<HTMLElement> = (event) => {
    event.preventDefault()
  
    onFormSubmit(event)
  }


  return (
    <StyledPaper
      component="form"
      onSubmit={handleFormSubmit}
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
        onClick={onFormSubmit}
        loading={loading}
        disabled={!value.length}
      >
        Add
      </LoadingButton>
    </StyledPaper>
  )
}
