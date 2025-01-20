import { screen, waitFor } from '@testing-library/react'
import { fetchAlgoliaData } from 'api/fetchAlgoliaData'
import { axe, toHaveNoViolations } from 'jest-axe'
import { ChapterDetailsPage } from 'pages'
import { render } from 'wrappers/testUtil'

import { mockChapterData } from '@tests/data/mockChapterData'

expect.extend(toHaveNoViolations)

jest.mock('api/fetchAlgoliaData', () => ({
  fetchAlgoliaData: jest.fn(),
}))
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))

describe('ChapterDetailsPage Component', () => {
  beforeEach(() => {
    ;(fetchAlgoliaData as jest.Mock).mockResolvedValue({
      hits: mockChapterData.chapters,
      totalPages: 2,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should not have any accessibility violations', async () => {
    const { container } = render(<ChapterDetailsPage />)

    // Wait for content to load
    await waitFor(() => {
      expect(screen.queryByText('Loading indicator')).not.toBeInTheDocument()
    })

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  test('renders loading spinner initially', async () => {
    render(<ChapterDetailsPage />)
    const loadingSpinner = screen.getAllByAltText('Loading indicator')
    await waitFor(() => {
      expect(loadingSpinner.length).toBeGreaterThan(0)
    })
  })

  test('renders chapter data correctly', async () => {
    render(<ChapterDetailsPage />)
    await waitFor(() => {
      expect(screen.getByText('Chapter 1')).toBeInTheDocument()
    })
    expect(screen.getByText('This is a summary of Chapter 1.')).toBeInTheDocument()
    const viewButton = screen.getByText('Join')
    expect(viewButton).toBeInTheDocument()
  })

  test('displays "Chapter not found" when there are no chapters', async () => {
    ;(fetchAlgoliaData as jest.Mock).mockResolvedValue({ hits: [], totalPages: 0 })
    render(<ChapterDetailsPage />)
    await waitFor(() => {
      expect(screen.getByText('Chapter not found')).toBeInTheDocument()
    })
  })
})
