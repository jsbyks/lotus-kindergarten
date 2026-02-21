# 🤝 Contributing to Lotus Kindergarten Doha

Thank you for your interest in contributing to the Lotus Kindergarten Doha project! This document provides guidelines and instructions for contributing.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)

---

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors.

### Expected Behavior

- ✅ Be respectful and considerate
- ✅ Accept constructive criticism gracefully
- ✅ Focus on what is best for the project
- ✅ Show empathy towards other community members

### Unacceptable Behavior

- ❌ Harassment or discriminatory language
- ❌ Personal attacks or trolling
- ❌ Publishing others' private information
- ❌ Other conduct that could reasonably be considered inappropriate

---

## 🚀 Getting Started

### 1. Fork the Repository

1. Click the "Fork" button on GitHub
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/lotus-kindergarten.git
   cd lotus-kindergarten
   ```

### 2. Set Up Development Environment

Follow the [SETUP.md](./SETUP.md) guide to set up your local environment.

### 3. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

**Branch Naming Convention**:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions/updates
- `chore/` - Maintenance tasks

---

## 🔄 Development Workflow

### 1. Before You Start

- ✅ Check existing issues and pull requests
- ✅ Create an issue if it doesn't exist
- ✅ Discuss major changes before implementing
- ✅ Ensure you're working on the latest `main` branch

### 2. Make Your Changes

- Write clean, readable code
- Follow the coding standards
- Add comments where necessary
- Write tests for new features
- Update documentation

### 3. Test Your Changes

```bash
# Run all tests
npm test

# Run specific test file
npm test -- auth.test.js

# Run with coverage
npm run test:coverage

# Lint code
npm run lint

# Format code
npm run format
```

### 4. Commit Your Changes

Follow the [commit guidelines](#commit-guidelines) below.

### 5. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a pull request on GitHub.

---

## 📝 Coding Standards

### JavaScript/Node.js

#### Style Guide

- Use **ES6+** features
- Follow **ESLint** configuration
- Use **Prettier** for formatting
- Maximum line length: **100 characters**

#### Naming Conventions

```javascript
// Variables and functions: camelCase
const userName = 'John';
function getUserData() {}

// Constants: UPPER_SNAKE_CASE
const MAX_RETRIES = 3;
const API_BASE_URL = 'https://api.example.com';

// Classes: PascalCase
class UserController {}

// Files: camelCase
userController.js
authMiddleware.js
```

#### Code Structure

```javascript
// 1. Imports
const express = require('express');
const User = require('../models/User');

// 2. Constants
const ROUTE_PREFIX = '/api/users';

// 3. Main code
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Exports
module.exports = router;
```

#### Best Practices

- ✅ Use `async/await` instead of callbacks
- ✅ Handle errors properly
- ✅ Validate input data
- ✅ Use meaningful variable names
- ✅ Keep functions small and focused
- ✅ Add JSDoc comments for complex functions
- ❌ Don't use `var`, use `const` or `let`
- ❌ Don't leave console.log in production code
- ❌ Don't commit sensitive data

### HTML/CSS

#### HTML

- Use semantic HTML5 elements
- Include proper accessibility attributes
- Validate HTML structure

#### CSS

- Use BEM naming convention
- Organize CSS by component
- Use CSS variables for theming
- Ensure responsive design

```css
/* BEM Example */
.user-card { }
.user-card__header { }
.user-card__body { }
.user-card--highlighted { }
```

### Database/MongoDB

- Use Mongoose schemas
- Add validation to models
- Use indexes for performance
- Follow naming conventions (singular, camelCase)

```javascript
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  // ...
});
```

---

## 💬 Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
# Good commit messages
feat(auth): add password reset functionality
fix(homework): resolve file upload issue
docs(readme): update installation instructions
refactor(api): simplify user controller logic
test(games): add unit tests for game engine

# Bad commit messages
fix: bug fix
update: changes
WIP
```

### Commit Best Practices

- ✅ Write clear, descriptive messages
- ✅ Keep commits focused (one feature/fix per commit)
- ✅ Reference issue numbers: `fix(#123): description`
- ✅ Use present tense: "add" not "added"
- ❌ Don't commit large files
- ❌ Don't commit commented-out code
- ❌ Don't commit sensitive information

---

## 🔀 Pull Request Process

### Before Submitting

- [ ] Code follows style guidelines
- [ ] All tests pass
- [ ] New tests added for new features
- [ ] Documentation updated
- [ ] No console.log or debug code
- [ ] No sensitive data committed
- [ ] Branch is up to date with `main`

### PR Template

When creating a pull request, include:

1. **Description**
   - What changes were made
   - Why these changes were needed
   - Related issue number

2. **Testing**
   - How to test the changes
   - Test results

3. **Screenshots** (if UI changes)

4. **Checklist**
   - [ ] Tests pass
   - [ ] Documentation updated
   - [ ] No breaking changes

### PR Review Process

1. **Automated Checks**
   - CI/CD pipeline runs
   - Tests must pass
   - Code must pass linting

2. **Code Review**
   - At least one approval required
   - Address review comments
   - Make requested changes

3. **Merge**
   - Squash and merge (preferred)
   - Delete branch after merge

---

## 🧪 Testing Guidelines

### Test Structure

```javascript
describe('User Authentication', () => {
  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      // Test implementation
    });

    it('should reject invalid credentials', async () => {
      // Test implementation
    });
  });
});
```

### Test Coverage

- Aim for **80%+ coverage**
- Test happy paths
- Test error cases
- Test edge cases
- Test validation

### Running Tests

```bash
# All tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage

# Specific file
npm test -- user.test.js
```

---

## 📚 Documentation

### Code Documentation

- Add JSDoc comments for functions
- Document complex logic
- Explain "why" not just "what"

```javascript
/**
 * Authenticates a user and returns JWT token
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} User object with token
 * @throws {Error} If credentials are invalid
 */
async function login(email, password) {
  // Implementation
}
```

### Update Documentation

When adding features:
- Update README.md if needed
- Update API_DOCUMENTATION.md for API changes
- Add code examples
- Update setup instructions if needed

---

## 🐛 Reporting Bugs

### Before Reporting

1. Check if bug already exists
2. Try to reproduce the issue
3. Check recent changes

### Bug Report Template

```markdown
**Description**
Clear description of the bug

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Screenshots**
If applicable

**Environment**
- OS: [e.g., Windows 10]
- Browser: [e.g., Chrome 90]
- Node version: [e.g., 14.17.0]

**Additional Context**
Any other relevant information
```

---

## 💡 Feature Requests

### Before Requesting

1. Check if feature already exists
2. Check if it's planned
3. Consider if it fits project scope

### Feature Request Template

```markdown
**Feature Description**
Clear description of the feature

**Use Case**
Why is this feature needed?

**Proposed Solution**
How should it work?

**Alternatives Considered**
Other approaches you've thought about

**Additional Context**
Any other relevant information
```

---

## 🎯 Project Priorities

Current focus areas:

1. **Core Features** - Authentication, Dashboards
2. **Educational Games** - Game engine and games
3. **Homework Platform** - Submission and grading
4. **Performance** - Optimization and caching
5. **Security** - Security audits and improvements

---

## 📞 Questions?

- Open an issue for questions
- Check existing documentation
- Contact maintainers

---

## 🙏 Thank You!

Your contributions make this project better. Thank you for taking the time to contribute!

---

**Last Updated**: January 2025  
**Contributing Guide Version**: 1.0.0
