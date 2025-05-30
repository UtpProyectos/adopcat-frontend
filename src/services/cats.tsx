import { api } from "./api";

export const catService = {
  /**
   * Crea un nuevo gato
   */
  createCat: (data: any, file?: File) => {
    const formData = new FormData();

    formData.append("cat", new Blob([JSON.stringify(data)], { type: "application/json" }));
    if (file) {
      formData.append("file", file);
    }

    console.log("file:", file);
    return api.post("/cats", formData); // No establezcas aquí el header Content-Type
  },

  updateCat: (id: string, data: any, file?: File) => {
    const formData = new FormData();
  
    formData.append("cat", new Blob([JSON.stringify(data)], { type: "application/json" }));
    if (file) {
      formData.append("file", file);
    }
  
    return api.put(`/cats/${id}`, formData, {
      // No pongas Content-Type, axios lo maneja solo
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  


  /**
   * Obtiene todos los gatos.
   * Si se pasa organizationId, filtra por organización.
   */
  getAllCatsOrganization: (organizationId?: string) => {
    const params = organizationId ? { organizationId } : undefined;
    return api.get("/cats/organization", { params });
  },

  getAllCats: () => {
    return api.get("/cats");
  },
  /**
   * Obtiene un gato por ID
   */
  getCatById: (id: string) => {
    return api.get(`/cats/${id}`);
  },
 
  /**
   * Elimina un gato
   */
  deleteCat: (id: string) => {
    return api.delete(`/cats/${id}`);
  },

  getAllFeatures: () => {
    return api.get("/cats/features");
  },

  uploadCatPhoto: (catId: string, file: File, onProgress?: (progressEvent: any) => void) => {
    const formData = new FormData();
    formData.append("file", file);
  
    return api.post(`/cats/${catId}/photos`, formData, {
      onUploadProgress: onProgress
    });
  },
  
};
