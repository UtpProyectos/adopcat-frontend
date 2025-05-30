import { CatFeatureResponse } from "./catFeature";
import { User } from "./user";

interface CatPhoto {
  url: string;
}

export interface CatResponse {
  catId: string;
  name: string;
  birthDate?: string | null;        // ISO date string
  gender?: string | null;
  size?: string | null;
  healthStatus?: string | null;
  raza?: string | null;
  description?: string | null;
  location?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  status?: string | null;
  publishedAt?: string | null;       // ISO datetime string
  createdBy?: User | null;
  organizationId?: string | null;
  sentToOrg?: string | null;
  adoptedBy?: string | null;
  adoptedAt?: string | null;         // ISO datetime string
  adoptionRequestId?: string | null;
  mainImageUrl?: string | null;
  photos?: CatPhoto[];
  features?: CatFeatureResponse[] | null;
}