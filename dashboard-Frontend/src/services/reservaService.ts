import api from "@/api/axios";
import { ReservaReqest } from "@/Models/reservaReqeust";
import { Reserva } from "@/Models/reservas";


export const getReservas = async (): Promise<Reserva[]> => {
    const response = await api.get<Reserva[]>("/Reserva/GetAllReservas");
    return response.data;
}


export const createReserva = async (reserva: Omit<ReservaReqest, "reservaId">): Promise<Reserva> => {
    const response = await api.post<Reserva>("/Reserva/CreateReservas", reserva);
    return response.data;
};