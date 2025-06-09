import { CatResponse } from "./cat";
import { User } from "./user";

export interface AdoptionRequestData {
    reason: string
    experience: string
    residenceType: string
    reactionPlan: string
    followUpConsent: string
    receipt: File
    homePhoto: File
    commitment: File
  }
  
  export interface AdoptionResponse {
    requestId: string ;
    status: string | null;
    finalized: boolean;
    submittedAt: string;
    decisionDate: string | null;
    cat: CatResponse  |null;
    adopter: User | null;
  }
  