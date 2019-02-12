import add from './add'

const total = (x, y) => {
  return `$${add.sum(x, y)}`
}

export default total
