import ModelUser from "@/app/models/ModelUser"

export default async function UserPage() {
  const users = await ModelUser.findAll()
  console.log(users)

  return (
    <div className="text-center p-8">
      <h1>Users</h1>

      <ul>
        {users.map((user) => (
          <li key={user._id.toString()}>
            {user.email}
          </li>
        ))}
      </ul>
    </div>
  )
}