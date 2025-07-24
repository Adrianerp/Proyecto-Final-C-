import api from "@/api/axios";
import { LoginRequest } from "@/Models/LoginRequest";
import { Usuario } from "@/Models/usuarios";


export const getUsuarios = async (): Promise<Usuario[]> => {
    const response = await api.get<Usuario[]>("/Usuarios/GetAllUsuarios");
    return response.data;
}

export const crearUsuario = async (usuario: Omit<Usuario, "usuarioId">): Promise<Usuario> => {
    const response = await api.post<Usuario>("/Usuarios/CreateUsuarios", usuario);
    return response.data;
};

export const getOneByID = async (id: number):  Promise<Usuario> => {
        const response = await api.get<Usuario>(`/Usuarios/GetOneUsuarios/${id}`);
    return response.data;
}

export const editUsuario = async (id: number, usuario: Omit<Usuario, "id">): Promise<Usuario> => {
    const response = await api.put<Usuario>(`/Usuarios/UpdateUsuarios/${id}`, usuario);
    return response.data;
};

export const deleteUsuario = async (id: number) : Promise<void> => {
    await api.delete(`/Usuarios/DeleteUsuarios/${id}`);
}

export const loginUsuario = async (loginRequest: LoginRequest): Promise<Usuario> => {
    const response = await api.post<Usuario>("/Usuarios/Login", loginRequest);
    return response.data;
};