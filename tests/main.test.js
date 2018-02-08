const dotenv = require('dotenv')
const express = require('express')

const mockApiRouter = jest.fn()
const mockSession = jest.fn(() => (req, res, next) => { next() })
const mockBodyParserJsonMiddleware = (req, res, next) => { next() }
const mockBodyParser = {
  json: jest.fn(() => mockBodyParserJsonMiddleware)
}

beforeAll(() => {
  jest.spyOn(dotenv, 'config')
  jest.spyOn(express.application, 'listen').mockImplementation((port, cb) => { cb() })    // dont ACTUALLY listen, so tests dont hang...
  jest.spyOn(express.application, 'use')
  console.log = jest.fn()
  jest.mock('../app/router/api', () => mockApiRouter)
  jest.mock('express-session', () => mockSession)
  jest.mock('body-parser', () => mockBodyParser)
  require('../app/main')
})

it('loads environment from file', () => {
  expect(dotenv.config).toHaveBeenCalled()
})

it('uses session', () => {
  expect(mockSession).toHaveBeenCalled()
})

it('parses json', () => {
  expect(mockBodyParser.json).toHaveBeenCalled()
  expect(express.application.use).toHaveBeenCalledWith(mockBodyParserJsonMiddleware)
})

it('uses the api router on /api', () => {
  expect(express.application.use).toHaveBeenCalledWith('/api', mockApiRouter)
})

it('listens on the process.env.PORT', () => {
  expect(express.application.listen).toHaveBeenCalledWith(process.env.PORT, expect.anything())
})

it('logs when listening', () => {
  expect(console.log).toHaveBeenCalledWith(`app listening on port ${process.env.PORT}`)
})
