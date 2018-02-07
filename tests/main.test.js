const dotenv = require('dotenv')
const express = require('express')

beforeAll(() => {
  jest.spyOn(dotenv, 'config')
  jest.spyOn(express.application, 'listen').mockImplementation(() => {})    // dont ACTUALLY listen, so tests dont hang...
  require('../app/main')
})

it('loads environment from file', () => {
  expect(dotenv.config).toHaveBeenCalled()
})

it('listens on the process.env.PORT', () => {
  expect(express.application.listen).toHaveBeenCalledWith(process.env.PORT)
})
