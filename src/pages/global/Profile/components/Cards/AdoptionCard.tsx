import { Card, CardBody, Chip, User } from "@heroui/react";
import { Trash2, Eye, FileText } from "lucide-react";
import ActionsDropdown from "../../../../../components/Buttons/ActionsDropdown";
import { AdoptionResponse } from "../../../../../models/adoption";

const statusColorMap: Record<string, "warning" | "primary" | "success" | "danger" | "default"> = {
  PENDING: "warning",
  IN_REVIEW: "primary",
  APPROVED: "success",
  REJECTED: "danger",
  DELIVERED: "success",
  CANCELLED: "default",
};

interface Props {
  request: AdoptionResponse;
  deletingId: string | null;
  onDelete: () => void;
  onViewDetails: () => void;
  onNavigateToCat: () => void;
}

const AdoptionCard = ({ request, onDelete, onViewDetails, onNavigateToCat }: Props) => {
 
  return (
    <Card shadow="sm" className="w-full">
      <CardBody className="flex flex-row justify-between items-center gap-4 w-full">
        <div className="flex flex-row items-center gap-4 w-full">
          <User
            avatarProps={{
              src:
                request.cat?.mainImageUrl ||
                `https://ui-avatars.com/api/?name=${request.cat?.name || ""}&background=0D8ABC&color=fff`,
              radius: "lg",
              size: "md",
            }}
            name={<span className="font-semibold text-sm md:text-base lg:text-lg truncate">{request.cat?.name}</span>}
            description={
              <span className="text-xs md:text-sm text-gray-500 truncate">
                {request.cat?.organization?.name || "Sin organización"}
              </span>
            }
          />

          <div className="flex flex-col gap-1 text-xs md:text-sm min-w-fit">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Estado:</span>
              <Chip
                size="sm"
                color={statusColorMap[request.status || "PENDING"]}
                variant="flat" 
              >
                <p className="text-[0.5rem] md:text-[0.6rem]">{request.status}</p>
              </Chip>
            </div>
            <div className="text-gray-400 text-[0.7rem] md:text-xs">
              Enviado: {new Date(request.submittedAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <ActionsDropdown
            actions={[
              {
                key: "ver-gato",
                label: "Ver gato",
                icon: <Eye size={16} />,
                onClick: onNavigateToCat,
              },
              {
                key: "ver-solicitud",
                label: "Ver solicitud",
                icon: <FileText size={16} />,
                onClick: onViewDetails,
              },
              ...(request.status === "PENDING"
                ? [
                    {
                      key: "eliminar",
                      label: "Eliminar",
                      icon: <Trash2 size={16} />,
                      color: "danger" as const,
                      onClick: onDelete,
                    },
                  ]
                : []),
            ]}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default AdoptionCard;