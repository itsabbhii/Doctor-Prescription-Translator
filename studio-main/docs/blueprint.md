# **App Name**: MediTranslate

## Core Features:

- User Authentication and Authorization: Secure sign-up/login with role selection (Patient, Pharmacist, Admin) using Firebase Authentication and role-based Firestore rules.
- Prescription Upload and OCR: Upload prescription images and extract medicine names using Firebase ML Kit Text Recognition (OCR).
- Medicine Information Database: Store medicine details (English and Hindi names, generic name, uses, precautions, side effects) in a Firestore collection, with a boolean field for verification.
- Medicine Info Display: Display medicine details in both English and Hindi. If a medicine is not found, prompt a pharmacist to add the details.
- AI-Powered Smart Suggestion Tool for Pharmacists: Suggest appropriate translations or expansions of medicine details, or flag possibly erroneous info. LLM incorporates the current content and decides whether or not the tool is required, or which suggestions may be the most useful.
- PDF Generation: Convert translated results into a downloadable PDF.
- Role-Specific Dashboards: Provide dashboards for patients (upload history, report downloads), pharmacists (catalog management), and admins (user and system activity monitoring).

## Style Guidelines:

- Primary color: Soft blue (#A0D2EB) to convey trust and health.
- Background color: Light grey (#F5F5F5), almost white to keep the app visually light and airy.
- Accent color: Light orange (#FFB347) for interactive elements to guide the user.
- Font pairing: 'PT Sans' (sans-serif) for body text, and 'Playfair' (serif) for headings, providing clarity with a touch of elegance.
- Code font: 'Source Code Pro' for displaying API snippets or database rules.
- Use Material Design icons to maintain a clean and intuitive user interface.
- Implement a responsive layout optimized for both web and mobile, following Material Design principles for consistency.
- Use subtle animations to provide feedback on user interactions (e.g., upload confirmations, search progress).