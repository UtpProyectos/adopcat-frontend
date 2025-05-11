import React, { useState, useMemo, useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@heroui/react";
import { userService } from "../../../services/user";
import StatusFilter from "../../../components/Inputs/StatusFilter";

export interface UserResponse {
    userId: number; // El identificador del usuario
    email: string; // El correo electrónico del usuario
    emailVerified: boolean; // Si el correo electrónico ha sido verificado
    dniUrl: string; // La URL del DNI del usuario
    adminApproved: boolean; // Si el administrador ha aprobado al usuario
}

export const columns = [
    { name: "ID", uid: "userId", sortable: true },
    { name: "Email", uid: "email", sortable: true },
    { name: "Email Verified", uid: "emailVerified", sortable: false },
    { name: "DNI URL", uid: "dniUrl", sortable: false },
    { name: "Admin Approved", uid: "adminApproved", sortable: false },
    { name: "Actions", uid: "actions" },
];

const UserPage: React.FC = () => {
    const [filterValue, setFilterValue] = useState<string>(""); // Valor del filtro de búsqueda
    const [statusFilter, setStatusFilter] = useState<string>("all"); // Filtro de estado
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [page, setPage] = useState<number>(1);
    const [users, setUsers] = useState<UserResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Llamada a la API para obtener los usuarios
    useEffect(() => {
        userService
            .getUsers()
            .then(response => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError("Error al cargar los usuarios.");
                setLoading(false);
            });
    }, []);

    // Filtrar los usuarios según el estado y la búsqueda
    const filteredItems = useMemo(() => {
        let filteredUsers = [...users];

        if (filterValue) {
            filteredUsers = filteredUsers.filter(user =>
                user.email.toLowerCase().includes(filterValue.toLowerCase())
            );
        }

        if (statusFilter !== "all") {
            filteredUsers = filteredUsers.filter(user => {
                if (statusFilter === "approved") {
                    return user.adminApproved;
                }
                if (statusFilter === "notApproved") {
                    return !user.adminApproved;
                }
                return true;
            });
        }

        return filteredUsers;
    }, [filterValue, statusFilter, users]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredItems.slice(start, end);
    }, [filteredItems, page, rowsPerPage]);

    // Función para renderizar celdas de la tabla
    const renderCell = (user: UserResponse, columnKey: keyof UserResponse) => {
        const cellValue = user[columnKey];
        switch (columnKey) {
            case "userId":
                return <span>{user.userId}</span>;
            case "email":
                return <span>{user.email}</span>;
            case "emailVerified":
                return <span>{user.emailVerified ? "Verified" : "Not Verified"}</span>;
            case "dniUrl":
                return <span>{user.dniUrl}</span>;
            case "adminApproved":
                return <span>{user.adminApproved ? "Approved" : "Not Approved"}</span>;
            default:
                return cellValue;
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <div className="flex justify-between gap-3 items-end">
                <StatusFilter statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
                <Button color="primary">Nuevo Admin</Button>
            </div>

            <Table aria-label="Users table">
                <TableHeader columns={columns}>
                    {column => (
                        <TableColumn key={column.uid} allowsSorting={column.sortable}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={items}>
                    {item => (
                        <TableRow key={item.userId}>
                            {columns.map(column => (
                                <TableCell key={column.uid}>
                                    {renderCell(item, column.uid as keyof UserResponse)}
                                </TableCell>
                            ))}
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/* Aquí agregamos la paginación */}
        </div>
    );
};

export default UserPage;
