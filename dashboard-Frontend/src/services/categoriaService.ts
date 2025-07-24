import api from "@/api/axios";
import { Categoria} from "@/Models/categorias";


export const getCategorias = async (): Promise<Categoria[]> => {
    const response = await api.get<Categoria[]>("/Categorias/GetAllCategorias");
    return response.data;
}

export const crearCategoria = async (categoria: Omit<Categoria, "categoriaId">): Promise<Categoria> => {
    const response = await api.post<Categoria>("/Categorias/CreateCategorias", categoria);
    return response.data;
};

export const getOneByID = async (id: number):  Promise<Categoria> => {
        const response = await api.get<Categoria>(`/Categorias/GetOneCategorias/${id}`);
    return response.data;
}

export const editCategoria = async (id: number, categoria: Omit<Categoria, "id">): Promise<Categoria> => {
    const response = await api.put<Categoria>(`/Categorias/UpdateCategorias/${id}`, categoria);
    return response.data;
};

export const deleteCategoria = async (id: number) : Promise<void> => {
    await api.delete(`/Categorias/DeleteCategorias/${id}`);
}