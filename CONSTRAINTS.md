# AI AGENT CONSTRAINTS & GUIDELINES
## Lotus Kindergarten Doha - Project Boundaries

---

## ⚠️ CRITICAL: READ BEFORE ANY ACTION

This document defines strict boundaries for AI agents working on this project. Violating these constraints requires explicit human approval.

---

## 🚫 ABSOLUTE PROHIBITIONS

### DO NOT:

| # | Prohibition | Reason |
|---|-------------|--------|
| 1 | Invent school information (phone, email, address, staff names) | Prevents misinformation |
| 2 | Create features not listed in PROJECT_DOCUMENTATION.md | Prevents scope creep |
| 3 | Add new npm packages without approval | Security & compatibility |
| 4 | Change database schema without approval | Data integrity |
| 5 | Modify authentication/security logic without approval | Security risk |
| 6 | Assume requirements not explicitly stated | Prevents hallucination |
| 7 | Generate fake testimonials or reviews | Ethical concerns |
| 8 | Create content in languages other than English/Arabic | Project scope |
| 9 | Add payment processing without explicit approval | Legal/financial risk |
| 10 | Deploy to production without human verification | Risk management |

---

## ✅ PERMITTED ACTIONS (No Approval Needed)

### Code Development:
- [ ] Create files listed in PROJECT_DOCUMENTATION.md
- [ ] Implement features documented in PROJECT_DOCUMENTATION.md
- [ ] Use packages listed in PROJECT_DOCUMENTATION.md
- [ ] Fix bugs in existing code
- [ ] Refactor for better performance (without changing functionality)
- [ ] Add comments and documentation
- [ ] Create unit tests for existing features
- [ ] Improve UI/UX within existing design system

### Content:
- [ ] Use placeholder text clearly marked as `[PLACEHOLDER]`
- [ ] Use placeholder images from approved sources (Unsplash, placeholder.com)
- [ ] Write generic educational content for games
- [ ] Create standard error messages
- [ ] Write code comments

---

## 🔒 LOCKED SPECIFICATIONS

### These specifications are FINAL and cannot be changed:

#### School Information
```
Name: Lotus Kindergarten
Location: Doha, Qatar
Programs: Pre-K, KG1, KG2 (ONLY these three)
Currency: QAR (Qatari Riyal)
Languages: English, Arabic
```

#### User Roles (EXACTLY 4)
```
1. Admin
2. Teacher
3. Parent
4. Student (Child)
```

#### Technology Stack (LOCKED)
```
Frontend: HTML, CSS (Tailwind), JavaScript
Backend: Node.js, Express.js
Database: MongoDB with Mongoose
Authentication: JWT + Passport.js
File Storage: Cloudinary
Email: Nodemailer
```

#### Color Scheme (LOCKED)
```css
--lotus-pink: #FF6B9D;
--lotus-purple: #9B5DE5;
--lotus-blue: #00BBF9;
--lotus-green: #00F5D4;
--lotus-yellow: #FEE440;
--lotus-orange: #F77F00;
```

#### Fonts (LOCKED)
```
Primary: 'Nunito', sans-serif
Display: 'Fredoka One', cursive
```

---

## 📋 APPROVAL REQUIRED

### Request human approval BEFORE:

#### 1. Adding New Features
```
FORMAT:
"APPROVAL REQUEST: New Feature"
- Feature name: [name]
- Reason needed: [reason]
- Files affected: [list]
- Estimated complexity: [low/medium/high]
- Dependencies: [any new packages?]

Awaiting approval before proceeding.
```

#### 2. Adding New Packages
```
FORMAT:
"APPROVAL REQUEST: New Package"
- Package name: [name]
- Version: [version]
- Purpose: [why needed]
- Alternatives considered: [list]
- Security: [is it actively maintained?]

Awaiting approval before proceeding.
```

#### 3. Changing Database Schema
```
FORMAT:
"APPROVAL REQUEST: Schema Change"
- Collection: [name]
- Change type: [add field/remove field/modify field]
- Reason: [why needed]
- Migration needed: [yes/no]
- Data impact: [description]

Awaiting approval before proceeding.
```

#### 4. Modifying Security/Auth
```
FORMAT:
"APPROVAL REQUEST: Security Change"
- Component: [what's being changed]
- Current behavior: [description]
- Proposed change: [description]
- Security implications: [analysis]
- Testing required: [list]

Awaiting approval before proceeding.
```

---

## 🎯 SCOPE BOUNDARIES

### IN SCOPE ✅

#### Pages (17 total)
| Public Pages | Dashboard Pages |
|--------------|-----------------|
| Homepage | Admin Dashboard (10 sub-pages) |
| About | Teacher Dashboard (11 sub-pages) |
| Programs | Parent Dashboard (10 sub-pages) |
| Admissions | Student Dashboard (9 sub-pages) |
| Gallery | - |
| Events | - |
| News | - |
| Contact | - |
| Careers | - |
| Login/Register | - |

#### Games (10 total)
| # | Game | Grades |
|---|------|--------|
| 1 | Memory Match | Pre-K, KG1, KG2 |
| 2 | Counting Fun | Pre-K, KG1, KG2 |
| 3 | Alphabet Adventure | Pre-K, KG1, KG2 |
| 4 | Shape Safari | Pre-K, KG1, KG2 |
| 5 | Color Quest | Pre-K, KG1, KG2 |
| 6 | Pattern Play | Pre-K, KG1, KG2 |
| 7 | Puzzle Time | Pre-K, KG1, KG2 |
| 8 | Word Builder | KG1, KG2 |
| 9 | Math Fun | KG1, KG2 |
| 10 | Music Maker | Pre-K, KG1, KG2 |

#### API Endpoints
- Only endpoints listed in PROJECT_DOCUMENTATION.md
- No additional endpoints without approval

### OUT OF SCOPE ❌

| Feature | Reason |
|---------|--------|
| E-commerce / Shop | Not in requirements |
| Video conferencing | Not in requirements |
| Mobile app | Web only (for now) |
| Multi-school support | Single school only |
| Third-party integrations | Not approved |
| AI/ML features | Not in requirements |
| Social media login | Standard auth only |
| SMS notifications | Email only (unless approved) |
| Cryptocurrency | Not applicable |
| Grades beyond KG2 | Pre-K, KG1, KG2 only |

---

## 📝 PLACEHOLDER RULES

### When real content is unavailable:

#### Text Placeholders
```html
<!-- CORRECT -->
<p>[PLACEHOLDER: School phone number - get from client]</p>
<p>[PLACEHOLDER: Principal's welcome message]</p>

<!-- INCORRECT - Never do this -->
<p>+974 4444 5555</p>  <!-- Made up number -->
<p>Our principal Dr. Ahmed says...</p>  <!-- Made up person -->
```

#### Image Placeholders
```html
<!-- CORRECT: Use Unsplash with descriptive alt -->
<img src="https://images.unsplash.com/photo-xxx" 
     alt="[PLACEHOLDER: Replace with actual classroom photo]">

<!-- CORRECT: Use placeholder service -->
<img src="https://via.placeholder.com/400x300?text=School+Photo+Needed"
     alt="[PLACEHOLDER]">

<!-- INCORRECT - Never do this -->
<img src="actual-school-photo.jpg">  <!-- File doesn't exist -->
```

#### Data Placeholders
```javascript
// CORRECT
const SCHOOL_PHONE = "[PLACEHOLDER]"; // TODO: Get from client
const SCHOOL_EMAIL = "[PLACEHOLDER]"; // TODO: Get from client

// INCORRECT - Never do this
const SCHOOL_PHONE = "+974 4123 4567"; // Made up
```

---

## 🔍 VALIDATION CHECKPOINTS

### Before Creating Any File:

```
□ Is this file listed in PROJECT_DOCUMENTATION.md?
□ Does it follow the defined folder structure?
□ Does it use only approved technologies?
□ Does it follow the coding standards below?
□ Are all placeholders clearly marked?
□ Is there any made-up school information? (Should be NO)
```

### Before Implementing Any Feature:

```
□ Is this feature in PROJECT_DOCUMENTATION.md?
□ Is it within the defined scope?
□ Does it require any new packages? (If yes, get approval)
□ Does it change the database schema? (If yes, get approval)
□ Does it affect authentication/security? (If yes, get approval)
□ Am I making any assumptions? (If yes, ask first)
```

### Before Any Response:

```
□ Am I adding features not requested?
□ Am I making up information?
□ Am I assuming requirements?
□ Am I introducing scope creep?
□ Should I ask for clarification instead?
```

---

## 💻 CODING STANDARDS

### File Naming
```
✅ CORRECT:
- kebab-case for files: user-controller.js, admin-dashboard.html
- camelCase for variables: userName, studentList
- PascalCase for classes/models: User.js, StudentController

❌ INCORRECT:
- user_controller.js (snake_case)
- UserController.html (PascalCase for HTML)
```

### Code Comments
```javascript
// ✅ CORRECT: Reference documentation
// See PROJECT_DOCUMENTATION.md - Section: User Schema

// ✅ CORRECT: Mark placeholders
// TODO: [PLACEHOLDER] Replace with actual school email

// ❌ INCORRECT: Vague comments
// This does stuff

// ❌ INCORRECT: Assuming features
// TODO: Add blockchain integration
```

### Error Messages
```javascript
// ✅ CORRECT: Standard, professional messages
throw new Error('Authentication failed. Please check your credentials.');

// ❌ INCORRECT: Made-up specific contact
throw new Error('Contact Dr. Ahmed at +974 1234 5678'); // Made up!
```

---

## 🔄 CHANGE MANAGEMENT

### If Requirements Change:

1. **STOP** current work
2. **DOCUMENT** the requested change
3. **UPDATE** PROJECT_DOCUMENTATION.md first
4. **GET APPROVAL** for the update
5. **THEN** implement the change

### Change Request Format:
```
CHANGE REQUEST #[number]
Date: [date]
Requested by: [human/user]

Current State:
[what exists now]

Requested Change:
[what needs to change]

Impact Analysis:
- Files affected: [list]
- Database changes: [yes/no]
- Security impact: [yes/no]
- Estimated effort: [hours]

Status: PENDING APPROVAL
```

---

## 🐛 BUG HANDLING

### When Encountering Bugs:

```
BUG REPORT FORMAT:
- Location: [file and line]
- Expected behavior: [what should happen]
- Actual behavior: [what is happening]
- Proposed fix: [solution]
- Side effects: [any risks]

Proceeding with fix: [yes/no - based on severity]
```

### Fix Without Approval:
- Typos
- Syntax errors
- Obvious logic errors
- Missing semicolons
- Import errors

### Fix WITH Approval:
- Security-related bugs
- Authentication issues
- Database query bugs
- Payment-related (if any)
- Data loss risks

---

## 📊 PROGRESS TRACKING

### After Each Work Session:

```
SESSION SUMMARY
===============
Date: [date]
Duration: [time]

Completed:
□ [task 1]
□ [task 2]

In Progress:
□ [task 3] - [% complete]

Blockers:
- [any issues needing human input]

Next Steps:
- [planned tasks]

Approvals Needed:
- [any pending requests]

Files Changed:
- [list of files]
```

---

## 🚨 EMERGENCY PROTOCOLS

### If Unsure About Anything:

```
STOP AND ASK.

Format:
"CLARIFICATION NEEDED"
- Topic: [what you're unsure about]
- Context: [why it matters]
- Options: [possible interpretations]
- Recommendation: [your suggestion]

Awaiting clarification before proceeding.
```

### If Conflicting Requirements Found:

```
CONFLICT DETECTED

Source 1: [document/instruction]
States: [requirement A]

Source 2: [document/instruction]
States: [requirement B]

These conflict because: [explanation]

Awaiting resolution before proceeding.
```

---

## ✅ COMPLIANCE CHECKLIST

### Every AI Response Must:

- [ ] Stay within documented scope
- [ ] Use only approved technologies
- [ ] Not invent school information
- [ ] Mark all placeholders clearly
- [ ] Request approval for new features
- [ ] Follow coding standards
- [ ] Reference PROJECT_DOCUMENTATION.md
- [ ] Not assume unstated requirements
- [ ] Report any uncertainties
- [ ] Document all changes

---

## 📜 ACKNOWLEDGMENT

By working on this project, the AI agent confirms:

1. I have read and understood all constraints
2. I will not introduce unauthorized features
3. I will not fabricate school information
4. I will request approval when required
5. I will follow the documented specifications
6. I will clearly mark all placeholders
7. I will report uncertainties immediately
8. I will stay within defined scope boundaries

---

## 📞 ESCALATION

### When to Escalate to Human:

| Situation | Action |
|-----------|--------|
| Unclear requirements | ASK before assuming |
| New feature request from context | REQUEST APPROVAL |
| Security concern | STOP and REPORT |
| Conflicting instructions | REPORT and WAIT |
| Unable to complete task | EXPLAIN limitations |
| Need real school data | REQUEST from human |

---

*Document Version: 1.0*
*Created: January 2025*
*Status: ACTIVE - MUST BE FOLLOWED*

---

## QUICK REFERENCE CARD

```
╔══════════════════════════════════════════════════════════════╗
║  LOTUS KINDERGARTEN - AI AGENT QUICK RULES                   ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  ✅ DO:                                                      ║
║  • Follow PROJECT_DOCUMENTATION.md exactly                   ║
║  • Use [PLACEHOLDER] for unknown info                        ║
║  • Ask when unsure                                           ║
║  • Request approval for new features                         ║
║  • Stay within scope                                         ║
║                                                              ║
║  ❌ DON'T:                                                   ║
║  • Invent school info (phone, email, names)                  ║
║  • Add features not in docs                                  ║
║  • Add packages without approval                             ║
║  • Assume requirements                                       ║
║  • Modify security without approval                          ║
║                                                              ║
║  🎯 SCOPE:                                                   ║
║  • Programs: Pre-K, KG1, KG2 (ONLY)                          ║
║  • Roles: Admin, Teacher, Parent, Student (ONLY)             ║
║  • Games: 10 listed games (ONLY)                             ║
║                                                              ║
║  ⚠️ WHEN IN DOUBT:                                           ║
║  STOP → ASK → WAIT → PROCEED                                 ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```
