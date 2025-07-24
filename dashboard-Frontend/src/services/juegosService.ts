import api from "@/api/axios";
import { Juego } from "@/Models/juegos";


export const getJuegos = async (): Promise<Juego[]> => {
    const response = await api.get<Juego[]>("/Videojuegos/GetAllVideojuegos");
    return response.data;
}

export const crearJuego = async (juego: Omit<Juego, "videojuegoId">): Promise<Juego> => {
    const response = await api.post<Juego>("/Videojuegos/CreateVideojuegos", juego);
    return response.data;
};

export const getOneByID = async (id: number):  Promise<Juego> => {
        const response = await api.get<Juego>(`/Videojuegos/GetOneVideojuegos/${id}`);
    return response.data;
}

export const editJuego = async (id: number, juego: Omit<Juego, "videojuegoId">): Promise<Juego> => {
    const response = await api.put<Juego>(`/Videojuegos/UpdateVideojuegos/${id}`, juego);
    return response.data;
};

export const deleteJuegos = async (id: number) : Promise<void> => {
    await api.delete(`/Videojuegos/DeleteVideojuegos/${id}`);
}