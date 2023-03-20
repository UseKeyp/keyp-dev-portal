import { render } from '@redwoodjs/testing'

import DefaultLayoutNoHeaderOrFooter from './DefaultLayoutNoHeaderOrFooter'

describe('DefaultLayoutNoHeaderOrFooter', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DefaultLayoutNoHeaderOrFooter />)
    }).not.toThrow()
  })
})
