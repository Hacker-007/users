import morgan from 'morgan'

const routeLogger = morgan(process.env.ROUTE_LOGGER_FORMAT ?? 'dev')
export default routeLogger
