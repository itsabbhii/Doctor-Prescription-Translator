import UploadBox from "@/components/upload-box"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-50 via-blue-50 to-neutral-50">
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4 text-balance">Prescription Analyzer</h1>
          <p className="text-lg text-neutral-600 text-balance">
            Upload a prescription image and let our AI extract medicine information, dosages, uses, and potential side
            effects instantly.
          </p>
          <p className="text-sm text-neutral-500 mt-4 italic">
            This information is educational and not a substitute for professional medical advice.
          </p>
        </div>

        <UploadBox />
      </div>
    </main>
  )
}
