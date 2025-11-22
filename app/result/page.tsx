"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import MedicineCard from "@/components/medicine-card"

interface Medicine {
  raw_text: string
  drug_brand: string | null
  drug_generic: string | null
  strength: string | null
  form: string
  route: string
  sig: {
    dose: string | null
    frequency: string | null
    duration: string | null
    timing: string | null
  }
  uses: string[]
  side_effects_common: string[]
  side_effects_serious: string[]
  citations: string[]
  confidence: number
}

interface PrescriptionResult {
  items: Medicine[]
  disclaimer: string
}

export default function ResultPage() {
  const [result, setResult] = useState<PrescriptionResult | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const stored = sessionStorage.getItem("prescriptionResult")
    if (stored) {
      try {
        setResult(JSON.parse(stored))
      } catch (err) {
        console.error("Failed to parse result:", err)
      }
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-neutral-50 via-blue-50 to-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto mb-4" />
          <p className="text-neutral-600">Loading results...</p>
        </div>
      </main>
    )
  }

  if (!result || !result.items) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-neutral-50 via-blue-50 to-neutral-50">
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-neutral-600 mb-6">No results found. Please try uploading a prescription image again.</p>
          <Link href="/" className="text-primary hover:text-primary-dark font-semibold">
            Upload a prescription
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-50 via-blue-50 to-neutral-50">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5m7 7l-7-7 7-7" />
            </svg>
            Upload Another Prescription
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">Analysis Results</h1>
        </div>

        {result.items.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-neutral-600 mb-4">No medicines were detected in the prescription image.</p>
            <p className="text-sm text-neutral-500">
              Please ensure the image is clear and contains a legible prescription.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {result.items.map((medicine, index) => (
              <MedicineCard key={index} medicine={medicine} index={index} />
            ))}
          </div>
        )}

        <div className="mt-12 bg-blue-50 border border-primary border-opacity-30 rounded-lg p-6">
          <p className="text-sm text-neutral-700 text-balance">
            <span className="font-semibold">Disclaimer:</span>{" "}
            {result.disclaimer ||
              "This analysis is for informational purposes only. Always consult with a healthcare professional."}
          </p>
        </div>
      </div>
    </main>
  )
}
