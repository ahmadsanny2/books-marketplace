"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Star, ShoppingCart, Filter, Grid, List } from "lucide-react"

const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 15.99,
    originalPrice: 19.99,
    rating: 4.8,
    reviews: 1234,
    image: "/placeholder.svg?height=300&width=200",
    category: "Classic Literature",
    bestseller: true,
    description: "A classic American novel set in the Jazz Age...",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 12.99,
    originalPrice: 16.99,
    rating: 4.9,
    reviews: 2156,
    image: "/placeholder.svg?height=300&width=200",
    category: "Fiction",
    bestseller: false,
    description: "A gripping tale of racial injustice and childhood innocence...",
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    price: 13.99,
    originalPrice: 17.99,
    rating: 4.7,
    reviews: 3421,
    image: "/placeholder.svg?height=300&width=200",
    category: "Dystopian Fiction",
    bestseller: true,
    description: "A dystopian social science fiction novel...",
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    price: 11.99,
    originalPrice: 15.99,
    rating: 4.6,
    reviews: 1876,
    image: "/placeholder.svg?height=300&width=200",
    category: "Romance",
    bestseller: false,
    description: "A romantic novel of manners...",
  },
  {
    id: 5,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    price: 14.99,
    originalPrice: 18.99,
    rating: 4.5,
    reviews: 987,
    image: "/placeholder.svg?height=300&width=200",
    category: "Coming of Age",
    bestseller: false,
    description: "A controversial novel about teenage rebellion...",
  },
  {
    id: 6,
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    price: 16.99,
    originalPrice: 21.99,
    rating: 4.9,
    reviews: 5432,
    image: "/placeholder.svg?height=300&width=200",
    category: "Fantasy",
    bestseller: true,
    description: "The first book in the magical Harry Potter series...",
  },
]

const categories = [
  "Classic Literature",
  "Fiction",
  "Dystopian Fiction",
  "Romance",
  "Coming of Age",
  "Fantasy",
  "Science Fiction",
  "Mystery",
  "Biography",
  "History",
]

export default function BooksPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<string>("")
  const [sortBy, setSortBy] = useState<string>("popularity")

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Semua Buku</h1>
          <p className="text-slate-600 text-lg">Jelajahi koleksi lengkap buku kami dari berbagai kategori</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </h3>

              {/* Search */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Cari Buku</label>
                  <Input placeholder="Judul atau penulis..." />
                </div>

                {/* Categories */}
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-3 block">Kategori</label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={category}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                        />
                        <label htmlFor={category} className="text-sm text-slate-600 cursor-pointer">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Rentang Harga</label>
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih rentang harga" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-15">$0 - $15</SelectItem>
                      <SelectItem value="15-25">$15 - $25</SelectItem>
                      <SelectItem value="25-50">$25 - $50</SelectItem>
                      <SelectItem value="50+">$50+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Rating */}
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-3 block">Rating Minimum</label>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox id={`rating-${rating}`} />
                        <label htmlFor={`rating-${rating}`} className="flex items-center cursor-pointer">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < rating ? "fill-amber-400 text-amber-400" : "text-slate-300"}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-slate-600 ml-2">& up</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="text-slate-600">
                Menampilkan {books.length} dari {books.length} buku
              </div>
              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Paling Populer</SelectItem>
                    <SelectItem value="price-low">Harga: Rendah ke Tinggi</SelectItem>
                    <SelectItem value="price-high">Harga: Tinggi ke Rendah</SelectItem>
                    <SelectItem value="rating">Rating Tertinggi</SelectItem>
                    <SelectItem value="newest">Terbaru</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Books Grid/List */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {books.map((book) => (
                <Card
                  key={book.id}
                  className={`group hover:shadow-lg transition-all duration-300 overflow-hidden ${
                    viewMode === "list" ? "flex flex-row" : ""
                  }`}
                >
                  <div className={`relative ${viewMode === "list" ? "w-32 flex-shrink-0" : ""}`}>
                    <Image
                      src={book.image || "/placeholder.svg"}
                      alt={book.title}
                      width={200}
                      height={300}
                      className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                        viewMode === "list" ? "w-full h-full" : "w-full h-64"
                      }`}
                    />
                    {book.bestseller && (
                      <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">Bestseller</Badge>
                    )}
                  </div>
                  <CardContent className={`p-4 ${viewMode === "list" ? "flex-1 flex flex-col justify-between" : ""}`}>
                    <div className="space-y-2">
                      <Badge variant="secondary" className="text-xs">
                        {book.category}
                      </Badge>
                      <div>
                        <h3 className="font-semibold text-slate-900 line-clamp-2 group-hover:text-amber-600 transition-colors">
                          {book.title}
                        </h3>
                        <p className="text-sm text-slate-600 mt-1">{book.author}</p>
                      </div>
                      {viewMode === "list" && <p className="text-sm text-slate-600 line-clamp-2">{book.description}</p>}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          <span className="text-sm font-medium ml-1">{book.rating}</span>
                        </div>
                        <span className="text-xs text-slate-500">({book.reviews} ulasan)</span>
                      </div>
                    </div>
                    <div className={`flex items-center justify-between ${viewMode === "list" ? "mt-4" : "mt-3"}`}>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-slate-900">${book.price}</span>
                        <span className="text-sm text-slate-500 line-through">${book.originalPrice}</span>
                      </div>
                      <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-amber-900">
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Beli
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center space-x-2">
                <Button variant="outline" disabled>
                  Sebelumnya
                </Button>
                <Button variant="default">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">Selanjutnya</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
