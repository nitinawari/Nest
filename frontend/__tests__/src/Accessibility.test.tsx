import React from 'react'
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { MemoryRouter } from 'react-router-dom'

// Import all pages
import {
  Home,
  ProjectsPage,
  CommitteesPage,
  ChaptersPage,
  ContributePage,
  ProjectDetailsPage,
  CommitteeDetailsPage,
  ChapterDetailsPage,
  UsersPage,
  UserDetailsPage,
} from 'pages'

// Helper function to wrap components with necessary providers
const renderWithProviders = (Component: React.ComponentType) => {
  return render(
    <MemoryRouter>
      <Component />
    </MemoryRouter>
  )
}

// Extend jest expect with axe violations checker
expect.extend(toHaveNoViolations)

describe('Accessibility Tests', () => {
  const pages = [
    { name: 'Home', component: Home },
    { name: 'ProjectsPage', component: ProjectsPage },
    { name: 'CommitteesPage', component: CommitteesPage },
    { name: 'ChaptersPage', component: ChaptersPage },
    { name: 'ContributePage', component: ContributePage },
    { name: 'ProjectDetailsPage', component: ProjectDetailsPage },
    { name: 'CommitteeDetailsPage', component: CommitteeDetailsPage },
    { name: 'ChapterDetailsPage', component: ChapterDetailsPage },
    { name: 'UsersPage', component: UsersPage },
    { name: 'UserDetailsPage', component: UserDetailsPage },
  ]

  pages.forEach(({ name, component: Component }) => {
    it(`${name} should not have any accessibility violations`, async () => {
      const { container } = renderWithProviders(Component)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
