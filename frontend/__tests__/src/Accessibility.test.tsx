// Accessibility.test.tsx
import { render, waitFor, act } from '@testing-library/react'
import App from 'App'
import { axe, toHaveNoViolations } from 'jest-axe'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import {
  Home,
  ProjectsPage,
  CommitteesPage,
  ChaptersPage,
  ContributePage,
  CommitteeDetailsPage,
  ChapterDetailsPage,
  ProjectDetailsPage,
  UsersPage,
  UserDetailsPage,
 } from 'pages/index'

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
    { component: Home, name: 'Home' },
    { component: CommitteesPage, name: 'CommitteesPage' },
    { component: ProjectsPage, name: 'ProjectsPage' },
    { component: ContributePage, name: 'ContributePage' },
    { component: CommitteeDetailsPage, name: 'CommitteeDetailsPage' },
    { component: ChapterDetailsPage, name: 'ChapterDetailsPage' },
    { component: UsersPage, name: 'UsersPage' },
    { component: ProjectDetailsPage, name: 'ProjectDetailsPage' },
    { component: UserDetailsPage, name: 'UserDetailsPage' },
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
