"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, BookOpen, Users, Award } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { createSupabaseBrowserClient } from '@/lib/supabaseClient';



type Book = {
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
};

export default function HomePage() {
  const supabase = createSupabaseBrowserClient();
  const [bestsellerBooks, setBestsellerBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoriesFromBooks, setCategoriesFromBooks] = useState<
    { name: string; count: number }[]
  >([]);
  const slugify = (str: string) =>
    str
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

  useEffect(() => {
    const fetchBestsellerBooks = async () => {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .eq("bestseller", true)
        .limit(4)
        .order("id", { ascending: true });

      if (error) {
        console.error("Gagal mengambil data:", error);
      } else {
        setBestsellerBooks(data as Book[]);
      }
      setLoading(false);
    };

    fetchBestsellerBooks();
  }, []);

  useEffect(() => {
    const fetchBestsellerBooks = async () => {
      const { data, error } = await supabase.from("books").select("*");

      if (error) {
        console.error("Gagal mengambil data:", error);
      } else {
        setBestsellerBooks(data as Book[]);

        // Dapatkan kategori unik dan jumlah buku di setiap kategori
        const groupedCategories = (data as Book[]).reduce((acc, book) => {
          const categoryName = book.category || "Uncategorized";
          if (!acc[categoryName]) {
            acc[categoryName] = 1;
          } else {
            acc[categoryName] += 1;
          }
          return acc;
        }, {} as Record<string, number>);

        // Ubah ke array dan simpan di state
        const categoryArray = Object.entries(groupedCategories).map(
          ([name, count]) => ({
            name,
            count,
          })
        );
        setCategoriesFromBooks(categoryArray);
      }
      setLoading(false);
    };

    fetchBestsellerBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-amber-500 text-amber-900 hover:bg-amber-400">
                  📚 Koleksi Terlengkap
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Temukan Buku
                  <span className="text-amber-400 block">Impian Anda</span>
                </h1>
                <p className="text-xl text-slate-300 leading-relaxed">
                  Jelajahi ribuan buku dari berbagai genre. Dari klasik hingga
                  kontemporer, temukan bacaan yang sempurna untuk setiap momen.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/books">
                  <Button
                    size="lg"
                    className="bg-amber-500 hover:bg-amber-600 text-amber-900 font-semibold px-8"
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Mulai Belanja
                  </Button>
                </Link>
                <Link href="/books/best-seller">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-slate-900 bg-transparent"
                  >
                    Lihat Koleksi
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">10K+</div>
                  <div className="text-slate-400 text-sm">Buku Tersedia</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">50K+</div>
                  <div className="text-slate-400 text-sm">Pelanggan Puas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">4.9</div>
                  <div className="text-slate-400 text-sm">Rating Toko</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <Image
                  src="/coverFullNightStalkerss.jpg"
                  alt="Stack of books"
                  width={500}
                  height={600}
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Jelajahi Kategori
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Temukan buku favorit Anda dari berbagai kategori pilihan
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categoriesFromBooks.map((category, index) => {
              return (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-white/80 backdrop-blur-sm"
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-100 transition-colors">
                      {/* <Icon className="h-6 w-6 text-slate-600 group-hover:text-amber-600" /> */}
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {category.count} buku
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                Buku Pilihan
              </h2>
              <p className="text-slate-600 text-lg">
                Koleksi terbaik yang direkomendasikan untuk Anda
              </p>
            </div>
            <Link href="/books">
              <Button
                variant="outline"
                className="hidden sm:flex bg-transparent"
              >
                Lihat Semua
              </Button>
            </Link>
          </div>

          {loading ? (
            <p className="text-slate-500">Memuat buku bestseller...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {bestsellerBooks.map((book) => (
                <Link
                  href={`books/detail-book/${book.id}/${slugify(book.title)}`}
                  key={book.id}
                >
                  <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white overflow-hidden">
                    <div className="relative">
                      <Image
                        src={book.image || "/placeholder.svg"}
                        alt={book.title}
                        width={0}
                        height={0}
                        className="h-[500px] w-full group-hover:scale-105 transition-transform duration-300"
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
                    <CardContent className="p-6">
                      <div className="space-y-3">
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
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-slate-900">
                              Rp{book.price.toLocaleString("id-ID")}
                            </span>
                            <span className="text-sm text-slate-500 line-through">
                              Rp{book.original_price.toLocaleString("id-ID")}
                            </span>
                          </div>
                          <Button
                            size="sm"
                            className="bg-amber-500 hover:bg-amber-600 text-amber-900"
                          >
                            Beli
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
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

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Mengapa Memilih Kami?
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Pengalaman berbelanja buku terbaik dengan layanan yang memuaskan
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-200 transition-colors">
                <ShoppingCart className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Pengiriman Cepat
              </h3>
              <p className="text-slate-600">
                Pengiriman gratis untuk pembelian di atas $50 dengan estimasi
                2-3 hari kerja
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-200 transition-colors">
                <BookOpen className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Koleksi Lengkap
              </h3>
              <p className="text-slate-600">
                Ribuan judul buku dari berbagai genre dan penerbit terpercaya
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-200 transition-colors">
                <Award className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Kualitas Terjamin
              </h3>
              <p className="text-slate-600">
                Semua buku dalam kondisi baru dan berkualitas dengan garansi
                kepuasan
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Dapatkan Update Terbaru
            </h2>
            <p className="text-slate-300 text-lg mb-8">
              Berlangganan newsletter kami untuk mendapatkan informasi buku
              baru, promo menarik, dan rekomendasi bacaan terbaik
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Masukkan email Anda"
                className="flex-1 px-4 py-3 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <Button className="bg-amber-500 hover:bg-amber-600 text-amber-900 font-semibold px-8">
                Berlangganan
              </Button>
            </div>
            <p className="text-xs text-slate-400 mt-4">
              Kami menghargai privasi Anda. Tidak ada spam, hanya update
              berkualitas.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
