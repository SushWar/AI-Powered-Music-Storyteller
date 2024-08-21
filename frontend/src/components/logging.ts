export const log = (message: string, level = "info") => {
  const timestamp = new Date().toISOString()
  const color = level === "error" ? "\x1b[31m" : "\x1b[32m"
  const reset = "\x1b[0m"
  const logMessage = `${timestamp} - ${color}${level}${reset}: ${message}`
  console.log(logMessage)
}
