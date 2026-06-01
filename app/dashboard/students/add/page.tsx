"use client";

import AddMarksheetForm from "@/components/myUi/AddMarksheetForm/AddMarksheetForm";
import { Suspense } from "react";


export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddMarksheetForm />
    </Suspense>
  );
}