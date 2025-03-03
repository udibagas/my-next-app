export default async function ContactProvider({ params }: { params: Promise<{ type: string, provider: string }> }) {
  const data = await params
  console.log(data)

  return (
    <div>
      <h1>Contact Provider</h1>
      {data.type} - {data.provider}
    </div>
  )
}