import { info, error as _error } from './logger.js'
import jsonwebtokenpkg from 'jsonwebtoken';
const { verify } = jsonwebtokenpkg;
import User from '../models/user.js'


const requestLogger = (request, response, next) => {
  info('Method:', request.method)
  info('Path:  ', request.path)
  info('Body:  ', request.body)
  info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  _error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name ===  'JsonWebTokenError') {
    return response.status(401).json({ error: error.message })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  }

  next()
}


const userExtractor = (request, response, next) => {
  if(request.token == undefined) {
    request.user = null;
    return next();
  }
  const decodedToken = verify(request.token, process.env.SECRET)
  User.findById(decodedToken.id)
  .then(user => {
    request.user = user;
    next();
  })
  .catch(next)
}
export default {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}