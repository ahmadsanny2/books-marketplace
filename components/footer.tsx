"use client";

import Link from "next/link";
import {
  BookOpen,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export function Footer() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .order("id", { ascending: true });
      if (error) {
        console.log("Gagal mengambil data buku", error);
      } else {
        setBooks(data as Book[]);
      }
    };
    fetchBooks();
  }, []);

  const uniqueCategories = Array.from(
    new Set(books.map((book) => book.category))
  ).filter(Boolean);

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-amber-500 rounded-lg">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">BookStore</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Marketplace buku terlengkap dengan koleksi dari berbagai genre.
              Temukan bacaan favorit Anda dengan harga terbaik.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-400 hover:text-white"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-400 hover:text-white"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-400 hover:text-white"
              >
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Tautan Cepat</h3>
            <div className="space-y-2">
              <Link
                href="/books"
                className="block text-slate-300 hover:text-white transition-colors"
              >
                Semua Buku
              </Link>
              <Link
                href="/bestsellers"
                className="block text-slate-300 hover:text-white transition-colors"
              >
                Bestseller
              </Link>
              <Link
                href="/new-releases"
                className="block text-slate-300 hover:text-white transition-colors"
              >
                Rilis Terbaru
              </Link>
              <Link
                href="/deals"
                className="block text-slate-300 hover:text-white transition-colors"
              >
                Penawaran Khusus
              </Link>
              <Link
                href="/authors"
                className="block text-slate-300 hover:text-white transition-colors"
              >
                Penulis
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Kategori</h3>
            <div className="space-y-2">
              {uniqueCategories.map((category, index) => (
                <Link
                  key={index}
                  href="/category/fiction"
                  className="block text-slate-300 hover:text-white transition-colors"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Hubungi Kami</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-slate-400" />
                <span className="text-slate-300 text-sm">
                  Jl. Sudirman No. 123, Jakarta
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-slate-400" />
                <span className="text-slate-300 text-sm">+62 21 1234 5678</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-slate-400" />
                <span className="text-slate-300 text-sm">
                  info@bookstore.com
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Newsletter</h4>
              <div className="flex space-x-2">
                <Input
                  placeholder="Email Anda"
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
                />
                <Button className="bg-amber-500 hover:bg-amber-600 text-amber-900">
                  Kirim
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-slate-400 text-sm">
              © 2024 BookStore. Semua hak dilindungi.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Kebijakan Privasi
              </Link>
              <Link
                href="/terms"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Syarat & Ketentuan
              </Link>
              <Link
                href="/help"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Bantuan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
