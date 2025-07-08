"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

// ✅ Tambahkan tipe Book
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

// ✅ Ubah nama komponen agar diawali huruf kapital
export default function BestSellerPage() {
  const [bestsellerBooks, setBestsellerBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBestsellerBooks = async () => {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .eq("bestseller", true);

      if (error) {
        console.error("Gagal mengambil data:", error);
      } else {
        setBestsellerBooks(data as Book[]);
      }
      setLoading(false);
    };
    
    fetchBestsellerBooks();
  }, []);

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Buku Pilihan</h2>
            <p className="text-slate-600 text-lg">Koleksi terbaik yang direkomendasikan untuk Anda</p>
          </div>
          <Link href="/books">
            <Button variant="outline" className="hidden sm:flex bg-transparent">Lihat Semua</Button>
          </Link>
        </div>

        {loading ? (
          <p className="text-slate-500">Memuat buku bestseller...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestsellerBooks.map((book) => (
              <Card
                key={book.id}
                className="group hover:shadow-xl transition-all duration-300 border-0 bg-white overflow-hidden"
              >
                <div className="relative">
                  <Image
                    src={book.image || "/placeholder.svg"}
                    alt={book.title}
                    width={500}
                    height={500}
                    className="h-[500px] w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">
                    Bestseller
                  </Badge>
                  <Button
                    size="sm"
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-slate-900 hover:bg-slate-100"
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
                <CardContent className="p-6 space-y-3">
                  <Badge variant="secondary" className="text-xs">
                    {book.category}
                  </Badge>
                  <div>
                    <h3 className="font-semibold text-slate-900 line-clamp-2 group-hover:text-amber-600 transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">{book.author}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium ml-1">{book.rating}</span>
                    </div>
                    <span className="text-xs text-slate-500">({book.reviews} ulasan)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-slate-900">${book.price}</span>
                      <span className="text-sm text-slate-500 line-through">${book.original_price}</span>
                    </div>
                    <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-amber-900">
                      Beli
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-8 sm:hidden">
          <Link href="/books">
            <Button variant="outline">Lihat Semua Buku</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
