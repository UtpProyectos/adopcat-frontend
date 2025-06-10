import { api } from "./api";

export const organizationService = {
  create: (data: any) => api.post("/organizations", data),

  update: (id: string, data: any) => api.put(`/organizations/${id}`, data),


  delete: (id: string) => api.delete(`/organizations/${id}`),

  getById: (id: string) => api.get(`/organizations/${id}`),

  getAll: () => api.get("/organizations"),

  getMyOrganizations: (userId: string) =>
    api.get(`/organizations/my-organizations/${userId}`),

  getByUserId: (userId: string) =>
    api.get(`/organizations/by-user/${userId}`),


  updateStatus: (id: string, status: string, verified: boolean) =>
    api.put(`/organizations/${id}/status`, null, {
      params: { status, verified },
    }),

  updateState: (id: string, active: boolean) =>
    api.put(`/organizations/${id}/state`, null, {
      params: { active },
    }),

  updateApprovalStatusAndState: (
    id: string,
    verified?: boolean,
    status?: string,
    active?: boolean
  ) => {
    const params: any = {};
    if (verified !== undefined) params.verified = verified;
    if (status !== undefined) params.status = status;
    if (active !== undefined) params.active = active;
    return api.put(`/organizations/${id}/approval-status-state`, null, {
      params,
    });
  },
};
