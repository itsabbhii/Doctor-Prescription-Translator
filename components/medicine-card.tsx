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

export default function MedicineCard({ medicine, index }: { medicine: Medicine; index: number }) {
  const confidenceColor =
    medicine.confidence >= 0.8 ? "bg-success" : medicine.confidence >= 0.5 ? "bg-warning" : "bg-danger"

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="bg-gradient-to-r from-primary to-primary-light p-6 text-white">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-white bg-opacity-20 text-sm font-semibold">
                {index + 1}
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-balance">
              {medicine.drug_brand || medicine.drug_generic || "Unknown Medicine"}
            </h3>
            {medicine.drug_brand && medicine.drug_generic && (
              <p className="text-blue-100 text-sm mt-1">Generic: {medicine.drug_generic}</p>
            )}
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{Math.round(medicine.confidence * 100)}%</div>
            <p className="text-xs text-blue-100">Confidence</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Dosage Information */}
        <div>
          <h4 className="font-semibold text-neutral-900 mb-3">Dosage Information</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {medicine.strength && (
              <div className="bg-neutral-50 rounded-lg p-3">
                <p className="text-xs text-neutral-500 uppercase tracking-wide">Strength</p>
                <p className="text-sm font-semibold text-neutral-900 mt-1">{medicine.strength}</p>
              </div>
            )}
            <div className="bg-neutral-50 rounded-lg p-3">
              <p className="text-xs text-neutral-500 uppercase tracking-wide">Form</p>
              <p className="text-sm font-semibold text-neutral-900 mt-1 capitalize">{medicine.form}</p>
            </div>
            <div className="bg-neutral-50 rounded-lg p-3">
              <p className="text-xs text-neutral-500 uppercase tracking-wide">Route</p>
              <p className="text-sm font-semibold text-neutral-900 mt-1 capitalize">{medicine.route}</p>
            </div>
            {medicine.sig.dose && (
              <div className="bg-neutral-50 rounded-lg p-3">
                <p className="text-xs text-neutral-500 uppercase tracking-wide">Dose</p>
                <p className="text-sm font-semibold text-neutral-900 mt-1">{medicine.sig.dose}</p>
              </div>
            )}
          </div>

          {/* Frequency and Duration */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            {medicine.sig.frequency && (
              <div className="bg-blue-50 rounded-lg p-3 border border-primary border-opacity-20">
                <p className="text-xs text-neutral-500 uppercase tracking-wide">Frequency</p>
                <p className="text-sm font-semibold text-neutral-900 mt-1">{medicine.sig.frequency}</p>
              </div>
            )}
            {medicine.sig.duration && (
              <div className="bg-blue-50 rounded-lg p-3 border border-primary border-opacity-20">
                <p className="text-xs text-neutral-500 uppercase tracking-wide">Duration</p>
                <p className="text-sm font-semibold text-neutral-900 mt-1">{medicine.sig.duration}</p>
              </div>
            )}
          </div>

          {medicine.sig.timing && (
            <div className="bg-blue-50 rounded-lg p-3 border border-primary border-opacity-20 mt-4">
              <p className="text-xs text-neutral-500 uppercase tracking-wide">Timing</p>
              <p className="text-sm font-semibold text-neutral-900 mt-1">{medicine.sig.timing}</p>
            </div>
          )}
        </div>

        {/* Uses */}
        {medicine.uses.length > 0 && (
          <div>
            <h4 className="font-semibold text-neutral-900 mb-3">Uses</h4>
            <ul className="space-y-2">
              {medicine.uses.map((use, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-neutral-700">
                  <span className="text-success font-bold mt-0.5">•</span>
                  <span>{use}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Common Side Effects */}
        {medicine.side_effects_common.length > 0 && (
          <div>
            <h4 className="font-semibold text-neutral-900 mb-3">Common Side Effects</h4>
            <ul className="space-y-2">
              {medicine.side_effects_common.map((effect, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-neutral-700">
                  <span className="text-warning font-bold mt-0.5">▪</span>
                  <span>{effect}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Serious Side Effects */}
        {medicine.side_effects_serious.length > 0 && (
          <div>
            <h4 className="font-semibold text-danger mb-3">Serious Side Effects</h4>
            <ul className="space-y-2">
              {medicine.side_effects_serious.map((effect, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-danger">
                  <span className="font-bold mt-0.5">⚠</span>
                  <span>{effect}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Citations */}
        {medicine.citations.length > 0 && (
          <div>
            <h4 className="font-semibold text-neutral-900 mb-3">Sources</h4>
            <ul className="space-y-1">
              {medicine.citations.map((citation, idx) => (
                <li key={idx} className="text-xs text-neutral-600">
                  • {citation}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
