"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import AdminLayout from "@/components/layouts/AdminLayout";
import { PencilIcon, Trash } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

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
  const supabase = useSupabaseClient();
  const [books, setBooks] = useState<Book[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Book>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newImageFile, setNewImageFile] = useState<File | null>(null)

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
    let uploadedImageUrl = "/placeholder.svg";

    if (newImageFile) {
      try {
        uploadedImageUrl = await uploadImage(newImageFile);
      } catch (err) {
        alert("Gagal mengupload gambar");
        console.error(err);
        return;
      }
    }

    const { data, error } = await supabase
      .from("books")
      .insert([
        {
          ...formData,
          image: uploadedImageUrl,
          original_price: formData.original_price || 0,
          rating: formData.rating || 0,
          reviews: formData.reviews || 0,
          bestseller: formData.bestseller || false,
          description: formData.description || "",
        },
      ])
      .select();

    if (error) {
      alert("Gagal menambah buku");
      console.error(error);
    } else {
      setBooks((prev) => [...prev, ...(data as Book[])]);
      setFormData({});
      setNewImageFile(null);
      setIsAddModalOpen(false);
    }
  };


  const handleEdit = (book: Book) => {
    setIsEditing(book.id);
    setFormData(book);
  };

  const handleSave = async () => {
    if (!isEditing) return;

    let imageUrl = formData.image;

    try {
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const { data, error } = await supabase
        .from("books")
        .update({
          ...formData,
          image: imageUrl,
          price: Number(formData.price),
          original_price: Number(formData.original_price),
          rating: Number(formData.rating),
          reviews: Number(formData.reviews),
          bestseller: Boolean(formData.bestseller),
        })
        .eq("id", isEditing)
        .select();

      if (error) {
        alert("Gagal menyimpan perubahan");
        console.error(error);
      } else {
        setBooks((prev) =>
          prev.map((book) =>
            book.id === isEditing ? { ...book, ...formData, image: imageUrl } as Book : book
          )
        );
        setIsEditing(null);
        setFormData({});
        setImageFile(null);
      }
    } catch (err) {
      console.error(err);
      alert("Gagal mengunggah gambar");
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

  const uploadImage = async (file: File): Promise<string> => {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("book-images")
      .upload(`books/${fileName}`, file);

    if (error) {
      console.error("Upload Error:", error);
      throw new Error("Gagal upload gambar");
    }

    const { data: publicUrl } = supabase.storage
      .from("book-images")
      .getPublicUrl(`books/${fileName}`);

    return publicUrl.publicUrl;
  };



  return (
    <AdminLayout>
      <div className="lg:p-6">
        <div className="container mx-auto px-2 lg:px-4">
          <div className="lg:flex justify-between items-center lg:mb-6">
            <h1 className="text-2xl font-bold">Manajemen Produk</h1>
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button className="my-2">+ Tambah Produk</Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>
                    Tambah Produk Baru
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        setNewImageFile(e.target.files[0]);
                      }
                    }}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    placeholder="Judul"
                    className="w-full p-2 border rounded"
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                  <input
                    placeholder="Penulis"
                    className="w-full p-2 border rounded"
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  />
                  <input
                    type="number"
                    placeholder="Harga"
                    className="w-full p-2 border rounded"
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  />
                  {/* Tambah field lain jika perlu */}
                </div>

                <DialogFooter>
                  <Button
                    onClick={async () => {
                      await handleAdd();
                      setIsAddModalOpen(false);
                    }}
                  >
                    Simpan
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {isLoading ? (
            <p className="text-gray-500">Memuat data buku...</p>
          ) : (
            <div className="space-y-5 gap-5">
              {books.map((book) => (
                <div key={book.id}>
                  {isEditing === book.id ? (
                    <div className="space-y-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            setImageFile(e.target.files[0]);
                          }
                        }}
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
                          setFormData({ ...formData, price: Number(e.target.value) })
                        }
                        placeholder="Harga"
                        className="w-full p-2 border rounded"
                      />
                      <input
                        value={formData.original_price || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, original_price: Number(e.target.value) })
                        }
                        placeholder="Harga Asli"
                        className="w-full p-2 border rounded"
                      />
                      <input
                        value={formData.rating || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, rating: Number(e.target.value) })
                        }
                        placeholder="Rating"
                        className="w-full p-2 border rounded"
                      />
                      <input
                        value={formData.reviews || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, reviews: Number(e.target.value) })
                        }
                        placeholder="Jumlah Ulasan"
                        className="w-full p-2 border rounded"
                      />
                      <input
                        value={formData.category || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        placeholder="Kategori"
                        className="w-full p-2 border rounded"
                      />
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.bestseller || false}
                          onChange={(e) =>
                            setFormData({ ...formData, bestseller: e.target.checked })
                          }
                        />
                        <label>Best Seller</label>
                      </div>
                      <textarea
                        value={formData.description || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, description: e.target.value })
                        }
                        placeholder="Deskripsi"
                        className="w-full p-2 border rounded"
                      />
                      <Button onClick={handleSave}>Simpan</Button>
                    </div>
                  ) : (
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
                          <h3 className="font-semibold text-slate-900 line-clamp-2 group-hover:text-amber-600 transition-colors">
                            {book.title}
                          </h3>
                          <p className="text-sm text-slate-600">{book.author}</p>
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
