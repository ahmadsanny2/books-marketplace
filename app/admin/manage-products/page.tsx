"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import AdminLayout from "@/components/layouts/AdminLayout";

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
    const { data, error } = await supabase.from("books").select("*");

    if (error) {
      console.error("Gagal mengambil data buku:", error);
    } else {
      setBooks(data as Book[]);
    }
    setIsLoading(false);
  };

  const handleAdd = async () => {
    const { data, error } = await supabase.from("books").insert([
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
    ]).select();

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
          book.id === isEditing ? { ...book, ...formData } as Book : book
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


      <div className="p-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Manajemen Produk</h1>
            <Button onClick={handleAdd}>+ Tambah Produk</Button>
          </div>

          {isLoading ? (
            <p className="text-gray-500">Memuat data buku...</p>
          ) : (
            <div className="space-y-6">
              {books.map((book) => (
                <div key={book.id} className="p-4 border rounded shadow">
                  {isEditing === book.id ? (
                    <div className="space-y-2">
                      <input
                        value={formData.image || ""}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="Judul"
                        className="w-full p-2 border rounded"
                      />
                      <input
                        value={formData.title || ""}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Judul"
                        className="w-full p-2 border rounded"
                      />
                      <input
                        value={formData.author || ""}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        placeholder="Penulis"
                        className="w-full p-2 border rounded"
                      />
                      <input
                        value={formData.price || ""}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        placeholder="Price"
                        className="w-full p-2 border rounded"
                      />
                      <input
                        value={formData.bestseller || ""}
                        onChange={(e) => setFormData({ ...formData, bestseller: e.target.value })}
                        placeholder="Best Seller"
                        className="w-full p-2 border rounded"
                      />
                      <input
                        value={formData.category || ""}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        placeholder="Best Seller"
                        className="w-full p-2 border rounded"
                      />
                      <Button onClick={handleSave}>Simpan</Button>
                    </div>
                  ) : (
                    <>
                      <h2 className="font-semibold text-lg">{book.title}</h2>
                      <p className="text-sm text-gray-600">{book.author}</p>
                      <div className="flex space-x-2 mt-2">
                        <Button size="sm" onClick={() => handleEdit(book)}>
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(book.id)}
                        >
                          Hapus
                        </Button>
                      </div>
                    </>
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
