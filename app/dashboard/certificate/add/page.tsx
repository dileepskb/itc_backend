"use client"

import * as React from "react"

import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  title: z.string(),
  roll: z.string(),
  com: z.string(),
  ms: z.string(),
  accounting: z.string(),
  dtp: z.string(),
  it: z.string(),
  studentId: z.string(),
})

export default function AddMarksheet() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<string[]>([])
    const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      title: "",
      roll: "",
      com: "",
      ms: "",
      accounting: "",
      dtp: "",
      it: "",
      studentId: "",
    },
  })

async function onSubmit(data: any) {
  try {
    const res = await fetch("/api/marksheet/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const result = await res.json()

    if (!res.ok) {
      throw new Error(result.error || "Failed to save")
    }
    
    // ✅ Success toast
    toast("Marksheet created successfully 🎉", {
      position: "bottom-right",
    })
    router.push("/dashboard/certificate/")

  } catch (error: any) {
    // ❌ Error toast
    toast("Error", {
      description: error.message,
      position: "bottom-right",
    })
  }
}

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (!query) return

      const res = await axios.get(`/api/search?q=${query}`)
      setResults(res.data)
    }, 400)

    return () => clearTimeout(delayDebounce)
  }, [query])

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Add Marksheet Details</CardTitle>
        {/* <CardDescription>
          Help us improve by reporting bugs you encounter.
        </CardDescription> */}
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" className="flex gap-2" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="studentId"
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="relative">
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Student</FieldLabel>

                    <Input
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value)
                      }}
                      placeholder="Search student..."
                      autoComplete="off"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>

                  {/* 🔥 Dropdown */}
                  {query && results.length > 0 && (
                    <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded border bg-white shadow">
                      {results.map((student: any) => (
                        <div
                          key={student.id}
                          className="cursor-pointer p-2 hover:bg-gray-100"
                          onClick={() => {
                            field.onChange(student.id) // ✅ form me id set
                            setQuery(student.name) // ✅ input me name show
                            setResults([]) // ✅ dropdown close
                          }}
                        >
                          {student.name} ({student.roll})
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            />
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">Name</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Title"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="roll"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">Roll</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Roll"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="com"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">COM</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="COM"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            
          </FieldGroup>
          <FieldGroup>
          
          
           
           
            <Controller
              name="ms"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">MS</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="MS"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="dtp"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">DTP</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="DTP"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="it"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">IT</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="IT"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-rhf-demo">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
