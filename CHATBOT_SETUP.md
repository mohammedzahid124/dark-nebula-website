# Dark Nebula AI ChatBot - Setup & Configuration Guide

## 📋 Overview

This is a production-ready AI chatbot integrated with your Dark Nebula website. It provides:
- ✅ Intelligent conversation flow
- ✅ Pricing estimations based on project type
- ✅ OpenAI integration (or fallback to predefined responses)
- ✅ Conversation context tracking
- ✅ Beautiful floating widget UI
- ✅ Mobile responsive design
- ✅ Typing animations and loading states

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install openai
```

### 2. Set Environment Variables

Create a `.env.local` file in the root directory:

```env
# OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Optional: For production deployments
NODE_ENV=production
```

### 3. Get OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy and paste it in `.env.local`

### 4. Test the Chatbot

```bash
npm run dev
```

Visit `http://localhost:3000` and click the floating chat button.

---

## 📁 File Structure

```
app/
├── components/
│   └── ChatBot.tsx              # Main chatbot UI component
├── api/
│   └── chat/
│       └── route.ts             # Chat API handler
├── layout.tsx                   # Updated with ChatBot integration
└── ...

```

---

## 🤖 How It Works

### 1. **Frontend Flow (ChatBot.tsx)**

- User clicks the floating chat button
- Chat window opens with greeting
- User sends message
- Message sent to `/api/chat` endpoint
- Response received and displayed with typing animation
- Quick action buttons for common queries
- Contact button redirects to contact form

### 2. **Backend Flow (route.ts)**

- Receives user message and conversation history
- Extracts context (project type, budget, timeline, email, phone)
- If pricing query → use predefined pricing database
- Else → send to OpenAI API with system prompt
- Falls back to predefined responses if API unavailable
- Returns AI response + updated context

### 3. **Conversation Context**

The bot tracks:
- `projectType`: web_development | ai_data | mobile | devops
- `budget`: < 20k | 20k-50k | 50k-100k | 100k+
- `timeline`: 1 month | 3 months | 6 months
- `email`: User's email address
- `phone`: User's phone number

---

## 💰 Pricing Logic

### Website Projects
- **Portfolio Site**: ₹10k–₹25k
- **Business Website**: ₹25k–₹60k
- **E-commerce Platform**: ₹60k–₹150k
- **Full Stack Web App**: ₹60k–₹300k

### AI & Data Projects
- **Data Dashboard**: ₹30k–₹75k
- **ML Project**: ₹50k–₹200k
- **Custom AI Solution**: ₹80k–₹500k

### Mobile Apps
- **Simple Mobile App**: ₹50k–₹100k
- **Complex Mobile App**: ₹100k–₹300k

### DevOps Services
- **Basic DevOps Setup**: ₹30k–₹60k
- **Enterprise DevOps Solution**: ₹60k–₹200k

**To customize pricing**, edit the `PRICING_DATABASE` object in `app/api/chat/route.ts`.

---

## 🎨 UI Components

### ChatBot.tsx

#### Key Features:
- **Floating Widget Button**: Shows online status and tooltip
- **Chat Window**: Fixed position, max-width 448px
- **Messages Container**: Auto-scrolls to latest message
- **Message Types**: 
  - User messages (cyan-purple gradient, right-aligned)
  - Bot messages (white/10 border, left-aligned)
  - Loading indicator with spinner
- **Typing Animation**: Typewriter effect for bot responses
- **Input Field**: With placeholder and focus states
- **Quick Action Buttons**: Common queries (Web Dev, AI/Data, Pricing, Clear)
- **Contact Button**: Redirects to contact section

#### Props & States:
```typescript
- isOpen: boolean              // Chat window visibility
- messages: Message[]          // Conversation history
- inputValue: string          // Current input text
- isLoading: boolean          // API loading state
- conversationContext: Object // Tracked user info
```

#### Message Interface:
```typescript
interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  isTyping?: boolean;
}
```

---

## 🔌 API Integration

### Endpoint: `POST /api/chat`

**Request Body:**
```json
{
  "message": "string",
  "conversationHistory": [
    {
      "id": "string",
      "text": "string",
      "sender": "user" | "bot",
      "timestamp": "ISO 8601 date"
    }
  ],
  "context": {
    "projectType": "string",
    "budget": "string",
    "timeline": "string",
    "email": "string",
    "phone": "string"
  }
}
```

**Response:**
```json
{
  "reply": "string",
  "context": {
    "projectType": "string",
    "budget": "string",
    "timeline": "string",
    "email": "string",
    "phone": "string"
  },
  "timestamp": "ISO 8601 date"
}
```

**Error Response:**
```json
{
  "error": "string",
  "reply": "string"
}
```

---

## 🧠 System Prompt & Behavior

The bot operates under this system prompt:

```
You are Dark Nebula's AI Consultant - a professional, friendly, and expert virtual consultant.

Your role:
- Greet visitors and understand their project needs
- Ask about project type, budget, timeline, and contact details progressively
- Provide accurate information about our services
- Estimate project costs based on the pricing database
- Be concise (max 2-3 sentences per response)
- Always maintain a professional yet approachable tone
- After collecting requirements, suggest scheduling a consultation
```

**To customize behavior**, edit `SYSTEM_PROMPT` in `app/api/chat/route.ts`.

---

## 🔧 Environment-Specific Behavior

### With OpenAI API Key
- Uses GPT-3.5-turbo for intelligent, contextual responses
- Automatically extracts project details from conversation
- Provides natural language responses

### Without OpenAI API Key (Fallback)
- Uses predefined response database
- Responds based on keyword matching
- Still provides pricing estimates
- Routes to contact page for complex queries

To disable OpenAI and use fallback only, remove `OPENAI_API_KEY` from `.env.local`.

---

## 🎯 Customization Guide

### 1. **Change Pricing**
Edit `PRICING_DATABASE` in `app/api/chat/route.ts`:
```typescript
const PRICING_DATABASE = {
  website: {
    portfolio: { min: 10000, max: 25000, desc: "Portfolio website" },
    // ... add more
  },
};
```

### 2. **Change Bot Greeting**
Edit the initial message in `ChatBot.tsx`:
```typescript
const greeting: Message = {
  text: "Your custom greeting here",
  sender: "bot",
  ...
};
```

### 3. **Modify Color Scheme**
Update Tailwind classes in `ChatBot.tsx`:
```typescript
// Change from: from-cyan-500 to-purple-600
// To: from-blue-500 to-pink-600
```

### 4. **Add Custom Prompt Engineering**
Modify `SYSTEM_PROMPT` in `app/api/chat/route.ts` to change bot behavior.

### 5. **Enable/Disable Features**
- **Quick action buttons**: Remove from `ChatBot.tsx` line ~200
- **Contact button**: Set `display: none` in styles
- **Typing animation**: Adjust `speed` prop in `TypingAnimation`

---

## 🧪 Testing

### Test Cases

1. **Greeting Test**
   - Open chatbot
   - Expect: Greeting message appears

2. **Pricing Query Test**
   - Send: "How much does a website cost?"
   - Expect: Pricing estimate appears

3. **Context Extraction Test**
   - Send: "I want to build an AI dashboard with ₹100k budget"
   - Expect: Bot recognizes project type and budget

4. **Contact Redirect Test**
   - Click "Talk to Our Team" button
   - Expect: Smooth scroll to contact section

5. **Mobile Responsive Test**
   - Open on mobile device
   - Expect: Chat window fits screen, is usable

### API Testing with cURL

```bash
# Test API endpoint
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "How much does a website cost?",
    "conversationHistory": [],
    "context": {}
  }'
```

---

## 📊 Analytics Integration (Optional)

To track chat interactions, add this in `ChatBot.tsx`:

```typescript
const trackEvent = (eventName: string, data?: any) => {
  if (window.gtag) {
    window.gtag('event', eventName, data);
  }
};

// Usage:
const sendMessage = async (e: React.FormEvent) => {
  trackEvent('chat_message_sent', { message: inputValue });
  // ... rest of logic
};
```

---

## 🔒 Security Considerations

1. **API Key Protection**
   - Never commit `.env.local` to version control
   - Use `.gitignore` to exclude environment files
   - For production, use secret management services

2. **Input Validation**
   - API route validates message format
   - Sanitize user inputs before logging
   - Use rate limiting on production

3. **Data Privacy**
   - Conversation history stored client-side only
   - Email/phone data extracted but not persisted
   - No tracking cookies without user consent

---

## 🚀 Production Deployment

### Vercel Deployment

1. Push to GitHub
2. Connect repo to Vercel
3. Add environment variable: `OPENAI_API_KEY`
4. Deploy!

### Self-Hosted Deployment

1. Set environment variables on server
2. Build: `npm run build`
3. Start: `npm start`
4. Use process manager (PM2) for reliability

---

## 📞 Support & Customization

For advanced customizations:
- Modify `SYSTEM_PROMPT` for different bot personality
- Implement database persistence for conversation history
- Add multi-language support
- Integrate with CRM system
- Add analytics and sentiment analysis

---

## ✅ Checklist

- [ ] OpenAI API key obtained and configured
- [ ] ChatBot component integrated into layout
- [ ] `/api/chat` route created and tested
- [ ] Pricing database customized
- [ ] System prompt reviewed and approved
- [ ] Contact page ID updated if needed
- [ ] Mobile responsiveness tested
- [ ] Error handling verified
- [ ] Conversation context logic validated
- [ ] Ready for production deployment

---

**Version**: 1.0.0  
**Last Updated**: January 25, 2026  
**Author**: Dark Nebula AI Team
