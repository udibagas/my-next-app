import User from "@/app/models/User"

export default async function UserPage() {
  const users = await User.findAll()

  return (
    <div className="text-center p-8">
      <h1>Users</h1>

      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.email}
          </li>
        ))}
      </ul>
    </div>
  )
}