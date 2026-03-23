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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { FaRegEdit } from "react-icons/fa"
import { FaEye } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
export default function Page() {
  const [students, setStudents] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  
  const router = useRouter()

// 🔥 fetch function
  const fetchStudents = async () => {
    try {
      setIsLoading(true)

      const res = await axios.get("/api/students/")
      setStudents(res.data)
      setError("")
    } catch (err) {
      setError("Failed to fetch student details")
    } finally {
      setIsLoading(false)
    }
  }

  // 🔥 load on mount
  useEffect(() => {
    fetchStudents()
  }, [])

  // 🔥 delete function
  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Are you sure?")
    if (!confirmDelete) return

    try {
      const res = await fetch(`/api/students/delete/${id}`, {
        method: "DELETE",
      })

      if (res.ok) {
        // ⚡ instant UI update (best UX)
        setStudents((prev) => prev.filter((s) => s.id !== id))
      } else {
        alert("Delete failed")
      }
    } catch (err) {
      alert("Something went wrong")
    }
  }

  // 🔥 Loading UI
  if (isLoading) return <div>Loading...</div>

  // ❌ Error UI
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div>
      <div className="border p-3">
        <ButtonGroup>
          <Button onClick={() => router.push("/dashboard/students/add/")}>
            Add Student
          </Button>
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
          {students?.map((student, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{student.name}</TableCell>
              <TableCell>{student.roll}</TableCell>
              <TableCell>{student.course}</TableCell>
              <TableCell className="text-right">
                <Tooltip>
                  <TooltipTrigger>
                    {" "}
                    <Button className="border bg-gray-200 text-black">
                      <FaRegEdit />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
                    {" "}
                    <Button className="border bg-gray-200 text-black">
                      <FaEye />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
                    <Button onClick={() => handleDelete(student.id)} className="border bg-gray-200 text-black">
                      <MdDelete />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delete</p>
                  </TooltipContent>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
