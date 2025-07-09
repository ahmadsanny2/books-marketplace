"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  BookOpen,
  Search,
  ShoppingCart,
  User,
  Menu,
  Heart,
  Bell,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

type NavbarProps = {
  otherMenu?: React.ReactNode;
};

export function Navbar({ otherMenu }: NavbarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
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
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-amber-500 rounded-lg">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">BookStore</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className="text-slate-700 hover:text-amber-600 font-medium transition-colors"
            >
              Beranda
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-slate-700 hover:text-amber-600 font-medium transition-colors">
                Kategori
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {uniqueCategories.map((category, index) => (
                  <DropdownMenuItem key={index}>
                    <Link href={`/category/${encodeURIComponent(category)}`}>
                      {category}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link
              href="/books"
              className="text-slate-700 hover:text-amber-600 font-medium transition-colors"
            >
              Semua Buku
            </Link>
            <Link
              href="/books/best-seller"
              className="text-slate-700 hover:text-amber-600 font-medium transition-colors"
            >
              Best Seller
            </Link>
            <Link
              href="/about"
              className="text-slate-700 hover:text-amber-600 font-medium transition-colors"
            >
              Tentang
            </Link>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex items-center flex-1 max-w-sm mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  window.location.href = `/books?q=${encodeURIComponent(
                    searchTerm
                  )}`;
                }}
              >
                <Input
                  placeholder="Cari buku, penulis, atau kategori..."
                  className="pl-10 pr-4 w-full"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
                />
              </form>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Button - Mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex relative"
            >
              <Heart className="h-5 w-5" />
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
                3
              </Badge>
            </Button>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex relative"
            >
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-amber-500">
                2
              </Badge>
            </Button>

            {/* Shopping Cart */}
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-amber-500">
                5
              </Badge>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profil Saya</DropdownMenuItem>
                <DropdownMenuItem>Pesanan Saya</DropdownMenuItem>
                <DropdownMenuItem>Wishlist</DropdownMenuItem>
                <DropdownMenuItem>Pengaturan</DropdownMenuItem>
                <DropdownMenuItem>Keluar</DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/admin/dashboard">Admin</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>{otherMenu}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  <Link href="/" className="text-lg font-medium">
                    Beranda
                  </Link>
                  <Link href="/all-books" className="text-lg font-medium">
                    Semua Buku
                  </Link>
                  <Link href="/books/best-seller" className="text-lg font-medium">
                    Best Seller
                  </Link>
                  <div className="space-y-2">
                    <p className="text-lg font-medium">Kategori</p>
                    <div className="pl-4 space-y-2">
                      <Link
                        href="/category/fiction"
                        className="block text-slate-600"
                      >
                        Fiction
                      </Link>
                      <Link
                        href="/category/non-fiction"
                        className="block text-slate-600"
                      >
                        Non-Fiction
                      </Link>
                      <Link
                        href="/category/science"
                        className="block text-slate-600"
                      >
                        Science
                      </Link>
                      <Link
                        href="/category/history"
                        className="block text-slate-600"
                      >
                        History
                      </Link>
                    </div>
                  </div>
                  <Link href="/about" className="text-lg font-medium">
                    Tentang
                  </Link>
                  <div className="pt-4 border-t">
                    <Link
                      href="/wishlist"
                      className="block text-slate-600 mb-2"
                    >
                      Wishlist
                    </Link>
                    <Link href="/profile" className="block text-slate-600 mb-2">
                      Profil Saya
                    </Link>
                    <Link href="/orders" className="block text-slate-600">
                      Pesanan Saya
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="lg:hidden py-4 border-t">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Cari buku, penulis, atau kategori..."
                className="pl-10 pr-4 w-full"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
