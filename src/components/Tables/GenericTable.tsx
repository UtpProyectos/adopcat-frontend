import React, { ReactNode, useMemo, useState, useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
} from "@heroui/react";
import SearchIcon from "../IconsSvg/SearchIcon";
import ChevronDownIcon from "../IconsSvg/ChevronDownIcon";

export interface Column<T> {
  name: string;
  uid: keyof T | string;
  sortable?: boolean;
  render?: (item: T) => ReactNode;
  align?: "start" | "center" | "end";
}

export interface StatusOption {
  name: string;
  uid: string;
}

interface SortDescriptor<T> {
  column: keyof T | string;
  direction: "ascending" | "descending";
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  statusOptions?: StatusOption[];
  initialVisibleColumns?: (keyof T | string)[];
  initialSort?: SortDescriptor<T>;
  rowsPerPageOptions?: number[];
  initialRowsPerPage?: number;
  button_label?: string;
  emptyMessage?: string;
  onAddNew: () => void;
  showStatusFilter?: boolean;

  statusColumnKey?: keyof T | string; // Columna donde está el estado para filtro

  filterKeys?: (keyof T | string)[]; // Columnas donde buscar texto en filtro
}

export function capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

const defaultRowsPerPageOptions = [5, 10, 15];

export default function GenericTable<T extends Record<string, any>>({
  columns,
  data,
  statusOptions = [],
  initialVisibleColumns,
  initialSort,
  rowsPerPageOptions = defaultRowsPerPageOptions,
  initialRowsPerPage = rowsPerPageOptions[0],
  emptyMessage = "No data available",
  button_label = "Add New",
  onAddNew,
  showStatusFilter = false,
  statusColumnKey,
  filterKeys,
}: TableProps<T>) {
  const [filterValue, setFilterValue] = useState("");
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(
    new Set(
      (initialVisibleColumns
        ? initialVisibleColumns.map((col) => String(col))
        : columns.map((c) => String(c.uid)))
    )
  );
  const [statusFilter, setStatusFilter] = useState<Set<string>>(new Set());
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor<T>>(
    initialSort || { column: columns[0].uid, direction: "ascending" }
  );
  const [page, setPage] = useState(1);

  // Filtrar columnas visibles
  const headerColumns = useMemo(() => {
    return columns.filter((col) => visibleColumns.has(String(col.uid)));
  }, [columns, visibleColumns]);

  // Filtrar datos según texto y status con nuevas props
  const filteredData = useMemo(() => {
    let filtered = [...data];

    if (filterValue.trim().length > 0) {
      const keysToSearch = filterKeys && filterKeys.length > 0
        ? filterKeys.map(String)
        : headerColumns.map((c) => String(c.uid));

      filtered = filtered.filter((item) =>
        keysToSearch.some((key) =>
          String(item[key] ?? "")
            .toLowerCase()
            .includes(filterValue.toLowerCase())
        )
      );
    }

    if (showStatusFilter && statusFilter.size > 0 && statusColumnKey) {
      filtered = filtered.filter((item) =>
        statusFilter.has(String(item[statusColumnKey]))
      );
    }

    return filtered;
  }, [data, filterValue, statusFilter, headerColumns, showStatusFilter, statusColumnKey, filterKeys]);

  // Paginación
  const pages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));
  const pagedData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, page, rowsPerPage]);

  // Ordenar
  const sortedData = useMemo(() => {
    if (!sortDescriptor.column) return pagedData;

    return [...pagedData].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      if (first == null) return -1;
      if (second == null) return 1;

      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [pagedData, sortDescriptor]);

  // Renderizar celda
  const renderCell = useCallback(
    (item: T, column: Column<T>) => {
      if (column.render) return column.render(item);

      if (column.uid === statusColumnKey && item[statusColumnKey]) {
        const status = String(item[statusColumnKey]).toLowerCase();
        const statusColorMap: Record<string, "success" | "danger" | "warning"> = {
          active: "success",
          paused: "danger",
          vacation: "warning",
        };
        return (
          <Chip color={statusColorMap[status] || "success"} size="sm" variant="flat">
            {capitalize(String(item[statusColumnKey]))}
          </Chip>
        );
      }

      return String(item[column.uid] ?? "");
    },
    [statusColumnKey]
  );

  // Handlers
  const onSearchChange = (value: string) => {
    setFilterValue(value);
    setPage(1);
  };

  const onClearSearch = () => {
    setFilterValue("");
    setPage(1);
  };

  const onStatusFilterChange = (keys: any) => {
    const selectedKeys =
      keys instanceof Set ? keys : new Set(Array.from(keys as Iterable<string>));
    setStatusFilter(selectedKeys);
    setPage(1);
  };

  const onVisibleColumnsChange = (keys: any) => {
    const selectedKeys =
      keys instanceof Set ? keys : new Set(Array.from(keys as Iterable<string>));
    setVisibleColumns(selectedKeys);
  };

  const onRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  };

  // const onSortChange = (descriptor: SortDescriptor<T>) => {
  //   setSortDescriptor(descriptor);
  // };

  const onPageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <>

      <div className="w-full flex flex-col gap-4">
        {/* Controles arriba */}
        <div className="flex flex-col gap-4 mb-4 ">
          <div className="flex  gap-3 md:flex-row flex-col md:justify-between justify-center md:items-end  ">
            <Input
              isClearable
              className="w-full sm:max-w-[44%]"
              placeholder="Search..."
              startContent={<SearchIcon />}
              value={filterValue}
              onClear={onClearSearch}
              onValueChange={onSearchChange}
            />

            <div className="flex gap-1 md:flex-row flex-col">
              {showStatusFilter && statusOptions.length > 0 && statusColumnKey && (
                <Dropdown>
                  <DropdownTrigger className=" sm:flex">
                    <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                      Estado
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    disallowEmptySelection
                    aria-label="Status Filter"
                    closeOnSelect={false}
                    selectedKeys={statusFilter}
                    selectionMode="multiple"
                    onSelectionChange={onStatusFilterChange}
                  >
                    {statusOptions.map((status) => (
                      <DropdownItem key={status.uid} className="capitalize">
                        {capitalize(status.name)}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              )}

              <Dropdown>
                <DropdownTrigger className=" sm:flex">
                  <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                    Columnas
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  closeOnSelect={false}
                  selectedKeys={visibleColumns}
                  selectionMode="multiple"
                  onSelectionChange={onVisibleColumnsChange}
                >
                  {columns.map((column) => (
                    <DropdownItem key={String(column.uid)} className="capitalize">
                      {capitalize(column.name)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>

              <Button color="primary" onPress={onAddNew}>
               {button_label}
              </Button>
            </div>
          </div>

          <div className="flex justify-between items-center gap-3">
            <span className="text-default-400 text-small">Total {data.length} items</span>
            <label className="flex items-center text-default-400 text-small gap-2">
              Filas por pagina:
              <select
                className="bg-transparent outline-none text-default-400 text-small"
                onChange={onRowsPerPageChange}
                value={rowsPerPage}
              >
                {rowsPerPageOptions.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {/* Tabla */}
        <div className="p-1">
          <Table
            isHeaderSticky
            aria-label="Custom Table"
            classNames={{
              wrapper: "overflow rounded-4xl bg-body dark:bg-dark",
            }}
            sortDescriptor={{
              ...sortDescriptor,
              column: String(sortDescriptor.column),
            }}
            onSortChange={(descriptor: any) => {
              setSortDescriptor({
                ...descriptor,
                column: descriptor.column as keyof T,
              });
            }}
          >
            <TableHeader columns={headerColumns}>
              {(column) => (
                <TableColumn
                  key={String(column.uid)}
                  align={column.align || (column.uid === "actions" ? "center" : "start")}
                  allowsSorting={column.sortable}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>

            <TableBody emptyContent={emptyMessage} items={sortedData}>
              {(item) => (
                <TableRow key={String(item[columns[0].uid])}>
                  {(columnKey) => {
                    const col = columns.find((c) => c.uid === columnKey);
                    return <TableCell>{col ? renderCell(item, col) : null}</TableCell>;
                  }}
                </TableRow>
              )}
            </TableBody>
          </Table>

        </div>

        {/* Paginación */}
        <div className="py-2 px-2 flex justify-between items-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={onPageChange}
          />
        </div>

      </div>
    </>
  );
}

