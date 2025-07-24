import api from "@/api/axios";
import { Cliente } from "@/Models/clientes";


export const getClientes = async (): Promise<Cliente[]> => {
    const response = await api.get<Cliente[]>("/Clientes/GetAllClientes");
    return response.data;
}

export const crearCliente = async (cliente: Omit<Cliente, "clienteId">): Promise<Cliente> => {
    const response = await api.post<Cliente>("/Clientes/CreateClientes", cliente);
    return response.data;
};

export const getOneByID = async (id: number):  Promise<Cliente> => {
        const response = await api.get<Cliente>(`/Clientes/GetOneClientes/${id}`);
    return response.data;
}

export const editCliente = async (id: number, cliente: Omit<Cliente, "id">): Promise<Cliente> => {
    const response = await api.put<Cliente>(`/Clientes/UpdateClientes/${id}`, cliente);
    return response.data;
};

export const deleteCliente = async (id: number) : Promise<void> => {
    await api.delete(`/Clientes/DeleteClientes/${id}`);
}