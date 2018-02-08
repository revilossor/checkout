let checkout, checkoutWithProducts

const mockProducts = [
  {
    code: 'mockItemOne',
    price: [
      { quantity: 1, price: 10 },
      { quantity: 3, price: 27 },
      { quantity: 5, price: 40 }
    ]
  },
  {
    code: 'mockItemTwo',
    price: [
      { quantity: 1, price: 8 },
      { quantity: 2, price: 15 },
      { quantity: 5, price: 42 }
    ]
  }
]

const assertions = [
  { basket: [ { code: 'mockItemOne', quantity: 1 } ], total: 10 },
  { basket: [ { code: 'mockItemOne', quantity: 2 } ], total: 20 },
  { basket: [ { code: 'mockItemOne', quantity: 3 } ], total: 27 },
  { basket: [ { code: 'mockItemOne', quantity: 4 } ], total: 37 },
  { basket: [ { code: 'mockItemOne', quantity: 5 } ], total: 40 },
  { basket: [ { code: 'mockItemOne', quantity: 6 } ], total: 50 },
  { basket: [ { code: 'mockItemOne', quantity: 7 } ], total: 60 },
  { basket: [ { code: 'mockItemOne', quantity: 8 } ], total: 67 },
  { basket: [ { code: 'mockItemOne', quantity: 9 } ], total: 77 },
  { basket: [ { code: 'mockItemOne', quantity: 10 } ], total: 80 },
  { basket: [ { code: 'mockItemTwo', quantity: 1 } ], total: 8 },
  { basket: [ { code: 'mockItemTwo', quantity: 2 } ], total: 15 },
  { basket: [ { code: 'mockItemTwo', quantity: 3 } ], total: 23 },
  { basket: [ { code: 'mockItemTwo', quantity: 4 } ], total: 30 },
  { basket: [ { code: 'mockItemTwo', quantity: 5 } ], total: 42 },
  { basket: [ { code: 'mockItemTwo', quantity: 6 } ], total: 50 },
  { basket: [ { code: 'mockItemTwo', quantity: 7 } ], total: 57 },
  { basket: [ { code: 'mockItemTwo', quantity: 8 } ], total: 65 },
  { basket: [ { code: 'mockItemTwo', quantity: 9 } ], total: 72 },
  { basket: [ { code: 'mockItemTwo', quantity: 10 } ], total: 84 },
  { basket: [
    { code: 'mockItemOne', quantity: 1 },
    { code: 'mockItemTwo', quantity: 1 }
  ],
    total: 18 },
  { basket: [
    { code: 'mockItemOne', quantity: 3 },
    { code: 'mockItemTwo', quantity: 6 }
  ],
    total: 77 },
  { basket: [
    { code: 'mockItemOne', quantity: 10 },
    { code: 'mockItemTwo', quantity: 3 }
  ],
    total: 103 }
]

beforeAll(() => {
  checkout = require('../app/checkout')
  checkoutWithProducts = checkout(mockProducts)
})

it('exports a function', () => {
  expect(checkout).toBeInstanceOf(Function)
})

it('exported function returns checkout function', () => {
  expect(checkoutWithProducts).toBeInstanceOf(Function)
})

describe('calculates best price for quantities in basket', () => {
  assertions.forEach(assertion => {
    it(`basket "${JSON.stringify(assertion.basket)}" should total ${assertion.total}`, () => {
      expect(checkoutWithProducts(assertion.basket)).toBe(assertion.total)
    })
  })
})
