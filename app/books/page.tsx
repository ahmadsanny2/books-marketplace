import { Suspense } from "react";
import AllBooks from "./allBooksClient";

export default function BooksPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AllBooks />
    </Suspense>
  )
}