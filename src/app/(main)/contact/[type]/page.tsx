interface ContactTypeParams {
  params: Promise<{ type: string }>
}

export default async function ContactType({ params }: ContactTypeParams) {
  const data = await params
  console.log(data)

  return (
    <div>
      <h1>Contact Type</h1>
      {data.type}
    </div>
  )
}