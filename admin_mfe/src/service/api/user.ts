import { User, UserFormData } from "../../types/user";

const BASE = "/api/admin/users";

export const getUser = (id: string): Promise<User> =>
  fetch(`${BASE}/${id}`).then((r) => r.json());

export const createUser = (data: UserFormData): Promise<User> =>
  fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((r) => r.json());

export const updateUser = (id: string, data: UserFormData): Promise<User> =>
  fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((r) => r.json());

export const deleteUser = (id: string): Promise<void> =>
  fetch(`${BASE}/${id}`, { method: "DELETE" }).then(() => undefined);
