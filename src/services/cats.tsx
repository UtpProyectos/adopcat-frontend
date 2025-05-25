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

  console.log("file:",file);  
  return api.post("/cats", formData); // No establezcas aquí el header Content-Type
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
   * Actualiza un gato
   */
  updateCat: (id: string, data: any) => {
    return api.put(`/cats/${id}`, data);
  },

  /**
   * Elimina un gato
   */
  deleteCat: (id: string) => {
    return api.delete(`/cats/${id}`);
  },
};
