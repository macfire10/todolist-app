export interface TaskCreateInputProps {
  value: string
  onFieldChange: (value: string) => void
  onFormSubmit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FormEvent<HTMLElement>) => void
  loading: boolean
}