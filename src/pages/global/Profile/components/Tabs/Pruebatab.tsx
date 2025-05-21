import { User } from "@heroui/react";
import GenericTable, { Column, StatusOption } from "../../../../../components/Tables/GenericTable";

interface User {
  id: number;
  name: string;
  age: number;
  role: string;
  team: string;
  email: string;
  status: string;
  avatar?: string;
}

const columns: Column<User>[] = [
  { name: "ID", uid: "id", sortable: true },
  {
    name: "Name",
    uid: "name",
    sortable: true,
    render: (user) => (
      <User avatarProps={{ radius: "lg", src: user.avatar }} name={user.name} description={user.email} />
    ),
  },
  { name: "Age", uid: "age", sortable: true },
  { name: "Role", uid: "role", sortable: true },
  { name: "Team", uid: "team" },
  { name: "Email", uid: "email" },
  { name: "Status", uid: "status", sortable: true },
  {
    name: "Actions",
    uid: "actions",
    align: "center",
    render: (_) => <div>Custom actions here</div>,
  },
];

const statusOptions: StatusOption[] = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
];

const data: User[] = [
  // tu data aquí...
];

export default function MyPage() {
  // Función para abrir el modal
  const handleAddNew = () => {
    // Aquí abre el modal, por ejemplo:
    console.log("Abrir modal de nuevo registro");
  };

  return (
    <GenericTable<User>
      columns={columns}
      data={data}
      statusOptions={statusOptions}
      initialVisibleColumns={["name", "role", "status", "actions"]}
      initialSort={{ column: "age", direction: "ascending" }}
      initialRowsPerPage={5}
      onAddNew={handleAddNew}
      showStatusFilter={true}
    />
  );
}
