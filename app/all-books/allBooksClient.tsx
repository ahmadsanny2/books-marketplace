"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Star, ShoppingCart, Filter, Grid, List } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export type Book = {
  id: string;
  title: string;
  author: string;
  price: number;
  original_price: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  bestseller: boolean;
  description: string;
};

export default function AllBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("popularity");
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("q") || "";

  useEffect(() => {
    const fetchBooks = async () => {
      const { data, error } = await supabase.from("books")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Gagal mengambil data buku:", error);
      } else {
        setBooks(data as Book[]);
      }
      setIsLoading(false);
    };

    fetchBooks();
  }, []);

  // Dapatkan kategori unik dari buku
  const uniqueCategories = Array.from(new Set(books.map((book) => book.category)));

  const filteredBooks = books.filter((book) => {
    const matchSearch = `${book.title}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(book.category);

    const matchPrice = (() => {
      if (!priceRange) return true;
      if (priceRange === "50+") return book.price > 50;
      const [min, max] = priceRange.split("-").map(Number);
      return book.price >= min && book.price <= max;
    })();

    return matchSearch && matchCategory && matchPrice;
  });

  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories((prev) =>
      checked ? [...prev, category] : prev.filter((c) => c !== category)
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Semua Buku
          </h1>
          <p className="text-slate-600 text-lg">
            Jelajahi koleksi lengkap buku kami dari berbagai kategori
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filter */}
          <div className="lg:w-64 space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
                <Filter className="h-4 w-4 mr-2" /> Filter
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    Cari Buku
                  </label>
                  <Input
                    placeholder="Judul atau penulis..."
                    value={searchTerm}
                    readOnly
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-3 block">
                    Kategori
                  </label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {uniqueCategories.map((category, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox
                          id={category}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={(checked) =>
                            handleCategoryChange(category, checked as boolean)
                          }
                        />
                        <label
                          htmlFor={category}
                          className="text-sm text-slate-600 cursor-pointer"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    Rentang Harga
                  </label>
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
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="text-slate-600">
                Menampilkan {filteredBooks.length} dari {books.length} buku
              </div>
              <div className="flex items-center gap-4 max-lg:justify-between max-lg:w-full">
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

            {/* Book Cards */}
            {isLoading ? (
              <p className="text-slate-500">Memuat buku...</p>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {filteredBooks.map((book) => (
                  <Link key={book.id} href={`/books/${book.id}`} className="block">
                    <Card
                      className={`group hover:shadow-lg transition-all duration-300 overflow-hidden ${viewMode === "list" ? "flex flex-row" : ""
                        }`}
                    >
                      <div
                        className={`relative ${viewMode === "list" ? "w-32 flex-shrink-0" : ""
                          }`}
                      >
                        <Image
                          src={book.image || "/placeholder.svg"}
                          alt={book.title}
                          width={500}
                          height={viewMode === "list" ? 200 : 500}
                          className={`group-hover:scale-105 transition-transform duration-300 ${viewMode === "list" ? "w-full h-full" : "w-full h-[500px]"
                            }`}
                        />
                        {book.bestseller && (
                          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                            Bestseller
                          </Badge>
                        )}
                      </div>
                      <CardContent
                        className={`p-4 ${viewMode === "list"
                          ? "flex-1 flex flex-col justify-between"
                          : ""
                          }`}
                      >
                        <div className="space-y-2">
                          <Badge variant="secondary" className="text-xs">
                            {book.category}
                          </Badge>
                          <div>
                            <h3 className="font-semibold text-slate-900 line-clamp-2 group-hover:text-amber-600 transition-colors">
                              {book.title}
                            </h3>
                            <p className="text-sm text-slate-600 mt-1">
                              {book.author}
                            </p>
                          </div>
                          {viewMode === "list" && (
                            <p className="text-sm text-slate-600 line-clamp-2">
                              {book.description}
                            </p>
                          )}
                          <div className="flex items-center gap-2">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                              <span className="text-sm font-medium ml-1">
                                {book.rating}
                              </span>
                            </div>
                            <span className="text-xs text-slate-500">
                              ({book.reviews} ulasan)
                            </span>
                          </div>
                        </div>
                        <div
                          className={`flex items-center justify-between ${viewMode === "list" ? "mt-4" : "mt-3"
                            }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-slate-900">
                              ${book.price}
                            </span>
                            <span className="text-sm text-slate-500 line-through">
                              ${book.original_price}
                            </span>
                          </div>
                          <Button
                            size="sm"
                            className="bg-amber-500 hover:bg-amber-600 text-amber-900"
                          >
                            <ShoppingCart className="h-4 w-4 mr-1" /> Beli
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
