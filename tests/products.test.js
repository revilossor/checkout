let products

const assertions = [
  { code: 'A', price: [ { quantity: 1, cost: 50 }, { quantity: 3, cost: 140 } ] },
  { code: 'B', price: [ { quantity: 1, cost: 35 }, { quantity: 2, cost: 60 } ] },
  { code: 'C', price: [ { quantity: 1, cost: 25 } ] },
  { code: 'D', price: [ { quantity: 1, cost: 12 } ] }
]

beforeAll(() => {
  products = require('../app/products')
})

assertions.forEach(assertion => {
  describe(`item ${assertion.code}`, () => {
    let product
    beforeAll(() => {
      product = products.find(item => item.code === assertion.code)
    })
    assertion.price.forEach(price => {
      it(`costs ${price.cost} for ${price.quantity}`, () => {
        const cost = product.price.find(item => item.quantity === price.quantity).cost
        expect(cost).toBe(price.cost)
      })
    })
  })
})
