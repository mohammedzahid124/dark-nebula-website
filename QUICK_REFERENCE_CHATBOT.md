# Quick Reference: New Chatbot Files & Usage

## 📁 New Files Created

```
types/
  └── lead.ts                                    (Type definitions)

lib/
  └── lead-validation.ts                         (Validators & extractors)

hooks/
  └── useChatStateMachine.ts                     (State machine logic)

app/components/
  ├── ChatBotRefactored.tsx                      (Main UI component)
  └── ContactAutofill.tsx                        (Contact form with auto-fill)

app/api/
  ├── lead/
  │   └── route.ts                               (Lead persistence endpoint)
  └── chat/
      └── route-refactored.ts                    (Improved chat API)

docs/
  ├── CHATBOT_REFACTOR_SUMMARY.md               (Feature overview)
  ├── CHATBOT_REFACTOR_GUIDE.md                 (Detailed integration guide)
  └── MIGRATION_CHECKLIST.md                    (Step-by-step migration)
```

---

## 🎯 Core Imports Reference

### Using State Machine Hook
```typescript
import { useChatStateMachine, useInputDebounce } from "@/hooks/useChatStateMachine";
import { ChatStage, type LeadData } from "@/types/lead";

const MyComponent = () => {
  const {
    messages,              // Array of ChatMessage
    leadData,              // Captured lead data { name, email, phone, purpose }
    currentStage,          // Current ChatStage
    isLoading,             // Boolean - API loading
    processUserMessage,    // Function to process input
    progressPercentage,    // 0-100
    currentStep,           // "Step 2 of 6: Your Email"
  } = useChatStateMachine();

  return <div>{/* Your component */}</div>;
};
```

### Using Validation
```typescript
import {
  validateEmail,
  validatePhone,
  validateName,
  extractLeadData,
  getPricingForPurpose,
} from "@/lib/lead-validation";

const email = "user@example.com";
const result = validateEmail(email);
// { isValid: true, error?: undefined }

const extracted = extractLeadData("Hi, I'm John, john@ex.com");
// { name: "John", email: "john@ex.com" }

const pricing = getPricingForPurpose("portfolio");
// { min: 15000, max: 25000 }
```

### Using Components
```typescript
import ChatBot from "@/app/components/ChatBotRefactored";
import Contact from "@/app/components/ContactAutofill";

export default function Page() {
  return (
    <>
      <Contact />
      <ChatBot />
    </>
  );
}
```

---

## 🔄 State Machine Flow

```
ChatStage.GREETING
    ↓ User: "Hi"
    ↓ Extract: (nothing yet)
    ↓ Bot: "What's your name?"
    ↓
ChatStage.ASK_NAME
    ↓ User: "I'm John Doe"
    ↓ Extract: { name: "John Doe" }
    ↓ Validate: ✅ 2+ chars
    ↓
ChatStage.ASK_EMAIL
    ↓ User: "john@example.com"
    ↓ Extract: { email: "john@example.com" }
    ↓ Validate: ✅ Valid format
    ↓
ChatStage.ASK_PHONE
    ↓ User: "555-123-4567"
    ↓ Extract: { phone: "5551234567" }
    ↓ Validate: ✅ 10+ digits
    ↓
ChatStage.ASK_PURPOSE
    ↓ User: "I need a web app"
    ↓ Extract: { purpose: "webapp" }
    ↓ Validate: ✅ Keyword match
    ↓
ChatStage.SUMMARY
    ↓ Show: All data collected
    ↓ CTA: "Continue to Contact Form"
    ↓
ChatStage.COMPLETE
    ↓ Success: Redirect with URL params
    ↓ End: Show thank you message
```

---

## 🧪 Testing Quick Commands

### Test in Browser Console
```javascript
// Check localStorage
localStorage.getItem("dark_nebula_lead")

// Check session storage
sessionStorage.getItem("dark_nebula_lead_messages")

// Clear chat state
localStorage.removeItem("dark_nebula_lead")

// Simulate API call
fetch("/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    message: "Hi there",
    conversationHistory: [],
    leadData: {},
    currentStage: "GREETING"
  })
}).then(r => r.json()).then(console.log)

// Check URL parameters
new URLSearchParams(window.location.search).get("email")
```

### Test Contact Form Auto-Fill
```javascript
// Navigate to contact with params
window.location.href = "/contact?name=John&email=john@ex.com&phone=5551234567&purpose=webapp"

// Check form fields
document.querySelector('input[name="name"]').value  // Should be "John"
document.querySelector('input[name="email"]').value // Should be "john@ex.com"
```

---

## 📊 Configuration Quick Edit

### Change Conversation Greeting
**File:** `hooks/useChatStateMachine.ts`
```typescript
const greetingText = "Hey there! 👋 I'm Dark Nebula's virtual consultant. ...";
// Edit this line
```

### Change System Prompt
**File:** `app/api/chat/route-refactored.ts`
```typescript
const SALES_ASSISTANT_SYSTEM_PROMPT = `
  // Edit this entire prompt
`;
```

### Change Validation Rules
**File:** `lib/lead-validation.ts`
```typescript
// Edit phone minimum
if (digits.length < 10) { ... }  // Change 10 to your requirement

// Edit email regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Update pattern

// Edit pricing
const pricingMap = {
  portfolio: { min: 15000, max: 25000 },  // Update values
};
```

### Change Stages
**File:** `types/lead.ts`
```typescript
export enum ChatStage {
  GREETING = "GREETING",           // ← Edit stages here
  ASK_NAME = "ASK_NAME",
  // ... etc
}
```

---

## 🔌 Environment Variables

### Required
```bash
# .env.local
OPENAI_API_KEY=sk_test_...  # For AI responses
```

### Optional
```bash
# Future features
DATABASE_URL=postgresql://...   # For lead persistence
SLACK_WEBHOOK_URL=https://...  # For lead notifications
```

---

## 📈 Analytics Integration Example

```typescript
// Add to ChatBotRefactored.tsx
import { useAnalytics } from "@/hooks/useAnalytics";

export default function ChatBot() {
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    trackEvent("chat_opened", {
      timestamp: new Date().toISOString(),
      source: document.referrer || "direct"
    });
  }, [isOpen]);

  const sendMessage = async (e: React.FormEvent) => {
    // ... existing code
    trackEvent("message_sent", {
      stage: currentStage,
      messageLength: inputValue.length
    });
  };
}
```

---

## 🐛 Common Debug Commands

### Check Current Lead Data
```typescript
// In Component
console.log("Current Lead:", leadData);
console.log("Current Stage:", currentStage);
console.log("Messages:", messages);
```

### Log on Message Send
```typescript
const processUserMessage = async (msg: string) => {
  console.log("📤 User:", msg);
  console.log("   Extracted:", extractLeadData(msg));
  console.log("   Stage:", currentStage);
  // ... rest of function
};
```

### Monitor API Calls
```
Network Tab → Filter: "chat" or "lead"
→ Check Request body matches expected format
→ Check Response returns 200/201
→ Check Response body structure
```

---

## ✅ Pre-Integration Checklist

- [ ] Read `CHATBOT_REFACTOR_SUMMARY.md`
- [ ] Review all new files
- [ ] Update component imports in main layout
- [ ] Replace chat API route
- [ ] Test locally with `npm run dev`
- [ ] Check no TypeScript errors
- [ ] Test chat flow end-to-end
- [ ] Test form auto-fill
- [ ] Test API endpoints
- [ ] Deploy to staging
- [ ] Run integration tests
- [ ] Deploy to production
- [ ] Monitor for errors

---

## 🔗 File Relationships

```
ChatBotRefactored.tsx
  └── uses → useChatStateMachine hook
       ├── uses → ChatStage, LeadData types
       ├── uses → lead-validation utilities
       └── calls → /api/chat endpoint
           └── returns → reply, stage, leadData

ContactAutofill.tsx
  └── reads → URL parameters (?name=...&email=...)
  └── uses → lead-validation utilities (getPricingForPurpose)
  └── calls → /api/lead endpoint
      └── saves → LeadData

/api/lead route
  └── receives → LeadData from form
  └── validates → using rules in lead-validation
  └── returns → success/error response

/api/chat route
  └── receives → message, conversationHistory, leadData, stage
  └── calls → OpenAI API
  └── returns → reply, stage, leadData
```

---

## 📞 Quick Troubleshooting

| Problem | Check | Fix |
|---------|-------|-----|
| Chat not loading | Console errors | Check API key in .env.local |
| Auto-fill not working | URL parameters present? | Verify router.push URL format |
| API 500 error | Network tab | Check OPENAI_API_KEY is set |
| Input not disabled | isLoading state | Verify isInputDisabled logic |
| Stage not advancing | Validation result | Check validateForStage rules |
| No localStorage | DevTools Storage tab | Verify STORAGE_KEY const |
| TypeScript errors | Terminal errors | Run `npm run type-check` |
| API validation fails | Request body | Verify data format matches interface |

---

## 🚀 One-Command Integration

```bash
# After creating all files, update imports and deploy:
npm run dev              # Test locally
npm run type-check       # Verify types
npm run lint             # Check code quality
git add .
git commit -m "feat: integrate refactored chatbot with state machine"
git push origin main
```

---

## 💡 Pro Tips

1. **Debug with React DevTools:** Inspect hook state in real-time
2. **Use Network Tab:** Monitor API calls and responses
3. **Check Console:** All errors and logs appear here
4. **LocalStorage Debugging:** View persistence in DevTools Storage tab
5. **URL Parameters:** Test auto-fill by manually editing URL
6. **Mobile Testing:** Use DevTools device emulation or real phone
7. **Performance:** Monitor API response time in Network tab
8. **Accessibility:** Test keyboard navigation with Tab key

---

**Quick Links:**
- 📖 Full Guide: `CHATBOT_REFACTOR_GUIDE.md`
- 📋 Summary: `CHATBOT_REFACTOR_SUMMARY.md`
- ✅ Migration: `MIGRATION_CHECKLIST.md`
- 🔍 This File: Quick Reference (current)

---

**Status:** Ready to use
**Last Updated:** Today
**Questions?** Check the detailed guides or inline code comments
