import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star } from "lucide-react";

type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  original_price: number;
  category: string;
  rating: number;
  reviews: number;
  image: string;
  bestseller: boolean;
};

export default async function BookDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: book, error } = await supabase
    .from("books")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!book || error) {
    return notFound();
  }

  return (
    <div className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="flex space-x-10 justify-center">
          {/* Gambar Buku */}
          <div className="p-2 shadow-md rounded-md">
            <Image
              src={book.image || "/placeholder.svg"}
              alt={book.title}
              width={500}
              height={500}
              className="h-[500px] w-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-md"
            />
          </div>

          {/* Informasi Buku */}
          <div className="w-full lg:w-1/2 space-y-4">
            <h1 className="text-3xl font-bold text-slate-900">{book.title}</h1>
            <p className="text-lg text-slate-700">oleh {book.author}</p>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              <span className="font-medium text-slate-800">{book.rating}</span>
              <span className="text-sm text-slate-500">
                ({book.reviews} ulasan)
              </span>
            </div>
            <div className="space-x-2">
              <Badge className="bg-blue-100 text-blue-800">
                {book.category}
              </Badge>
              {book.bestseller && (
                <Badge className="bg-red-500 text-white">Bestseller</Badge>
              )}
            </div>
            <p className="text-slate-700">{book.description}</p>

            <div className="flex items-center gap-4 mt-4">
              <span className="text-2xl font-bold text-slate-900">
                Rp{book.price.toLocaleString("id-ID")}
              </span>
              <span className="text-base text-slate-500 line-through">
                Rp{book.original_price.toLocaleString("id-ID")}
              </span>
            </div>

            <button className="mt-4 flex items-center bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Tambah ke Keranjang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
