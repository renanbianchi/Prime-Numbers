import './index.css'

export function ErrorMessage({ message }: { message: string }) {
  return (
    <>
      <span>{message}</span>
    </>
  )
}
