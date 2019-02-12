import total from './total'
import add from './add'

jest.mock('./add', () => ({
  sum: jest.fn(() => 3),
}))

it('returns a string of total with USD', () => {
  expect(total(1, 2)).toEqual('$3')
  expect(add.sum).toHaveBeenCalledTimes(1)
})
