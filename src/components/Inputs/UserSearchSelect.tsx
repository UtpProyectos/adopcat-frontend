import {
  Input,
  Select,
  SelectItem,
  Avatar,
  Spinner,
  Chip,
} from "@heroui/react"
import { useEffect, useState } from "react"
import { userService } from "@/services/user"
import { User } from "@/models/user"

interface Props {
  onSelect: (user: User) => void
  organizationMembersIds: string[]
}

export default function UserSearchSelect({
  onSelect,
  organizationMembersIds,
}: Props) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<User[]>([])
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      if (!query) {
        setResults([])
        return
      }
      setLoading(true)
      try {
        const res = await userService.searchUsers(query)
        const filtered = res.data.filter(
          (u: User) => !organizationMembersIds.includes(u.userId)
        )
        setResults(filtered)
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    }

    const delay = setTimeout(fetch, 400)
    return () => clearTimeout(delay)
  }, [query, organizationMembersIds])

  const selectedUser = results.find((u) => u.userId === selectedUserId)

  return (
    <div className="w-full">
      <Input
        placeholder="Buscar usuario por nombre o correo"
        value={query}
        onValueChange={setQuery}
        isClearable
        isDisabled={loading}
        className="mb-2"
      />

      {loading && <Spinner label="Buscando..." />}

      {!loading && results.length > 0 && (
        <Select
          label="Selecciona un usuario"
          placeholder="Selecciona uno"
          className="w-full"
          selectionMode="single"
          selectedKeys={selectedUserId ? [selectedUserId] : []}
          items={results}
          onSelectionChange={(keys) => {
            const selectedKey = Array.from(keys)[0] as string
            const selected = results.find((u) => u.userId === selectedKey)
            if (selected) {
              setSelectedUserId(selected.userId)
              onSelect(selected)
            }
          }}
          renderValue={(items) => (
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <Chip key={item.key}>
                  {item.data?.firstName} {item.data?.lastName}
                </Chip>
              ))}
            </div>
          )}
        >
          {(user) => (
            <SelectItem
              key={user.userId}
              textValue={`${user.firstName} ${user.lastName}`}
            >
              <div className="flex gap-2 items-center">
                <Avatar
                  alt={user.firstName}
                  className="flex-shrink-0"
                  size="sm"
                  src={user.profilePhoto}
                />
                <div className="flex flex-col">
                  <span className="text-small">
                    {user.firstName} {user.lastName}
                  </span>
                  <span className="text-tiny text-default-400">
                    {user.email}
                  </span>
                </div>
              </div>
            </SelectItem>
          )}
        </Select>
      )}

      {!loading && query && results.length === 0 && (
        <p className="text-sm text-default-500 mt-2">
          No se encontraron usuarios.
        </p>
      )}
    </div>
  )
}
