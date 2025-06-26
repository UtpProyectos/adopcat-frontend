import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button,
  DropdownTrigger, Dropdown, DropdownMenu, DropdownItem, Chip, Pagination
} from "@heroui/react";
import { ReactNode, useMemo, useState, useCallback } from "react";
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
  onAddNew?: () => void;
  showStatusFilter?: boolean;
  statusColumnKey?: keyof T | string;
  filterKeys?: (keyof T | string)[];
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
  emptyMessage = "No hay datos disponibles.",
  button_label = "Añadir nuevo",
  onAddNew,
  showStatusFilter = false,
  statusColumnKey,
  filterKeys,
}: TableProps<T>) {
  const [filterValue, setFilterValue] = useState("");
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(
    new Set(initialVisibleColumns?.map(String) || columns.map((c) => String(c.uid)))
  );
  const [statusFilter, setStatusFilter] = useState<Set<string>>(new Set());
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor<T>>(
    initialSort || { column: columns[0].uid, direction: "ascending" }
  );
  const [page, setPage] = useState(1);

  const headerColumns = useMemo(() => {
    return columns.filter((col) => visibleColumns.has(String(col.uid)));
  }, [columns, visibleColumns]);

  const filteredData = useMemo(() => {
    let filtered = [...data];

    if (filterValue.trim()) {
      const keysToSearch = filterKeys?.map(String) || headerColumns.map((c) => String(c.uid));
      filtered = filtered.filter((item) =>
        keysToSearch.some((key) =>
          String(item[key] ?? "").toLowerCase().includes(filterValue.toLowerCase())
        )
      );
    }

    if (showStatusFilter && statusFilter.size && statusColumnKey) {
      filtered = filtered.filter((item) =>
        statusFilter.has(String(item[statusColumnKey]))
      );
    }

    return filtered;
  }, [data, filterValue, statusFilter, headerColumns, showStatusFilter, statusColumnKey, filterKeys]);

  const pages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));
  const pagedData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, page, rowsPerPage]);

  const sortedData = useMemo(() => {
    return [...pagedData].sort((a, b) => {
      const aVal = a[sortDescriptor.column];
      const bVal = b[sortDescriptor.column];
      const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [pagedData, sortDescriptor]);

  const renderCell = useCallback(
    (item: T, column: Column<T>) => {
      if (column.render) return column.render(item);
      return String(item[column.uid] ?? "");
    },
    []
  );

  return (
    <div className="w-full space-y-4">
      {/* Top Controls */}
      <div className="flex flex-wrap justify-between gap-3">
        <Input
          isClearable
          className="max-w-sm"
          placeholder="Buscar..."
          value={filterValue}
          onClear={() => setFilterValue("")}
          onValueChange={(val) => setFilterValue(val)}
          startContent={<SearchIcon />}
        />

        <div className="flex gap-2">
          {showStatusFilter && statusOptions.length > 0 && statusColumnKey && (
            <Dropdown>
              <DropdownTrigger>
                <Button endContent={<ChevronDownIcon />} variant="flat">
                  Estado
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                selectionMode="multiple"
                selectedKeys={statusFilter}
                onSelectionChange={(keys) => setStatusFilter(new Set(Array.from(keys) as string[]))}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid}>{capitalize(status.name)}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          )}

          <Dropdown>
            <DropdownTrigger>
              <Button endContent={<ChevronDownIcon />} variant="flat">
                Columnas
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              selectionMode="multiple"
              selectedKeys={visibleColumns}
              onSelectionChange={(keys) => setVisibleColumns(new Set(Array.from(keys) as string[]))}
            >
              {columns.map((col) => (
                <DropdownItem key={String(col.uid)}>{capitalize(col.name)}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          {onAddNew && (
            <Button color="primary" onPress={onAddNew}>
              {button_label}
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-neutral-700">
        <Table
          aria-label="Generic Table"
          sortDescriptor={{ column: String(sortDescriptor.column), direction: sortDescriptor.direction }}
          onSortChange={(d: any) =>
            setSortDescriptor({ column: d.column as keyof T, direction: d.direction })
          }
        >
          <TableHeader columns={headerColumns}>
            {(col) => (
              <TableColumn
                key={String(col.uid)}
                allowsSorting={col.sortable}
                align={col.align || (col.uid === "actions" ? "center" : "start")}
              >
                {col.name}
              </TableColumn>
            )}
          </TableHeader>

          <TableBody items={sortedData} emptyContent={emptyMessage}>
            {(item) => (
              <TableRow key={String(item[columns[0].uid])}>
                {(colKey) => {
                  const col = columns.find((c) => String(c.uid) === colKey);
                  return <TableCell>{col ? renderCell(item, col) : null}</TableCell>;
                }}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center px-2">
        <span className="text-sm text-default-400">Total {filteredData.length} items</span>
        <Pagination
          showControls
          page={page}
          total={pages}
          onChange={(newPage) => setPage(newPage)}
          color="primary"
          isCompact
          showShadow
        />
      </div>
    </div>
  );
}
