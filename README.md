# Prescription Analyzer

A full-stack web application that uses AI to analyze handwritten medical prescriptions. Upload a prescription image, and the app extracts medicine information, dosages, uses, and potential side effects.

**Disclaimer**: This information is educational and not a substitute for professional medical advice.

## Technology Stack

### Frontend
- **Next.js 14** with React and TypeScript
- **TailwindCSS** for styling
- **Axios** for API requests
- **Next.js App Router** for routing

### Backend
- **Spring Boot 3.2+** with Java 21
- **Spring Web** for REST endpoints
- **Gemini API** for prescription analysis
- **OKHttp** for HTTP requests

### AI Integration
- **Google Gemini API** with custom models for prescription interpretation

## Project Structure

\`\`\`
prescription-app/
├── frontend/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   └── result/
│   │       └── page.tsx
│   ├── components/
│   │   ├── upload-box.tsx
│   │   └── medicine-card.tsx
│   ├── package.json
│   ├── next.config.mjs
│   ├── tailwind.config.js
│   └── tsconfig.json
├── backend/
│   ├── pom.xml
│   ├── src/main/java/com/app/prescription/
│   │   ├── PrescriptionApplication.java
│   │   ├── controller/PrescriptionController.java
│   │   ├── service/GeminiService.java
│   │   ├── model/MedicineResponse.java
│   │   └── config/CorsConfig.java
│   └── src/main/resources/
│       └── application.properties
└── README.md
\`\`\`

## Prerequisites

### Frontend
- Node.js 18+ and npm/yarn
- Browser with JavaScript enabled

### Backend
- Java 21+
- Maven 3.8+
- Gemini API key and model ID

## Setup Instructions

### Backend Setup

1. **Get Gemini API Credentials**
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Create a new API key
   - Note your model ID (usually `gemini-1.5-pro` or similar)

2. **Configure Environment Variables**
   \`\`\`bash
   export GEMINI_API_KEY="your-api-key-here"
   export GEMINI_MODEL_ID="gemini-1.5-pro"
   \`\`\`

3. **Build the Backend**
   \`\`\`bash
   cd backend
   mvn clean package
   \`\`\`

4. **Run the Backend**
   \`\`\`bash
   java -jar target/prescription-analyzer-1.0.0.jar
   \`\`\`

   The backend will start on `http://localhost:8080`

### Frontend Setup

1. **Navigate to Frontend Directory**
   \`\`\`bash
   cd frontend
   \`\`\`

2. **Install Dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Configure Environment Variables**
   Create a `.env.local` file:
   \`\`\`env
   NEXT_PUBLIC_API_URL=http://localhost:8080
   \`\`\`

4. **Run Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`

   The frontend will be available at `http://localhost:3000`

## Usage

1. **Upload Prescription**
   - Go to `http://localhost:3000`
   - Drag and drop or click to select a prescription image
   - Supported formats: JPEG, PNG, WebP (max 5MB)

2. **View Analysis**
   - Click "Analyze Prescription"
   - Wait for AI processing
   - View extracted medicines with detailed information

3. **Medicine Card Details**
   - Drug name (brand + generic)
   - Strength and dosage form
   - Route of administration
   - Dosage instructions
   - Uses and side effects
   - Confidence percentage
   - Medical citations

## API Endpoints

### POST /api/prescription/parse

**Request**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Parameter: `file` (image file)

**Response**
\`\`\`json
{
  "items": [
    {
      "raw_text": "Paracetamol 500mg",
      "drug_brand": "Calpol",
      "drug_generic": "Paracetamol",
      "strength": "500mg",
      "form": "tablet",
      "route": "oral",
      "sig": {
        "dose": "1 tablet",
        "frequency": "three times daily",
        "duration": "5 days",
        "timing": "after meals"
      },
      "uses": ["Pain relief", "Fever reduction"],
      "side_effects_common": ["Nausea", "Dizziness"],
      "side_effects_serious": ["Liver damage"],
      "citations": ["WHO guidelines"],
      "confidence": 0.95
    }
  ],
  "disclaimer": "This information is educational and not a substitute for professional medical advice."
}
\`\`\`

## Deployment

### Backend Deployment (Render or Railway)

1. **Push to GitHub**
   \`\`\`bash
   git push origin main
   \`\`\`

2. **Create Service on Render/Railway**
   - Connect your GitHub repository
   - Select the backend directory
   - Set build command: `mvn clean package`
   - Set start command: `java -jar target/prescription-analyzer-1.0.0.jar`
   - Add environment variables:
     - `GEMINI_API_KEY`
     - `GEMINI_MODEL_ID`

3. **Deploy**
   - Click Deploy
   - Note the deployment URL

### Frontend Deployment (Vercel)

1. **Push to GitHub**
   \`\`\`bash
   git push origin main
   \`\`\`

2. **Connect to Vercel**
   - Visit [Vercel Dashboard](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Set root directory to `frontend`

3. **Add Environment Variables**
   - `NEXT_PUBLIC_API_URL` = your backend URL

4. **Deploy**
   - Click "Deploy"

## Error Handling

### Common Issues

**Backend Connection Error**
- Ensure backend is running on port 8080
- Check `NEXT_PUBLIC_API_URL` in frontend .env
- Verify CORS configuration

**Invalid Gemini API Key**
- Verify `GEMINI_API_KEY` environment variable
- Check API key is valid and not expired
- Ensure API key has sufficient quota

**File Upload Errors**
- Image must be valid (JPEG, PNG, WebP)
- File size must be under 5MB
- Ensure prescription is legible

**JSON Parsing Error**
- Check Gemini API response format
- Verify model ID is correct
- Check API quota

## Performance Optimization

- Images are compressed before sending
- Base64 encoding for efficient transmission
- Response caching with sessionStorage
- Lazy loading of result components
- Optimized image loading and preview

## Security Considerations

- File upload validation (size, type)
- CORS configuration restricted to allowed origins
- Input sanitization
- Environment variables for sensitive data
- No storage of prescription images

## Future Enhancements

- Multi-language prescription support
- Prescription history and caching
- User authentication and profiles
- Prescription comparison
- Drug interaction checking
- Export to PDF
- Integration with pharmacy systems

## Support

For issues or questions:
1. Check this README for common issues
2. Review backend and frontend logs
3. Verify all environment variables are set correctly
4. Ensure Gemini API quota is available

## License

MIT License - feel free to use and modify

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
