import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import React from "react";

export interface DropdownAction {
  key: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  color?: "default" | "danger" | "primary" | "success" | "warning"; // opcional
}

interface ActionsDropdownProps {
  actions: DropdownAction[];
}

const ActionsDropdown: React.FC<ActionsDropdownProps> = ({ actions }) => {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button variant="light" size="sm" aria-label="Opciones">
          ⋮
        </Button>
      </DropdownTrigger>

      <DropdownMenu aria-label="Menú de acciones">
        {actions.map(({ key, label, icon, onClick, color }) => (
          <DropdownItem
            key={key}
            onClick={onClick}
            startContent={icon}
            color={color}
          >
            {label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default ActionsDropdown;
