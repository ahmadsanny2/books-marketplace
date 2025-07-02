import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, BookOpen, Users, Award } from "lucide-react"

const featuredBooks = [
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
  },
]

const categories = [
  { name: "Fiction", count: 1250, icon: BookOpen },
  { name: "Non-Fiction", count: 890, icon: Users },
  { name: "Science", count: 567, icon: Award },
  { name: "History", count: 432, icon: BookOpen },
  { name: "Biography", count: 321, icon: Users },
  { name: "Children", count: 654, icon: Award },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-amber-500 text-amber-900 hover:bg-amber-400">📚 Koleksi Terlengkap</Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Temukan Buku
                  <span className="text-amber-400 block">Impian Anda</span>
                </h1>
                <p className="text-xl text-slate-300 leading-relaxed">
                  Jelajahi ribuan buku dari berbagai genre. Dari klasik hingga kontemporer, temukan bacaan yang sempurna
                  untuk setiap momen.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-amber-900 font-semibold px-8">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Mulai Belanja
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-slate-900 bg-transparent"
                >
                  Lihat Koleksi
                </Button>
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
                  src="/placeholder.svg?height=600&width=500"
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
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Jelajahi Kategori</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Temukan buku favorit Anda dari berbagai kategori pilihan
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon
              return (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-white/80 backdrop-blur-sm"
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-100 transition-colors">
                      <Icon className="h-6 w-6 text-slate-600 group-hover:text-amber-600" />
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-1">{category.name}</h3>
                    <p className="text-sm text-slate-500">{category.count} buku</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Buku Pilihan</h2>
              <p className="text-slate-600 text-lg">Koleksi terbaik yang direkomendasikan untuk Anda</p>
            </div>
            <Link href="/books">
              <Button variant="outline" className="hidden sm:flex bg-transparent">
                Lihat Semua
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredBooks.map((book) => (
              <Card
                key={book.id}
                className="group hover:shadow-xl transition-all duration-300 border-0 bg-white overflow-hidden"
              >
                <div className="relative">
                  <Image
                    src={book.image || "/placeholder.svg"}
                    alt={book.title}
                    width={200}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {book.bestseller && (
                    <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">Bestseller</Badge>
                  )}
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
                        <span className="text-sm text-slate-500 line-through">${book.originalPrice}</span>
                      </div>
                      <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-amber-900">
                        Beli
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Mengapa Memilih Kami?</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Pengalaman berbelanja buku terbaik dengan layanan yang memuaskan
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-200 transition-colors">
                <ShoppingCart className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Pengiriman Cepat</h3>
              <p className="text-slate-600">
                Pengiriman gratis untuk pembelian di atas $50 dengan estimasi 2-3 hari kerja
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-200 transition-colors">
                <BookOpen className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Koleksi Lengkap</h3>
              <p className="text-slate-600">Ribuan judul buku dari berbagai genre dan penerbit terpercaya</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-200 transition-colors">
                <Award className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Kualitas Terjamin</h3>
              <p className="text-slate-600">Semua buku dalam kondisi baru dan berkualitas dengan garansi kepuasan</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Dapatkan Update Terbaru</h2>
            <p className="text-slate-300 text-lg mb-8">
              Berlangganan newsletter kami untuk mendapatkan informasi buku baru, promo menarik, dan rekomendasi bacaan
              terbaik
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
              Kami menghargai privasi Anda. Tidak ada spam, hanya update berkualitas.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
