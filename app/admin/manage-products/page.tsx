"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import AdminLayout from "@/components/layouts/AdminLayout";
import { PencilIcon, Trash } from "lucide-react";

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
  description: string;
};

export default function ProductsPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Book>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Gagal mengambil data buku:", error);
    } else {
      setBooks(data as Book[]);
    }
    setIsLoading(false);
  };

  const handleAdd = async () => {
    const { data, error } = await supabase
      .from("books")
      .insert([
        {
          title: "Judul Baru",
          author: "Penulis Baru",
          price: 0,
          original_price: 0,
          rating: 0,
          reviews: 0,
          image: "/placeholder.svg",
          category: "Uncategorized",
          bestseller: false,
          description: "Deskripsi buku baru",
        },
      ])
      .select();

    if (error) {
      alert("Gagal menambah buku");
      console.error(error);
    } else {
      setBooks((prev) => [...prev, ...(data as Book[])]);
    }
  };

  const handleEdit = (book: Book) => {
    setIsEditing(book.id);
    setFormData(book);
  };

  const handleSave = async () => {
    if (!isEditing) return;

    const { data, error } = await supabase
      .from("books")
      .update(formData)
      .eq("id", isEditing)
      .select();

    if (error) {
      alert("Gagal menyimpan perubahan");
      console.error(error);
    } else {
      setBooks((prev) =>
        prev.map((book) =>
          book.id === isEditing ? ({ ...book, ...formData } as Book) : book
        )
      );
      setIsEditing(null);
      setFormData({});
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Yakin ingin menghapus buku ini?");
    if (!confirmed) return;

    const { error } = await supabase.from("books").delete().eq("id", id);

    if (error) {
      alert("Gagal menghapus buku");
      console.error(error);
    } else {
      setBooks((prev) => prev.filter((book) => book.id !== id));
    }
  };

  return (
    <AdminLayout>
      <div className="lg:p-6">
        <div className="container mx-auto px-2 lg:px-4">
          <div className="lg:flex justify-between items-center lg:mb-6">
            <h1 className="text-2xl font-bold">Manajemen Produk</h1>
            <Button className="my-2" onClick={handleAdd}>
              + Tambah Produk
            </Button>
          </div>

          {isLoading ? (
            <p className="text-gray-500">Memuat data buku...</p>
          ) : (
            <div className="space-y-5 gap-5">
              {books.map((book) => (
                <div key={book.id} className="">
                  {isEditing === book.id ? (
                    <div className="space-y-2">
                      <input
                        value={formData.image || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, image: e.target.value })
                        }
                        placeholder="Judul"
                        className="w-full p-2 border rounded"
                      />
                      <input
                        value={formData.title || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        placeholder="Judul"
                        className="w-full p-2 border rounded"
                      />
                      <input
                        value={formData.author || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, author: e.target.value })
                        }
                        placeholder="Penulis"
                        className="w-full p-2 border rounded"
                      />
                      <input
                        value={formData.price || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, price: e.target.value })
                        }
                        placeholder="Price"
                        className="w-full p-2 border rounded"
                      />
                      <input
                        value={formData.bestseller || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            bestseller: e.target.value,
                          })
                        }
                        placeholder="Best Seller"
                        className="w-full p-2 border rounded"
                      />
                      <input
                        value={formData.category || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        placeholder="Best Seller"
                        className="w-full p-2 border rounded"
                      />
                      <Button onClick={handleSave}>Simpan</Button>
                    </div>
                  ) : (
                    <div className="">
                      <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-row">
                        <div className="relative w-32 flex-shrink-0">
                          <Image
                            src={book.image || "/placeholder.svg"}
                            alt={book.title}
                            width={500}
                            height={200}
                            className="group-hover:scale-105 transition-transform duration-300 w-full h-full"
                          />
                          {book.bestseller && (
                            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                              Bestseller
                            </Badge>
                          )}
                        </div>
                        <CardContent className="p-4 flex-1 flex flex-col justify-between">
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
                            <p className="text-sm text-slate-600 line-clamp-2">
                              {book.description}
                            </p>
                          </div>
                          <div className="text-end mt-4 space-x-2">
                            <Button size="sm" onClick={() => handleEdit(book)}>
                              <PencilIcon />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDelete(book.id)}
                            >
                              <Trash />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
