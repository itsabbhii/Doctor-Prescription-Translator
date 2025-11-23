import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navigation() {
  return (
    <nav className="flex gap-2 justify-center mb-6">
      <Button asChild variant="outline">
        <Link href="/">Prescription Analyzer</Link>
      </Button>
      <Button asChild variant="outline">
        <Link href="/appointments">Doctor Appointments</Link>
      </Button>
    </nav>
  )
}
