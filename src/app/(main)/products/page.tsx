import { IProduct } from "@/app/definitions/product"

export default async function ProductPage() {
  const res = await fetch('http://localhost:3000/api/products')
  const products: IProduct[] = await res.json()
  console.log(products)

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl">Product Page</h1>

      <div className="flex gap-4 flex-wrap">
        {products.map(product => {
          return (
            <div key={product.id} className="border p-2 my-2 w-[300px]">
              <img src={product.image} alt={product.title} className="w-32 h-32 object-cover" />
              <h2 className="text-xl">{product.title}</h2>
              <p>${product.price}</p>
            </div>
          )
        })}
      </div>

    </div>
  )
}