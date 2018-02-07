const dotenv = require('dotenv')
const express = require('express')

beforeAll(() => {
  jest.spyOn(dotenv, 'config')
  jest.spyOn(express.application, 'listen').mockImplementation((port, cb) => { cb() })    // dont ACTUALLY listen, so tests dont hang...
  console.log = jest.fn()
  require('../app/main')
})

it('loads environment from file', () => {
  expect(dotenv.config).toHaveBeenCalled()
})

it('listens on the process.env.PORT', () => {
  expect(express.application.listen).toHaveBeenCalledWith(process.env.PORT, expect.anything())
})

it('logs when listening', () => {
  expect(console.log).toHaveBeenCalledWith(`app listening on port ${process.env.PORT}`)
})
