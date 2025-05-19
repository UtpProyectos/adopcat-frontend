
import { User } from "./user"

export interface OrganizationResponse {
  organizationId: string;
  name: string;
  ruc: string;
  tipo: string;
  status: string;
  state: boolean;
  verified: boolean;
  description?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  coverPhotoUrl?: string;
  createdBy: User;
  createdAt: string;
  updatedAt?: string;          // Fecha última modificación
  phoneNumber?: string;        // Teléfono de contacto
  email?: string;              // Email de contacto
  website?: string;            // Web oficial
  socialMedia?: Record<string, string>; // Redes sociales
  notes?: string;              // Comentarios
  tags?: string[];             // Etiquetas
  deleted?: boolean;           // Eliminación lógica
}

