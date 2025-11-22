"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"

export default function UploadBox() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleFileSelect = useCallback((selectedFile: File) => {
    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/webp"]
    if (!validTypes.includes(selectedFile.type)) {
      setError("Please upload a valid image (JPEG, PNG, or WebP)")
      return
    }

    // Validate file size (max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB")
      return
    }

    setFile(selectedFile)
    setError(null)

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(selectedFile)
  }, [])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const droppedFiles = e.dataTransfer.files
    if (droppedFiles.length > 0) {
      handleFileSelect(droppedFiles[0])
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFileSelect(e.target.files[0])
    }
  }

  const handleAnalyze = async () => {
    if (!file) return

    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("file", file)

      console.log("[v0] Sending file to API:", file.name, file.size, file.type)

      const response = await fetch("/api/prescription/parse", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("[v0] API Response:", data)

      // Store result in sessionStorage for the result page
      sessionStorage.setItem("prescriptionResult", JSON.stringify(data))
      router.push("/result")
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred while analyzing the prescription"
      setError(message)
      console.log("[v0] Error:", message)
      console.log("[v0] Full error:", err)
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed border-primary rounded-lg p-12 text-center cursor-pointer transition-all hover:border-primary-light hover:bg-blue-50"
      >
        <input
          type="file"
          id="file-input"
          onChange={handleFileInputChange}
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
        />

        {!preview ? (
          <label htmlFor="file-input" className="cursor-pointer">
            <div className="mb-4">
              <svg className="mx-auto h-12 w-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <p className="text-lg font-semibold text-neutral-900">Drag and drop your prescription image</p>
            <p className="text-neutral-500 mt-2">or click to browse (JPEG, PNG, WebP - Max 5MB)</p>
          </label>
        ) : (
          <div className="space-y-4">
            <img
              src={preview || "/placeholder.svg"}
              alt="Preview"
              className="max-h-64 mx-auto rounded-lg object-contain"
            />
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  setFile(null)
                  setPreview(null)
                }}
                className="px-6 py-2 bg-neutral-200 text-neutral-900 rounded-lg font-medium hover:bg-neutral-300 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-danger bg-opacity-10 border border-danger text-danger px-4 py-3 rounded-lg">{error}</div>
      )}

      <button
        onClick={handleAnalyze}
        disabled={!file || loading}
        className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
            Analyzing Prescription...
          </>
        ) : (
          "Analyze Prescription"
        )}
      </button>
    </div>
  )
}
