# Dark Nebula Chatbot - Implementation Checklist

Complete checklist for implementing and deploying the AI Chatbot system.

## Phase 1: Setup (30 minutes)

### Environment & Dependencies
- [ ] Clone repository: `git clone ...`
- [ ] Install dependencies: `npm install`
- [ ] Create `.env.local` from `.env.local.example`
- [ ] Obtain OpenAI API key from platform.openai.com
- [ ] Add API key to `.env.local`
- [ ] Verify Node version: `node --version` (18+)

### Verification
- [ ] Run build: `npm run build` (no errors)
- [ ] Run dev server: `npm run dev`
- [ ] Open http://localhost:3000 (loads without errors)
- [ ] Check browser console (no errors/warnings)

## Phase 2: Testing (1-2 hours)

### Manual Testing - Widget
- [ ] Floating chat button visible in bottom-right
- [ ] Green online indicator showing
- [ ] Click button opens chat window
- [ ] Chat window shows greeting message
- [ ] Chat window closes when clicking X button
- [ ] Window opens smoothly with fade animation

### Manual Testing - Messaging
- [ ] Type message in input field
- [ ] Message appears with user styling (right-aligned)
- [ ] Typing indicator shows "Thinking..." with spinner
- [ ] Bot responds with a message within 2-3 seconds
- [ ] Message auto-scrolls into view
- [ ] Input field clears after sending
- [ ] Can send multiple messages
- [ ] Conversation history is maintained

### Manual Testing - Context Extraction
- [ ] Send: "I need a website for ₹50,000"
  - [ ] Bot identifies "web_development" project type
  - [ ] Bot identifies "50k-100k" budget
- [ ] Send: "Email me at test@example.com"
  - [ ] Email is extracted and stored
- [ ] Send: "Call me at 9876543210"
  - [ ] Phone number is extracted
- [ ] Send: "Timeline is 3 months"
  - [ ] Timeline "3 months" is detected

### Manual Testing - Pricing Estimates
- [ ] Send: "How much does a portfolio cost?"
  - [ ] Bot responds: "...₹10k to ₹25k..."
- [ ] Send: "What's the cost of an AI dashboard?"
  - [ ] Bot responds: "...₹30k to ₹75k..."
- [ ] Send: "Mobile app pricing?"
  - [ ] Bot responds: "...₹50k to ₹300k..."

### Manual Testing - Quick Actions
- [ ] Greeting visible on first open
- [ ] 3 quick action buttons visible: "Web Dev", "AI/Data", "Pricing"
- [ ] Click "💻 Web Dev" button
  - [ ] Message "I need a website" is sent
  - [ ] Quick actions disappear
  - [ ] Bot responds appropriately
- [ ] Send first message and quick actions disappear

### Manual Testing - Controls
- [ ] Click "Clear" button
  - [ ] Confirmation dialog appears
  - [ ] Chat clears completely
  - [ ] Greeting message reappears
  - [ ] Quick actions appear again
- [ ] Click "Talk to Team" button
  - [ ] Page scrolls to Contact section
  - [ ] Chat window closes
- [ ] Verify "Contact" section is accessible

### Manual Testing - Error Handling
- [ ] Send empty message (nothing happens)
- [ ] Try disconnecting internet, send message
  - [ ] Fallback response appears (no API error)
  - [ ] Error message is user-friendly
- [ ] Reconnect internet and verify normal operation

### API Testing
- [ ] Test health endpoint:
  ```bash
  curl http://localhost:3000/api/health
  ```
  - [ ] Returns status: "ok"
  - [ ] Returns status code: 200

- [ ] Test simple message:
  ```bash
  curl -X POST http://localhost:3000/api/chat \
    -H "Content-Type: application/json" \
    -d '{"message": "Hello", "conversationHistory": [], "context": {}}'
  ```
  - [ ] Returns reply
  - [ ] Returns context object
  - [ ] Status code: 200

- [ ] Test pricing query:
  ```bash
  curl -X POST http://localhost:3000/api/chat \
    -H "Content-Type: application/json" \
    -d '{"message": "Website cost?", "conversationHistory": [], "context": {}}'
  ```
  - [ ] Response includes pricing estimate
  - [ ] Includes INR format (₹10k - ₹25k)

## Phase 3: Mobile Testing (30 minutes)

### Responsive Design
- [ ] Open DevTools Device Toolbar (Ctrl+Shift+M)
- [ ] Test iPhone SE (375px width)
  - [ ] Chat window fits on screen
  - [ ] No horizontal scroll
  - [ ] Input field is visible
- [ ] Test iPhone 14 Pro Max (430px)
  - [ ] Chat window is proportional
  - [ ] All buttons accessible
- [ ] Test Android (412px)
  - [ ] Chat works properly
  - [ ] Touch is responsive

### Touch Interaction
- [ ] On mobile device, tap chat button
  - [ ] Opens smoothly
  - [ ] Visual feedback on tap
- [ ] Tap input field
  - [ ] Virtual keyboard appears
  - [ ] Input field not covered by keyboard
- [ ] Type and send message
  - [ ] Message appears correctly
  - [ ] Can scroll message history
- [ ] Tap quick action buttons
  - [ ] Buttons are easy to tap (44px+)
  - [ ] Messages send correctly

## Phase 4: Performance (30 minutes)

### Lighthouse Score
- [ ] Run Lighthouse (right-click > Inspect > Lighthouse)
  - [ ] Performance: 80+
  - [ ] Accessibility: 90+
  - [ ] Best Practices: 90+
  - [ ] SEO: 90+

### Bundle Size
- [ ] Check build output: `npm run build`
  - [ ] Total size < 5MB
  - [ ] No large unused dependencies

### API Response Time
- [ ] With OpenAI API: < 2 seconds (most responses)
- [ ] With fallback: < 500ms
- [ ] No timeout errors

### Memory Usage
- [ ] Open DevTools Memory tab
- [ ] Send 20+ messages
- [ ] Check memory doesn't grow excessively (no leak)
- [ ] Close and reopen chat
- [ ] Memory is released properly

## Phase 5: Accessibility (30 minutes)

### Keyboard Navigation
- [ ] Press Tab key
  - [ ] Focus moves to chat button
  - [ ] Focus moves to input field
  - [ ] Focus moves to Send button
  - [ ] Focus moves to Clear button
  - [ ] Focus moves to Contact button
- [ ] Press Enter in input field
  - [ ] Message is sent
- [ ] Press Escape (if implemented)
  - [ ] Chat closes (optional)

### Screen Reader Testing
- [ ] Use browser accessibility checker (e.g., axe)
  - [ ] No violations found
  - [ ] All buttons have labels
  - [ ] Messages have context
- [ ] Test with screen reader:
  - [ ] Chat button is announced
  - [ ] Chat window purpose is clear
  - [ ] Messages are read in order

### Color Contrast
- [ ] Use color contrast checker
  - [ ] Text on gradients: 4.5:1+ ratio
  - [ ] Input text on background: 4.5:1+
  - [ ] All text is readable

## Phase 6: Security (30 minutes)

### Code Security
- [ ] Verify API key is NOT in code
  - [ ] Check app/api/chat/route.ts (no hardcoded key)
  - [ ] Check environment only: process.env.OPENAI_API_KEY
- [ ] Verify `.env.local` is in `.gitignore`
- [ ] Check no secrets in commits:
  ```bash
  git log --all --full-history --oneline | grep -i secret
  ```

### Input Validation
- [ ] Try XSS injection: `<img src=x onerror='alert(1)'>`
  - [ ] Message displays as text, not executed
  - [ ] No alert dialog appears
- [ ] Try SQL injection: `'; DROP TABLE users; --`
  - [ ] Treated as plain text
  - [ ] No database errors

### CORS & Network
- [ ] Check requests in DevTools Network tab
  - [ ] API calls go to own domain (localhost:3000/api/chat)
  - [ ] No cross-origin issues
  - [ ] Content-Type headers correct

## Phase 7: Documentation Review (15 minutes)

### Check Documentation Files
- [ ] [CHATBOT_README.md](./CHATBOT_README.md)
  - [ ] Features are accurate
  - [ ] Quick start is correct
  - [ ] Usage examples work
- [ ] [CHATBOT_SETUP.md](./CHATBOT_SETUP.md)
  - [ ] Setup instructions are clear
  - [ ] Customization examples work
  - [ ] Pricing database is documented
- [ ] [TESTING_GUIDE.md](./TESTING_GUIDE.md)
  - [ ] Test procedures match implementation
  - [ ] API examples are correct
  - [ ] Expected results are accurate
- [ ] [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
  - [ ] Vercel instructions are current
  - [ ] Self-hosted options are documented
  - [ ] Monitoring setup is clear
- [ ] [.env.local.example](./.env.local.example)
  - [ ] All required variables listed
  - [ ] Comments are helpful
  - [ ] No example API keys exposed

## Phase 8: Code Quality (30 minutes)

### TypeScript
- [ ] Run type check: `npm run type-check`
  - [ ] No type errors
  - [ ] No warnings
- [ ] Check interfaces in `types/chat.ts`
  - [ ] All types are used
  - [ ] No unused types

### Linting
- [ ] Run linter: `npm run lint`
  - [ ] No errors
  - [ ] No warnings
  - [ ] Code style is consistent

### Build
- [ ] Run build: `npm run build`
  - [ ] No errors
  - [ ] No warnings
  - [ ] Output is optimized

## Phase 9: Integration (30 minutes)

### Layout Integration
- [ ] Check `app/layout.tsx`
  - [ ] ChatBot is imported
  - [ ] ChatBot component is placed in JSX
  - [ ] ChatBot appears on all pages
- [ ] Navigation with chat open
  - [ ] Chat widget remains on screen
  - [ ] Can interact with nav and chat
  - [ ] Page transitions work smoothly

### Contact Section Integration
- [ ] Check Contact section exists
  - [ ] Has id="contact"
  - [ ] Is scrollable
- [ ] Click "Talk to Our Team" button
  - [ ] Smooth scroll to contact
  - [ ] Chat closes
  - [ ] Contact form is visible

## Phase 10: Pre-Production Preparation (1 hour)

### Environment Files
- [ ] Production API key obtained from OpenAI
- [ ] Create `.env.production` (or use deployment platform secrets)
- [ ] All required variables configured
- [ ] Test with production API key locally

### Database (if using conversation persistence)
- [ ] Database created (if applicable)
- [ ] Connection string configured
- [ ] Schema created (if applicable)
- [ ] Backup strategy in place

### Monitoring Setup
- [ ] Sentry account created (optional, for error tracking)
- [ ] Google Analytics configured (optional)
- [ ] Health check endpoint tested
- [ ] Logging is working

### Backups
- [ ] Code is committed to Git
- [ ] All configurations are documented
- [ ] Rollback procedure tested
- [ ] Previous version is tagged in Git

## Phase 11: Deployment (Variable time)

### Pre-Deployment Verification
- [ ] All previous phases completed
- [ ] All tests passing
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] No lint errors
- [ ] Performance is acceptable

### Choose Deployment Method

#### Option A: Vercel (Recommended)
- [ ] GitHub repository is public/accessible
- [ ] Connect Vercel to GitHub repo
- [ ] Configure environment variables in Vercel
- [ ] Trigger deployment
- [ ] Add custom domain (optional)
- [ ] Verify SSL certificate

#### Option B: Self-Hosted
- [ ] Server (VPS/EC2) is provisioned
- [ ] Node.js is installed
- [ ] Repository is cloned
- [ ] Environment variables are set
- [ ] Build is created: `npm run build`
- [ ] Process manager is configured (PM2/systemd)
- [ ] Reverse proxy is set up (Nginx)
- [ ] SSL certificate is installed

### Post-Deployment Verification
- [ ] Visit production URL
- [ ] Chat button appears
- [ ] Send test message
- [ ] API responds correctly
- [ ] Pricing estimates work
- [ ] Contact redirect works
- [ ] No errors in browser console
- [ ] Lighthouse score is acceptable
- [ ] Performance is acceptable

## Phase 12: Post-Launch (Ongoing)

### Monitoring
- [ ] Monitor error logs daily (Sentry/CloudWatch)
- [ ] Check performance metrics
- [ ] Review analytics for usage patterns
- [ ] Monitor API costs (OpenAI)
- [ ] Check uptime monitoring

### User Feedback
- [ ] Collect feedback from team
- [ ] Track user interactions
- [ ] Monitor conversation quality
- [ ] Identify improvement opportunities

### Maintenance
- [ ] Weekly: Check logs for errors
- [ ] Weekly: Review analytics
- [ ] Monthly: Update dependencies
- [ ] Monthly: Review API costs
- [ ] Quarterly: Full system review

### Improvements
- [ ] Refine system prompt based on feedback
- [ ] Adjust pricing if needed
- [ ] Add new quick action buttons
- [ ] Implement user-requested features
- [ ] Optimize based on analytics

## Troubleshooting Checklist

If something isn't working:

### Chat button not visible
- [ ] Check browser console (F12)
- [ ] Verify ChatBot is imported in layout.tsx
- [ ] Check z-index (should be z-50 or higher)
- [ ] Clear browser cache (Ctrl+Shift+Delete)
- [ ] Try different browser

### API not responding
- [ ] Verify API key is set: `echo $OPENAI_API_KEY`
- [ ] Test API directly: `curl http://localhost:3000/api/chat`
- [ ] Check server logs (terminal running dev server)
- [ ] Restart dev server: `npm run dev`
- [ ] Check OpenAI status: https://status.openai.com/

### Slow response times
- [ ] Check OpenAI API status
- [ ] Reduce conversation history length
- [ ] Check network tab in DevTools
- [ ] Try with fallback (disconnect API key)
- [ ] Check server resources

### Styling issues
- [ ] Check Tailwind CSS is loaded
- [ ] Verify CSS is applied (DevTools inspect)
- [ ] Check for CSS conflicts
- [ ] Try in different browser
- [ ] Clear browser cache

## Sign-Off Checklist

Project Manager: _______________  Date: ___________

- [ ] All phases completed
- [ ] All tests passing
- [ ] Documentation reviewed
- [ ] Security verified
- [ ] Performance acceptable
- [ ] Ready for production

Development Lead: _______________  Date: ___________

- [ ] Code quality approved
- [ ] Architecture reviewed
- [ ] No technical debt
- [ ] Maintainability confirmed

QA Lead: _______________  Date: ___________

- [ ] All test cases passed
- [ ] No critical bugs
- [ ] User experience validated
- [ ] Ready for user testing

## Next Steps

After sign-off:

1. **Deploy to production** (if not already)
2. **Announce feature** to team and users
3. **Monitor closely** for first week
4. **Collect feedback** from users
5. **Plan improvements** for next version
6. **Schedule review meeting** after 2 weeks

---

**Questions?** Refer to:
- [CHATBOT_README.md](./CHATBOT_README.md) - Overview
- [CHATBOT_SETUP.md](./CHATBOT_SETUP.md) - Setup & Customization
- [TESTING_GUIDE.md](./TESTING_GUIDE.md) - Testing Procedures
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Deployment

**Ready to deploy?** Follow the deployment steps in Phase 11 above.
