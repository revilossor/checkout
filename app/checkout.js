module.exports = products => {
  const getPriceList = product => { // TODO sort price list by price-per-unit...
    const price = products.find(item => item.code === product).price
    return price.sort((a, b) => a.quantity < b.quantity)
  }
  const prices = {}
  products.forEach(product => {
    prices[product.code] = getPriceList(product.code)
  })
  return basket => {
    function applyPrice (prices, quantity, total = 0) {
      if (quantity === 0) { return total }
      const deal = prices.find(item => item.quantity <= quantity)
      return applyPrice(prices, quantity - deal.quantity, total + deal.price)
    }
    let basketTotal = 0
    basket.forEach(product => {
      basketTotal += applyPrice(prices[product.code], product.quantity)
    })
    return basketTotal
  }
}
