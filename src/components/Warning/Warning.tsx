
interface WarningProps {
    message: string,
    type?: 'warning' | 'error'
}
const Warning = ({message, type = 'warning'}: WarningProps) => {
  return (
    <div className={`ml-3 flex items-center bg-${type === 'error' ? 'red' : 'yellow'}-50 border-l-4 border-${type === 'error' ? 'red' : 'yellow-800'} p-4`}>
    <p className="text-sm text-${type === 'error' ? 'red' : 'yellow'}-700 font-semibold">{message}</p>
  </div>
  )
}

export default Warning