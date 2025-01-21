// Accessibility.test.tsx
import { render, waitFor, act } from '@testing-library/react'
import App from 'App'
import { axe, toHaveNoViolations } from 'jest-axe'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ChaptersPage } from 'pages/index'

expect.extend(toHaveNoViolations)

const renderWithRouter = (Component: React.ComponentType) => {
  return render(
    <BrowserRouter>
      <Component />
    </BrowserRouter>
  )
}

describe('Accessibility Tests', () => {
  jest.setTimeout(30000)

  it('App should have no accessibility violations', async () => {
    let container;

    await act(async () => {
      const rendered = renderWithRouter(App)
      container = rendered.container
      await waitFor(() => container)
    })

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  const pages = [
    { component: ChaptersPage, name: 'ChapterPage' },
  ]

  describe.each(pages)('Testing individual pages', ({ component: PageComponent, name }) => {
    it(`${name} should have no accessibility violations`, async () => {
      let container;

      await act(async () => {
        const rendered = renderWithRouter(PageComponent)
        container = rendered.container
        await waitFor(() => container)
      })

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
