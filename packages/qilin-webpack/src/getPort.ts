const portfinder = require('portfinder')
export default async (port?: number) => {
  if (port) return port

  if (process.env.PORT) {
    return parseInt(process.env.PORT, 10)
  }

  portfinder.basePort = 8000
  portfinder.highestPort = 9000

  return portfinder.getPortPromise()
}
