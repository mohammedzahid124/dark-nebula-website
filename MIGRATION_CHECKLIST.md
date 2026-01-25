# Migration Checklist: Old ChatBot → New State Machine ChatBot

## 📋 Pre-Migration

### Review Current State
- [ ] Read `CHATBOT_REFACTOR_SUMMARY.md`
- [ ] Read `CHATBOT_REFACTOR_GUIDE.md`
- [ ] Review new files in workspace
- [ ] Check Git status (`git status`)

### Backup Current Implementation
```bash
# Create backup branch
git checkout -b backup/chatbot-old

# Backup key files
cp app/components/ChatBot.tsx app/components/ChatBot.tsx.backup
cp hooks/useChat.ts hooks/useChat.ts.backup
cp app/api/chat/route.ts app/api/chat/route.ts.backup

# Return to main branch
git checkout main
```

---

## 🔄 Step 1: Update Component Imports (5 min)

### File: `app/page.tsx` or `app/layout.tsx`

**BEFORE:**
```typescript
import ChatBot from "@/app/components/ChatBot";
import Contact from "@/app/components/Contact";
```

**AFTER:**
```typescript
import ChatBot from "@/app/components/ChatBotRefactored";
import Contact from "@/app/components/ContactAutofill";
```

**Verification:**
- [ ] File saves without errors
- [ ] No import errors in IDE

---

## 🔄 Step 2: Update Chat API Route (5 min)

### File: `app/api/chat/route.ts`

**Option A: Complete Replacement (Recommended)**
```bash
# Backup current
cp app/api/chat/route.ts app/api/chat/route.ts.backup

# Use new version
cp app/api/chat/route-refactored.ts app/api/chat/route.ts

# Update imports if needed
```

**Option B: Manual Merge (If you have custom logic)**
1. Keep your `app/api/chat/route.ts`
2. Update just the system prompt and history trimming
3. Add state machine context handling

**Verification:**
- [ ] No TypeScript errors
- [ ] API returns 200 on GET
- [ ] API returns 200 on valid POST

---

## ✅ Step 3: Test Local Development (15 min)

### Start Development Server
```bash
npm run dev
# Wait for "compiled successfully"
```

### Test Conversation Flow

**Step 1: Chat Opens**
- [ ] Click floating chat button
- [ ] Greeting message appears
- [ ] Progress bar shows "Step 1 of 6: Getting Started"

**Step 2: Name Entry**
- [ ] Type: "Hi, my name is John"
- [ ] Bot extracts "John" automatically
- [ ] Progress advances to "Step 2 of 6: Your Name"
- [ ] Bot asks for email

**Step 3: Email Entry**
- [ ] Type: "john@example.com"
- [ ] Bot recognizes email
- [ ] Advances to "Step 3 of 6: Your Email"
- [ ] Bot asks for phone

**Step 4: Phone Entry**
- [ ] Type: "+1 (555) 123-4567"
- [ ] Bot recognizes phone
- [ ] Advances to "Step 4 of 6: Your Phone"
- [ ] Bot asks for project type

**Step 5: Project Type Entry**
- [ ] Type: "I want to build a web application"
- [ ] Bot detects "web app"
- [ ] Advances to "Step 5 of 6: Your Project"
- [ ] Bot shows summary button

**Step 6: Summary**
- [ ] Summary displays all collected data
- [ ] Shows: Name, Email, Phone, Project Type
- [ ] "Continue to Contact Form" button visible

**Step 7: Contact Form Auto-Fill**
- [ ] Click button
- [ ] URL shows: `?name=John&email=john@example.com&phone=...`
- [ ] Contact form fields pre-populated
- [ ] "Pre-filled" notification shows

**Step 8: Form Submission**
- [ ] Fill any missing required fields
- [ ] Click "Send Message"
- [ ] Network tab shows POST to `/api/lead`
- [ ] Returns 201 status
- [ ] Success message appears

### Verify No Errors
- [ ] Open browser console (F12)
- [ ] No red errors
- [ ] No red network requests
- [ ] Chat works on refresh (LocalStorage)

---

## 🔍 Step 4: Verify Type Safety (5 min)

### Check TypeScript Compilation
```bash
# In terminal
npm run type-check
# or
npx tsc --noEmit
```

**Verification:**
- [ ] No TypeScript errors
- [ ] All types resolve correctly
- [ ] IDE shows no red squiggles

---

## 🧪 Step 5: Manual Testing Scenarios (20 min)

### Scenario 1: Normal Happy Path
```
Start Chat
→ Type "Hi"
→ Type "John Doe"
→ Type "john@example.com"
→ Type "5551234567"
→ Type "portfolio"
→ See Summary
→ Click Contact
→ Form auto-filled
→ Submit form
```

**Expected Result:** ✅ All data captured, form auto-filled, success message

### Scenario 2: Invalid Input Handling
```
Start Chat
→ Type "Test" (for name - too short)
→ Expect: Error message, stay on same stage
→ Type "Valid Name" (valid now)
→ Progress continues
```

**Expected Result:** ✅ Validation works, shows friendly errors

### Scenario 3: Duplicate Message Prevention
```
Chat with Bot
→ See response
→ Type exact same message again
→ Bot should give NEW response or indicate already answered
```

**Expected Result:** ✅ No identical responses

### Scenario 4: Page Refresh (LocalStorage)
```
Start Chat
→ Get to "Step 3 of 6"
→ Refresh page (F5)
→ Chat should resume at Step 3 with collected data
```

**Expected Result:** ✅ Data persisted in LocalStorage

### Scenario 5: Mobile Responsive
```
Open on mobile or DevTools mobile mode
→ Chat should fit screen
→ Input should be usable
→ Progress bar visible
→ No horizontal scroll
```

**Expected Result:** ✅ Fully responsive

---

## 🔧 Step 6: Configuration Adjustments (10 min)

### Optional: Customize Conversation Flow

Edit `hooks/useChatStateMachine.ts`:
```typescript
const getNextQuestion = useCallback((stage: ChatStage): string => {
  const questions: Record<ChatStage, string> = {
    [ChatStage.GREETING]: "Your custom greeting message here...",
    [ChatStage.ASK_NAME]: "Your custom name prompt...",
    // ... customize all stages
  };
  return questions[stage] || "";
}, []);
```

### Optional: Customize System Prompt

Edit `app/api/chat/route-refactored.ts`:
```typescript
const SALES_ASSISTANT_SYSTEM_PROMPT = `
  // Your custom system prompt here
  // This guides the AI bot behavior
`;
```

### Optional: Adjust Validation Rules

Edit `lib/lead-validation.ts`:
```typescript
// Change minimum phone digits
if (digits.length < 12) { // Was 10
  return { isValid: false, error: "Please enter a valid phone" };
}

// Add more purpose keywords
const purposeMap: Record<string, string[]> = {
  portfolio: ["portfolio", "personal", "showcase", "resume"],
  // Add more types here
};
```

---

## 🚀 Step 7: Deploy to Staging (10 min)

### Prepare for Staging
```bash
# Commit changes
git add .
git commit -m "feat: deploy refactored chatbot with state machine"

# Push to staging branch
git push origin feature/chatbot-refactor
```

### Deploy (via your deployment platform)

**Verification on Staging:**
- [ ] Chat works on staging URL
- [ ] No console errors
- [ ] API requests successful
- [ ] Form auto-fill works
- [ ] Complete end-to-end flow

---

## ✨ Step 8: Production Deployment (5 min)

### Merge to Main
```bash
# Create pull request (if using GitHub)
# Request review from team
# Merge after approval

# Or directly:
git checkout main
git pull
git checkout feature/chatbot-refactor
git rebase main
git checkout main
git merge feature/chatbot-refactor
git push origin main
```

### Deploy to Production
```bash
# Via your CD/CI pipeline
# Monitor logs for errors
```

### Post-Deployment Checks
- [ ] Chat works on production
- [ ] No errors in monitoring/Sentry
- [ ] API responses in dashboard
- [ ] Monitor lead submissions
- [ ] Check email for notifications (if enabled)

---

## 📊 Step 9: Monitor & Measure (Ongoing)

### Key Metrics to Track

```
CONVERSATION METRICS:
- Total chats started
- Completion rate (% reaching summary)
- Average messages per chat
- Average time in chat

LEAD METRICS:
- Leads captured
- Data validity (% with email + phone)
- Form submission rate
- Lead quality (% converted to customer)

TECHNICAL METRICS:
- API response time
- Error rate (500s)
- Chat load time
- Form submission time
```

### Tools to Set Up
- [ ] Google Analytics event tracking
- [ ] Sentry for error monitoring
- [ ] DataDog/NewRelic for performance
- [ ] Mixpanel or custom dashboard for lead metrics

### Example Analytics Events
```typescript
// In ChatBot component
trackEvent("chat_opened", { timestamp });
trackEvent("stage_completed", { stage, duration });
trackEvent("form_auto_filled", { dataFields });
trackEvent("form_submitted", { leadId });
```

---

## 🎯 Step 10: Optimize & Iterate (Weekly)

### Review Metrics
- [ ] Check lead capture rate
- [ ] Identify drop-off points
- [ ] Review user feedback
- [ ] Look for common errors

### Common Optimizations
1. **Improve message clarity** - Make prompts more conversational
2. **Add more keywords** - Better purpose detection
3. **Adjust pricing** - Update pricing tiers
4. **Add FAQ section** - Reduce repetitive questions
5. **A/B test prompts** - Test different system prompts

---

## ❌ Rollback Plan (If Issues Arise)

### Quick Rollback
```bash
# Revert to old chatbot
git revert <commit-hash>
git push origin main

# Or use backup files
cp app/components/ChatBot.tsx.backup app/components/ChatBot.tsx
cp hooks/useChat.ts.backup hooks/useChat.ts
cp app/api/chat/route.ts.backup app/api/chat/route.ts

# Restart server
npm run dev
```

### Keep Old Files
- [ ] Don't delete `app/components/ChatBot.tsx`
- [ ] Don't delete `hooks/useChat.ts` (old version)
- [ ] Keep backup of old API route
- [ ] Maintain Git history for easy revert

---

## 📋 Pre-Launch Checklist

### Code Quality
- [ ] All TypeScript checks pass
- [ ] No ESLint warnings
- [ ] Code reviewed by team member
- [ ] Tests pass (if applicable)

### Functionality
- [ ] Chat flow works end-to-end
- [ ] Form auto-fill works
- [ ] API endpoints respond
- [ ] No console errors
- [ ] Responsive on mobile

### Documentation
- [ ] README updated
- [ ] Inline comments clear
- [ ] Configuration documented
- [ ] Known issues documented

### Monitoring
- [ ] Error tracking enabled
- [ ] Analytics setup
- [ ] Performance monitoring
- [ ] Alerts configured

### Backup
- [ ] Old files backed up
- [ ] Database backed up (if applicable)
- [ ] Rollback plan documented

---

## ✅ Final Sign-Off

### Pre-Launch
- [ ] All steps completed
- [ ] No blockers remaining
- [ ] Team approval obtained
- [ ] Customer notified (if needed)

### Post-Launch (24 hours)
- [ ] No critical errors
- [ ] Leads being captured
- [ ] Form working
- [ ] Team monitoring

### Post-Launch (1 week)
- [ ] Metrics looking good
- [ ] No regressions
- [ ] User feedback positive
- [ ] Optimization ideas noted

---

## 📞 Support & Troubleshooting

### Common Issues

**Chat doesn't load:**
```
Check: browser console for errors
Fix: Clear cache (Cmd+Shift+R or Ctrl+Shift+R)
     Ensure API key in .env.local
     Check API response in Network tab
```

**Form doesn't auto-fill:**
```
Check: URL has parameters (?name=...&email=...)
Fix: Verify ContactAutofill component reads useSearchParams
     Check router.push is called with correct URL
     Test URL manually: /contact?name=test&email=test@ex.com
```

**Stage not progressing:**
```
Check: Browser console for validation errors
Fix: Verify data format matches validation rules
     Check leadData in React DevTools
     Ensure processUserMessage is called
```

**API errors:**
```
Check: Network tab → /api/lead or /api/chat
Fix: Verify .env.local has OPENAI_API_KEY
     Check request body format
     Ensure API route file exists
```

---

## 🎓 Learning Resources

- `CHATBOT_REFACTOR_GUIDE.md` - Detailed implementation guide
- `CHATBOT_REFACTOR_SUMMARY.md` - Feature summary
- Inline code comments - Explanation of each component
- Original `hooks/useChat.ts` - Old implementation reference

---

**Status:** Ready for migration
**Estimated Total Time:** 60-90 minutes
**Risk Level:** Low (with proper testing)
**Rollback Risk:** Very Low (easy to revert)

Good luck with the migration! 🚀
