import UserModel from "@/app/models/UserModel"

export default async function UserPage() {
  const users = await UserModel.findAll()

  return (
    <div className="text-center p-8">
      <h1>Users</h1>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.email}
          </li>
        ))}
      </ul>
    </div>
  )
}