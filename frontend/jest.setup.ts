import '@testing-library/jest-dom'
import { TextEncoder } from 'util'
import dotenv from 'dotenv'
import { toHaveNoViolations } from 'jest-axe'
import React from 'react'

dotenv.config()
expect.extend(toHaveNoViolations)

global.React = React
global.TextEncoder = TextEncoder
global.axe = {
  run: async () => ({
    violations: [],
  }),
  configure: () => null,
}

beforeEach(() => {
  window.scrollTo = jest.fn()
  jest.spyOn(console, 'error').mockImplementation((...args) => {
    throw new Error(`Console error: ${args.join(' ')}`)
  })

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
})

expect.extend({
  toBeAccessible: async (received) => {
    const results = await global.axe.run(received)
    return {
      pass: results.violations.length === 0,
      message: () =>
        results.violations.length === 0
          ? 'Expected element to not be accessible'
          : `Expected element to be accessible but found violations:\n${JSON.stringify(
              results.violations,
              null,
              2
            )}`,
    }
  },
})

jest.mock('@algolia/autocomplete-theme-classic', () => ({}))
