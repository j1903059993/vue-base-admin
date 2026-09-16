export function hasPermission(granted: string[], required?: string) {
  if (!required) return true
  return granted.some(item => item === '*' || item === required || (item.endsWith('*') && required.startsWith(item.slice(0, -1))))
}
