# Contributing to DevAura

Thank you for your interest in contributing to DevAura! This document provides guidelines for contributing to the project.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Your environment (OS, Node version, etc.)

### Suggesting Features

Feature suggestions are welcome! Please:
- Check existing issues first
- Describe the feature clearly
- Explain the use case
- Consider implementation complexity

### Code Contributions

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
   - Follow existing code style
   - Add comments for complex logic
   - Update types as needed
4. **Test your changes**
   ```bash
   npm run dev
   npm run build
   ```
5. **Commit with clear messages**
   ```bash
   git commit -m "feat: add amazing feature"
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Create a Pull Request**

## Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow existing naming conventions
- Use functional components with hooks
- Keep components small and focused
- Add proper TypeScript types

### Component Structure

```typescript
'use client' // If using hooks/client-side features

import { ... } from '...'

interface ComponentProps {
  // Define props with TypeScript
}

export function Component({ prop }: ComponentProps) {
  // Component logic
  return (
    // JSX
  )
}
```

### API Routes

```typescript
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Logic here
    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: 'Message' }, { status: 500 })
  }
}
```

### Database Queries

- Use Prisma for all database operations
- Add proper error handling
- Use transactions for related operations
- Consider performance for large datasets

### Caching Strategy

- Cache frequently accessed data
- Use appropriate TTL values
- Invalidate cache on updates
- Handle cache misses gracefully

## Commit Message Convention

Follow conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

Examples:
```
feat: add user profile customization
fix: resolve leaderboard pagination issue
docs: update setup instructions
refactor: optimize DAI calculation
```

## Pull Request Process

1. Update README.md if needed
2. Update documentation
3. Ensure all tests pass
4. Get approval from maintainer
5. Squash commits if requested

## Areas for Contribution

### High Priority

- [ ] Real LeetCode API integration
- [ ] Real Stack Exchange API integration
- [ ] OpenAI API integration for code analysis
- [ ] Enhanced error handling
- [ ] Unit tests
- [ ] E2E tests

### Medium Priority

- [ ] User profile customization
- [ ] Activity timeline
- [ ] Achievement system
- [ ] Social sharing
- [ ] Export certificates
- [ ] Dark/light theme toggle

### Low Priority

- [ ] Mobile app (React Native)
- [ ] Chrome extension
- [ ] CLI tool
- [ ] Slack/Discord bot
- [ ] Email notifications

## Testing

Currently, the project doesn't have automated tests. Contributing test coverage would be highly valuable!

### Suggested Testing Stack

- Unit tests: Jest + React Testing Library
- E2E tests: Playwright or Cypress
- API tests: Supertest

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all.

### Our Standards

- Be respectful and inclusive
- Accept constructive criticism
- Focus on what's best for the community
- Show empathy towards others

### Unacceptable Behavior

- Harassment or discrimination
- Trolling or insulting comments
- Publishing private information
- Other unprofessional conduct

## Questions?

Feel free to open an issue for any questions about contributing!

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
