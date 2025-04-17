# **App Name**: AgroWise

## Core Features:

- Weather Updates: Fetch current and weekly weather forecasts using the OpenWeather API based on the user's location. Display key information such as temperature, rainfall, and humidity.
- AI Crop Suggestion: Suggest suitable crops based on user inputs (soil type, location, season) using a machine learning tool or rule-based model. Display yield estimates, growth duration, and market value.
- Farming Advice: Provide educational content (text, infographics) on farming and organic techniques, filterable by crop, region, and topic.
- Government Scheme Alerts: Display relevant government schemes based on the user's location, including title, summary, benefits, application process, and links to official resources.
- Regional Language Support: Implement multi-language support using i18next to cater to regional users.

## Style Guidelines:

- Primary color: Earthy Green (#388E3C) to evoke a sense of nature and growth.
- Secondary color: Light Beige (#F5F5DC) for a clean and calming background.
- Accent: Golden Yellow (#FFC107) to highlight important information and calls to action.
- Responsive layout optimized for mobile and desktop devices.
- Use clear, representative icons for weather conditions, crop types, and farming topics.
- Subtle animations for loading states and data updates to enhance user experience.

## Original User Request:
Build a web application called **AgroMentor**, designed to assist farmers by providing essential, AI-powered agricultural support. The app should be responsive, mobile-friendly, and support regional language support (via i18next or similar).

### ✅ Core Features:

1. **Weather Updates**
   - Integrate OpenWeather API (or Agromonitoring API) to fetch current and weekly forecasts based on user's location.
   - Display weather in a simple, clean UI with icons, temperature, rainfall, humidity, etc.
   - Optionally cache data locally (PWA-friendly).

2. **AI-Powered Crop Suggestion**
   - Accept inputs: soil type, location (state/region), and season/month.
   - Use simple machine learning logic or a rule-based model to suggest ideal crops.
   - Backend logic should be modular and easily expandable.
   - Show suggested crops with yield estimate, growth duration, and market value (mock data).

3. **Farming & Organic Advice**
   - Store educational content (text, infographics, videos) related to general farming best practices and organic techniques.
   - Filterable by crop type, region, and topics like “pest control”, “composting”, etc.
   - Content should be manageable via backend or markdown structure.

4. **Government Scheme Alerts**
   - Maintain a backend database of central and state-specific schemes.
   - Filter schemes based on user's state/region.
   - Each scheme entry should include title, short summary, benefits, application process, and links to official resources.
  