import {
  MenuItem,
  MenuItemProps,
  Select,
  SelectProps,
} from '@mui/material'
import { styled, alpha } from '@mui/material/styles'
import CheckIcon from '@mui/icons-material/Check'

export const StyledCheckIcon = styled(CheckIcon)(({ theme }) => ({
  fontSize: theme.typography.h6.fontSize,
  marginLeft: theme.spacing(1),
}))

export const StyledSelect = styled(Select)<
  SelectProps & { paletteKey: string }
>(({ theme, paletteKey }) => ({
  maxHeight: 40,
  '@media (prefers-color-scheme: light)': {
    background: theme.palette[paletteKey].light,
    color: theme.palette.common.white,
    '&.MuiOutlinedInput-root > .MuiOutlinedInput-notchedOutline': {
      borderColor: alpha(theme.palette[paletteKey].light, 1),
    },
  },
  '@media (prefers-color-scheme: dark)': {
    background: alpha(theme.palette[paletteKey].dark, 0.6),
    '&.MuiOutlinedInput-root > .MuiOutlinedInput-notchedOutline': {
      borderColor: alpha(theme.palette[paletteKey].dark, 0.6),
    },
  },
}))

export const StyledMenuItem = styled(MenuItem)<
  MenuItemProps & { paletteKey: string }
>(({ theme, paletteKey }) => ({
  '@media (prefers-color-scheme: light)': {
    background: alpha(theme.palette[paletteKey].light, 0.2),
    color: alpha(theme.palette[paletteKey].main, 0.8),
    '&:hover, &.Mui-focusVisible, &.Mui-selected:hover': {
      background: alpha(theme.palette[paletteKey].dark, 0.8),
      color: alpha(theme.palette.common.white, 0.8),
    },
    '&.Mui-selected': {
      background: alpha(theme.palette[paletteKey].light, 0.2),
      color: alpha(theme.palette[paletteKey].main, 0.8),
    },
  },
  '@media (prefers-color-scheme: dark)': {
    background: alpha(theme.palette[paletteKey].dark, 0.6),
    color: alpha(theme.palette.common.white, 0.8),
    '&:hover, &.Mui-focusVisible, &.Mui-selected:hover': {
      background: alpha(theme.palette[paletteKey].dark, 0.4),
      color: alpha(theme.palette.common.white, 0.8),
    },
    '&.Mui-selected': {
      backgroundColor: alpha(theme.palette[paletteKey].dark, 0.4),
      color: alpha(theme.palette.common.white, 0.8),
    },
  },
}))

