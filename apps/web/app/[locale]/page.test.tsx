import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from './page'

test('Landing Page renders heading', () => {
    render(<Page />)
    expect(screen.getByText('SGIF')).toBeDefined()
})
