import api from "@/api/axios";
import { ReservaVideojuegoResponse } from "@/Models/ReservaVideojuego";
import { ReservaVideoJuegoRequest } from "@/Models/ReservaVideojuegoRequest";


export const getReservaVideojuego = async (): Promise<ReservaVideojuegoResponse[]> => {
    const response = await api.get<ReservaVideojuegoResponse[]>("/ReservaVideojuego/GetAllReservaVideojuego");
    return response.data;
}


export const crearReservaVideojuego = async (reservaVideojuego: ReservaVideoJuegoRequest): Promise<ReservaVideojuegoResponse> => {
  const response = await api.post<ReservaVideojuegoResponse>("/ReservaVideojuego/CreateReservas", reservaVideojuego);
  return response.data;
};