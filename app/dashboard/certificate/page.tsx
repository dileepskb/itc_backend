"use client"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import axios from "axios"
import { ButtonGroup } from "@/components/ui/button-group"
import { useRouter } from "next/navigation"
export default function Page() {
  const [students, setStudents] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
    const router = useRouter()

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setIsLoading(true)

        const res = await axios.get("/api/marksheet/")

        setStudents(res.data)
        setError("")
      } catch (err) {
        setError("Failed to fetch student details")
      } finally {
        setIsLoading(false)
      }
    }

    fetchStudents()
  }, [])

  // 🔥 Loading UI
  if (isLoading) return <div>Loading...</div>

  // ❌ Error UI
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div>
        <div className="border p-3">
            <ButtonGroup>
               <Button onClick={() => router.push("/dashboard/certificate/add/")}>Add Student</Button>
               <Button>Search</Button>
            </ButtonGroup>
        </div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Roll Number</TableHead>
            <TableHead>course</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students?.map((student, index) => {
            console.log(student)
            return(
            <TableRow key={index}>
              <TableCell className="font-medium">{student.title}</TableCell>
              <TableCell>{student.roll}</TableCell>
              <TableCell>{student.course}</TableCell>
              <TableCell className="text-right">
                <Button>Edit</Button>
                <Button className="bg-red-600">View</Button>
              </TableCell>
            </TableRow>
          )})}
        </TableBody>
      </Table>
    </div>
  )
}
