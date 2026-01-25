# ChatBot Testing Guide

Complete testing procedures for the Dark Nebula AI Chatbot system.

## Table of Contents

1. [Setup & Prerequisites](#setup--prerequisites)
2. [Unit Testing](#unit-testing)
3. [Integration Testing](#integration-testing)
4. [End-to-End Testing](#end-to-end-testing)
5. [Performance Testing](#performance-testing)
6. [Accessibility Testing](#accessibility-testing)
7. [Mobile Testing](#mobile-testing)
8. [Security Testing](#security-testing)
9. [Common Issues & Troubleshooting](#common-issues--troubleshooting)

---

## Setup & Prerequisites

### Required Tools
- Node.js 18+
- npm or yarn
- Modern web browser (Chrome, Firefox, Safari, Edge)
- API testing tool (cURL, Postman, Insomnia)
- Browser DevTools

### Environment Setup

```bash
# 1. Copy environment template
cp .env.local.example .env.local

# 2. Add your OpenAI API key
# Edit .env.local and add:
# OPENAI_API_KEY=sk_test_...

# 3. Install dependencies
npm install

# 4. Start dev server
npm run dev

# 5. Open in browser
# http://localhost:3000
```

### Verification Checklist
- [ ] Dev server running on port 3000
- [ ] No TypeScript compilation errors
- [ ] OpenAI API key configured
- [ ] Browser console shows no errors

---

## Unit Testing

### Test Utilities

Test helper functions in isolation using Node.js.

#### Test 1: formatPricing()

```bash
# Create test file
cat > test-utils.js << 'EOF'
const { formatPricing } = require('./lib/chatbot-utils.ts');

// Test cases
console.log('Test 1: formatPricing(10000, 25000)');
console.log('Expected: ₹10k - ₹25k');
console.log('Actual:', formatPricing(10000, 25000));
console.log('');

console.log('Test 2: formatPricing(100000, 300000)');
console.log('Expected: ₹1L - ₹3L');
console.log('Actual:', formatPricing(100000, 300000));
console.log('');

console.log('Test 3: formatPricing(500000, 1000000)');
console.log('Expected: ₹5L - ₹10L');
console.log('Actual:', formatPricing(500000, 1000000));
EOF

# Run test
node test-utils.js
```

**Expected Output:**
```
Test 1: formatPricing(10000, 25000)
Expected: ₹10k - ₹25k
Actual: ₹10k - ₹25k

Test 2: formatPricing(100000, 300000)
Expected: ₹1L - ₹3L
Actual: ₹1L - ₹3L

Test 3: formatPricing(500000, 1000000)
Expected: ₹5L - ₹10L
Actual: ₹5L - ₹10L
```

#### Test 2: extractEmail()

```bash
cat > test-email.js << 'EOF'
const { extractEmail } = require('./lib/chatbot-utils.ts');

const testCases = [
  { input: "My email is john@example.com", expected: "john@example.com" },
  { input: "Contact me at test.user+tag@company.co.uk", expected: "test.user+tag@company.co.uk" },
  { input: "I'll reach out to you soon", expected: null },
];

testCases.forEach((test, idx) => {
  const result = extractEmail(test.input);
  const pass = result === test.expected;
  console.log(`Test ${idx + 1}: ${pass ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`  Input: "${test.input}"`);
  console.log(`  Expected: ${test.expected}`);
  console.log(`  Got: ${result}`);
});
EOF

node test-email.js
```

**Expected Output:**
```
Test 1: ✅ PASS
  Input: "My email is john@example.com"
  Expected: john@example.com
  Got: john@example.com

Test 2: ✅ PASS
  Input: "Contact me at test.user+tag@company.co.uk"
  Expected: test.user+tag@company.co.uk
  Got: test.user+tag@company.co.uk

Test 3: ✅ PASS
  Input: "I'll reach out to you soon"
  Expected: null
  Got: null
```

#### Test 3: detectProjectType()

```bash
cat > test-project-type.js << 'EOF'
const { detectProjectType } = require('./lib/chatbot-utils.ts');

const testCases = [
  { input: "I need a website for my portfolio", expected: "web_development" },
  { input: "Looking for an AI chatbot solution", expected: "ai_data" },
  { input: "Need a mobile app for iOS and Android", expected: "mobile" },
  { input: "CI/CD pipeline setup please", expected: "devops" },
];

testCases.forEach((test, idx) => {
  const result = detectProjectType(test.input);
  const pass = result === test.expected;
  console.log(`Test ${idx + 1}: ${pass ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`  Input: "${test.input}"`);
  console.log(`  Expected: ${test.expected}`);
  console.log(`  Got: ${result}`);
});
EOF

node test-project-type.js
```

**Expected Output:**
```
Test 1: ✅ PASS
Test 2: ✅ PASS
Test 3: ✅ PASS
Test 4: ✅ PASS
```

---

## Integration Testing

### Test 1: API Endpoint - Health Check

Test the GET endpoint for server health.

```bash
# Using cURL
curl -X GET http://localhost:3000/api/chat

# Expected Response (200 OK)
# {"status": "ok", "timestamp": "2024-..."}
```

**Success Criteria:**
- ✅ Returns status 200
- ✅ Response contains "status": "ok"
- ✅ Response includes timestamp

### Test 2: API Endpoint - Simple Message

Send a basic message to the API.

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hello",
    "conversationHistory": [],
    "context": {}
  }'

# Expected Response (200 OK)
{
  "reply": "Hey there! Welcome to Dark Nebula...",
  "context": {},
  "timestamp": "2024-..."
}
```

**Success Criteria:**
- ✅ Returns status 200
- ✅ Reply field contains text
- ✅ Timestamp is included
- ✅ Context object is present

### Test 3: API Endpoint - Pricing Query

Test pricing estimate functionality.

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "How much does a website portfolio cost?",
    "conversationHistory": [
      {
        "id": "msg-1",
        "sender": "bot",
        "text": "Hey there!",
        "timestamp": "2024-01-01T00:00:00Z"
      }
    ],
    "context": {}
  }'

# Expected Response includes pricing estimate
{
  "reply": "A portfolio website typically ranges from ₹10k to ₹25k...",
  "context": {
    "projectType": "web_development"
  },
  "timestamp": "2024-..."
}
```

**Success Criteria:**
- ✅ Returns pricing range in INR format
- ✅ Correctly identifies project type
- ✅ Reply is professional and helpful
- ✅ Context is extracted

### Test 4: API Endpoint - Context Extraction

Test email and phone extraction.

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "My name is John and you can reach me at john@example.com or 9876543210",
    "conversationHistory": [],
    "context": {}
  }'

# Expected: Email and phone are extracted
{
  "reply": "...",
  "context": {
    "email": "john@example.com",
    "phone": "9876543210"
  },
  "timestamp": "2024-..."
}
```

**Success Criteria:**
- ✅ Email correctly extracted
- ✅ Phone number correctly extracted
- ✅ Context updated with contact info

### Test 5: API Endpoint - Error Handling

Test API error responses.

```bash
# Missing required field
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "conversationHistory": [],
    "context": {}
  }'

# Expected Response (400 Bad Request)
{
  "error": "Message is required"
}
```

**Success Criteria:**
- ✅ Returns status 400
- ✅ Error message is descriptive
- ✅ Response includes helpful feedback

---

## End-to-End Testing

### Test 1: Widget Visibility & Interaction

**Steps:**
1. Open http://localhost:3000 in browser
2. Scroll to bottom of page
3. Look for floating chat button in bottom-right corner

**Expected Results:**
- ✅ Chat button visible with gradient background
- ✅ Green online indicator showing
- ✅ Button has hover effect

**Test 2: Opening Chat Window**

**Steps:**
1. Click the floating chat button
2. Observe chat window appearance

**Expected Results:**
- ✅ Chat window slides up smoothly
- ✅ Greeting message appears: "Hey there! 👋..."
- ✅ Header shows "Dark Nebula AI" with online status
- ✅ Input field is ready for typing
- ✅ Quick action buttons are visible

**Test 3: Sending Message**

**Steps:**
1. Click on the message input field
2. Type: "How much does a website cost?"
3. Click Send button or press Enter
4. Wait for bot response

**Expected Results:**
- ✅ Message appears in chat with user styling
- ✅ Typing indicator appears (animated)
- ✅ Bot responds with pricing estimate
- ✅ Message auto-scrolls into view
- ✅ Input field clears

**Test 4: Quick Action Buttons**

**Steps:**
1. If chat has only greeting, quick action buttons appear
2. Click "💻 Web Dev" button
3. Observe message and bot response

**Expected Results:**
- ✅ Button click sends message: "I need a website"
- ✅ Message appears in chat
- ✅ Bot responds appropriately
- ✅ Quick action buttons disappear after first message

**Test 5: Clear Chat Button**

**Steps:**
1. Send a few messages
2. Click "Clear" button
3. Confirm in dialog

**Expected Results:**
- ✅ Confirmation dialog appears
- ✅ Chat clears completely
- ✅ Greeting message reappears
- ✅ Quick actions are visible again

**Test 6: Contact Redirect**

**Steps:**
1. Click "Talk to Team" button
2. Observe page behavior

**Expected Results:**
- ✅ Page smoothly scrolls to Contact section
- ✅ Chat window closes
- ✅ Contact form is visible

**Test 7: Context Persistence**

**Steps:**
1. Send message: "My email is test@example.com"
2. Send message: "I need an AI solution with 50k budget"
3. Check that context is captured
4. Continue conversation

**Expected Results:**
- ✅ Email is extracted and displayed in context
- ✅ Project type is identified (ai_data)
- ✅ Budget is captured
- ✅ Bot references previous context: "Great! For an AI solution..."

**Test 8: Error Handling**

**Steps:**
1. Disconnect internet (or use Dev Tools to disable API)
2. Send a message
3. Wait for response

**Expected Results:**
- ✅ Fallback response appears
- ✅ Error doesn't crash the app
- ✅ User can continue chatting
- ✅ User-friendly error message appears (if at all)

---

## Performance Testing

### Test 1: Message Loading Time

**Steps:**
1. Open DevTools Network tab
2. Send message to API
3. Observe response time

**Success Criteria:**
- ✅ API response time < 2 seconds (with OpenAI)
- ✅ API response time < 500ms (with fallback)
- ✅ No network errors

### Test 2: Chat Window Responsiveness

**Steps:**
1. Send 20+ messages
2. Observe chat behavior

**Success Criteria:**
- ✅ Scrolling is smooth
- ✅ Auto-scroll doesn't cause lag
- ✅ Input field remains responsive
- ✅ No memory leaks (check DevTools memory)

### Test 3: Bundle Size Impact

```bash
# Build for production
npm run build

# Check bundle size
du -sh .next/

# Expected: < 5MB increase from chatbot files
```

---

## Accessibility Testing

### Test 1: Keyboard Navigation

**Steps:**
1. Press Tab to navigate
2. Focus should move: Button → Input → Send → Clear → Contact
3. Press Enter in input to send
4. Press Escape to close chat (optional enhancement)

**Success Criteria:**
- ✅ All interactive elements are keyboard accessible
- ✅ Focus is visible
- ✅ Tab order is logical

### Test 2: Screen Reader Testing

Use accessibility checker extension or screen reader:

```bash
# Using axe DevTools
# 1. Install extension
# 2. Run scan on page with chat open
# 3. Check for violations
```

**Success Criteria:**
- ✅ Button labels are descriptive
- ✅ Chat window is properly labeled
- ✅ Messages have context
- ✅ No ARIA violations

### Test 3: Color Contrast

**Steps:**
1. Use Chrome DevTools Accessibility panel
2. Check text contrast ratios

**Success Criteria:**
- ✅ Text contrast ratio ≥ 4.5:1 (normal text)
- ✅ Text contrast ratio ≥ 3:1 (large text)

---

## Mobile Testing

### Test 1: Responsive Layout

**Steps:**
1. Open DevTools Device Toolbar (Ctrl+Shift+M)
2. Test on multiple screen sizes:
   - iPhone SE (375px)
   - iPhone 12 (390px)
   - iPhone 14 Pro Max (430px)
   - Android (412px)

**Success Criteria:**
- ✅ Chat window fits on screen (max-width enforced)
- ✅ Input field is usable
- ✅ Messages are readable
- ✅ No horizontal scroll

### Test 2: Touch Interaction

**Steps:**
1. On actual mobile device or DevTools device mode
2. Tap chat button
3. Tap input field
4. Type message (virtual keyboard)
5. Tap Send button
6. Scroll messages

**Success Criteria:**
- ✅ Touch targets are ≥ 44x44px
- ✅ Virtual keyboard doesn't cover input
- ✅ Messages scroll smoothly
- ✅ Typing is comfortable

### Test 3: Mobile Performance

**Steps:**
1. Open DevTools Performance tab
2. Throttle to "Slow 3G"
3. Send message and observe loading

**Success Criteria:**
- ✅ Loading indicator appears
- ✅ Message sends within 5 seconds
- ✅ UI doesn't freeze
- ✅ No content shift

---

## Security Testing

### Test 1: Input Validation

```javascript
// Attempt to send malicious input
const xssAttempt = "<img src=x onerror='alert(1)'>";
// This should be escaped in display

const sqlInjection = "'; DROP TABLE users; --";
// This should be treated as plain text
```

**Success Criteria:**
- ✅ No script execution
- ✅ HTML is escaped in display
- ✅ Backend validates input

### Test 2: API Key Security

**Checklist:**
- ✅ API key is in .env.local (not in code)
- ✅ .env.local is in .gitignore
- ✅ API key never sent to client
- ✅ API calls made server-side only

### Test 3: HTTPS & Data Privacy

**For Production:**
- ✅ All API calls use HTTPS
- ✅ No sensitive data in URLs
- ✅ Cookies have secure flag
- ✅ Privacy policy is present

---

## Common Issues & Troubleshooting

### Issue 1: Chat button not appearing

**Possible Causes:**
1. z-index conflict
2. JavaScript error
3. Component not imported

**Solutions:**
```bash
# Check browser console for errors
# Open DevTools > Console

# Verify component is imported in layout.tsx
grep -n "ChatBot" app/layout.tsx

# Check z-index in CSS (should be z-50 or higher)
grep -n "z-" app/components/ChatBot.tsx
```

### Issue 2: API calls failing

**Possible Causes:**
1. API key not set
2. Network issue
3. CORS error (shouldn't happen with Next.js)

**Solutions:**
```bash
# Verify API key is set
echo $OPENAI_API_KEY

# Test API directly
curl -X GET http://localhost:3000/api/chat

# Check server logs for errors
# Look at terminal where npm run dev is running
```

### Issue 3: Messages not sending

**Possible Causes:**
1. Input validation failing
2. State management issue
3. API error not caught

**Solutions:**
```javascript
// Open DevTools > Network tab
// Send a message
// Check request/response in Network tab
// Look at:
// - Request body
// - Response status
// - Response body
```

### Issue 4: Styling issues

**Possible Causes:**
1. Tailwind CSS not loaded
2. CSS conflict with site theme
3. Dark mode styling

**Solutions:**
```bash
# Check Tailwind is configured
grep -n "tailwindcss" package.json

# Check CSS is applied
# Open DevTools > Elements > right-click chat button > Inspect
# Look at Computed styles
```

### Issue 5: Performance issues

**Possible Causes:**
1. Large conversation history
2. Frequent re-renders
3. Memory leak in cleanup

**Solutions:**
```javascript
// Open DevTools > Performance tab
// Record while chatting
// Look for long tasks or jank
// Check React DevTools for re-render count
```

---

## Test Results Checklist

After running all tests, use this checklist to confirm all features work:

### Functionality
- [ ] Chat button appears and is clickable
- [ ] Chat window opens/closes smoothly
- [ ] Messages send successfully
- [ ] Bot responds with appropriate messages
- [ ] Pricing estimates are accurate
- [ ] Context is captured (email, phone, project type, budget, timeline)
- [ ] Quick action buttons work
- [ ] Clear chat button works and asks for confirmation
- [ ] Contact redirect button scrolls to contact section
- [ ] Fallback responses work when API is unavailable

### User Experience
- [ ] Typing animation is smooth
- [ ] Loading indicator is visible
- [ ] Auto-scroll works for new messages
- [ ] Chat window doesn't block content
- [ ] Error messages are helpful
- [ ] No visual bugs or glitches

### Performance
- [ ] API response time < 2 seconds
- [ ] Chat is responsive even with many messages
- [ ] No memory leaks after long usage
- [ ] Bundle size impact is minimal

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader friendly
- [ ] Color contrast is sufficient
- [ ] Touch targets are large enough

### Mobile
- [ ] Responsive on all screen sizes
- [ ] Touch interactions work
- [ ] Performance is acceptable on 3G

### Security
- [ ] No XSS vulnerabilities
- [ ] API key is secure
- [ ] Input is properly validated
- [ ] Data is transmitted securely (HTTPS in production)

---

## Next Steps

After testing:

1. **Fix any issues** found during testing
2. **Optimize performance** if needed
3. **Deploy to staging** environment
4. **Run production tests** before launch
5. **Monitor analytics** to track usage and issues
6. **Gather user feedback** and iterate

For questions or issues, refer to `CHATBOT_SETUP.md` for detailed documentation.
