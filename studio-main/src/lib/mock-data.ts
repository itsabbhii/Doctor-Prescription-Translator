import type { User, Medicine, PrescriptionUpload, Appointment } from './types';

export const mockUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com', role: 'Admin' },
  { id: '2', name: 'Dr. Jane Smith', email: 'jane.smith@example.com', role: 'Pharmacist', specialization: 'Cardiology' },
  { id: '3', name: 'Alice Johnson', email: 'alice.j@example.com', role: 'Patient' },
  { id: '4', name: 'Bob Williams', email: 'bob.w@example.com', role: 'Patient' },
  { id: '5', name: 'Dr. Charlie Brown', email: 'charlie.b@example.com', role: 'Pharmacist', specialization: 'Neurology' },
  { id: '6', name: 'Dr. Eve Williams', email: 'eve.w@example.com', role: 'Pharmacist', specialization: 'ENT' },
];

export const mockMedicines: Medicine[] = [
  {
    id: 'med1',
    name_en: 'Paracetamol',
    name_hi: 'पैरासिटामोल',
    generic_name: 'Acetaminophen',
    uses_en: 'Used to treat pain and fever.',
    uses_hi: 'दर्द और बुखार के इलाज के लिए उपयोग किया जाता है।',
    precautions_en: 'Do not exceed recommended dose. Consult a doctor if you have liver problems.',
    precautions_hi: 'अनुशंसित खुराक से अधिक न लें। यदि आपको लिवर की समस्या है तो डॉक्टर से सलाह लें।',
    side_effects_en: 'Nausea, stomach pain, loss of appetite.',
    side_effects_hi: 'मतली, पेट दर्द, भूख न लगना।',
    verified: true,
  },
  {
    id: 'med2',
    name_en: 'Aspirin',
    name_hi: 'एस्पिरिन',
    generic_name: 'Acetylsalicylic acid',
    uses_en: 'Used to reduce fever and relieve mild to moderate pain.',
    uses_hi: 'बुखार को कम करने और हल्के से मध्यम दर्द से राहत के लिए उपयोग किया जाता है।',
    precautions_en: 'Do not give to children or teenagers with fever, flu symptoms, or chickenpox.',
    precautions_hi: 'बुखार, फ्लू के लक्षण या चिकनपॉक्स वाले बच्चों या किशोरों को न दें।',
    side_effects_en: 'Upset stomach, heartburn, easy bruising.',
    side_effects_hi: 'पेट खराब, सीने में जलन, आसानी से चोट लगना।',
    verified: true,
  },
  {
    id: 'med3',
    name_en: 'Ibuprofen',
    name_hi: 'इबुप्रोफेन',
    generic_name: 'Ibuprofen',
    uses_en: 'Used to relieve pain from various conditions such as headache, dental pain, menstrual cramps, muscle aches, or arthritis.',
    uses_hi: 'सिरदर्द, दांत दर्द, मासिक धर्म में ऐंठन, मांसपेशियों में दर्द, या गठिया जैसी विभिन्न स्थितियों से दर्द को दूर करने के लिए उपयोग किया जाता है।',
    precautions_en: 'May increase risk of heart attack or stroke.',
    precautions_hi: 'दिल का दौरा या स्ट्रोक का खतरा बढ़ सकता है।',
    side_effects_en: 'Upset stomach, nausea, vomiting, headache, diarrhea, constipation.',
    side_effects_hi: 'पेट खराब, मतली, उल्टी, सिरदर्द, दस्त, कब्ज।',
    verified: false,
  },
];

export const mockUploadHistory: PrescriptionUpload[] = [
  { id: 'up1', fileName: 'prescription_jan.jpg', uploadDate: '2023-01-15', status: 'Completed', reportUrl: '#' },
  { id: 'up2', fileName: 'doctors_note.pdf', uploadDate: '2023-02-20', status: 'Completed', reportUrl: '#' },
  { id: 'up3', fileName: 'scan_03.png', uploadDate: '2023-03-10', status: 'Processing' },
];

export const mockAppointments: Appointment[] = [
  { id: 'apt1', patientId: '3', patientName: 'Alice Johnson', pharmacistId: '2', appointmentDate: '2024-08-15', appointmentTime: '10:00 AM', status: 'Confirmed' },
  { id: 'apt2', patientId: '4', patientName: 'Bob Williams', pharmacistId: '5', appointmentDate: '2024-08-15', appointmentTime: '11:30 AM', status: 'Pending' },
  { id: 'apt3', patientId: '3', patientName: 'Charlie Green', pharmacistId: '2', appointmentDate: '2024-08-16', appointmentTime: '02:00 PM', status: 'Confirmed' },
  { id: 'apt4', patientId: '4', patientName: 'Diana Prince', pharmacistId: '6', appointmentDate: '2024-08-17', appointmentTime: '09:00 AM', status: 'Cancelled' },
];


export const mockOcrResult = ['Paracetamol', 'Aspirin', 'Unknown Drug'];
