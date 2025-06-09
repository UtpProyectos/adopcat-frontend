import { CatResponse } from "./cat";
import {  UserResponse } from "./user";

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
    requestId: string;
    status: string | null;
    finalized: boolean;
    submittedAt: string;
    decisionDate: string | null;
    cat: CatResponse | null;
    adopter: UserResponse | null;
  
    // 🔽 Campos del formulario Firestore
    reason?: string;
    experience?: string;
    residenceType?: string;
    reactionPlan?: string;
    followUpConsent?: string;
  
    receiptUrl?: string;
    homePhotoUrl?: string;
    commitmentUrl?: string;
  }
  
  