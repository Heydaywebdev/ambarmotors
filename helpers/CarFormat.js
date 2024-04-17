class CarFormat {
  static PriceFormat(realPrice) {
    try {
      const price =
        typeof realPrice === 'number' ? realPrice.toString() : realPrice

      if (price.length > 3)
        return (
          price.substring(0, price.length - 3) +
          ',' +
          price.substring(price.length - 3, price.length)
        )
      return price
    } catch (e) {
      return null
    }
  }
}

export default CarFormat
