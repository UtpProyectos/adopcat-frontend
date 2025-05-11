import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { ChevronDownIcon } from "lucide-react";
 

interface StatusFilterProps {
  statusFilter: string;
  setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
}

const StatusFilter: React.FC<StatusFilterProps> = ({ statusFilter, setStatusFilter }) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button endContent={<ChevronDownIcon />} variant="flat">
          Status
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        selectedKeys={statusFilter}
        onSelectionChange={(keys) => {
          const selectedKey = Array.from(keys as Set<string>)[0];
          setStatusFilter(selectedKey);
        }}
      >
        <DropdownItem key="true">Verificado</DropdownItem>
        <DropdownItem key="false">No Verificado</DropdownItem> 
      </DropdownMenu>
    </Dropdown>
  );
};

export default StatusFilter;
