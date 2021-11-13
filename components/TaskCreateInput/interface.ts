export interface TaskCreateInputProps {
  value: string
  onFieldChange: (value: string) => void
  onButtonClick: React.MouseEventHandler<HTMLButtonElement>
  loading: boolean
}