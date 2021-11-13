import React, { forwardRef, useEffect, useRef } from 'react'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'

import { StyledInput, FloatingIconButton, StyledPopper } from './styles'
import { EditableFieldProps } from './interface'

export const EditableField = forwardRef(function Field(
  props: EditableFieldProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const popperRef = useRef()
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)
  const [text, setText] = React.useState<string>(props.value as string)

  const handleFocus = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    setAnchorEl(event.currentTarget)

    props.onFocus && props.onFocus(event)
  }

  const handleBlur = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    if (popperRef?.current?.contains(event.relatedTarget)) {
      return;
    }
    setAnchorEl(null)

    props.onChangeConfirm && props.onChangeConfirm(text)
    props.onBlur && props.onBlur(event)
  }

  const handleInternalChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setText(event.target.value)
  }

  const handleConfirmChange = () => {
    setAnchorEl(null)
    props.onChangeConfirm && props.onChangeConfirm(text)
  }

  const handleRejectChange = () => {
    setAnchorEl(null)
    setText(props.value)
  }

  useEffect(() => {
    if (props.value.length) {
      setText(props.value)
    }
  }, [props.value])

  const open = !!anchorEl
  const id = open ? 'editable-field-focused-popover' : undefined

  return (
    <>
      <StyledInput
        {...props}
        ref={ref}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleInternalChange}
        value={text}
      />
      <StyledPopper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-end"
        ref={popperRef}
      >
        <FloatingIconButton variant="outlined" onClick={handleConfirmChange}>
          <CheckIcon />
        </FloatingIconButton>
        <FloatingIconButton variant="outlined" onClick={handleRejectChange}>
          <ClearIcon />
        </FloatingIconButton>
      </StyledPopper>
    </>
  )
})
