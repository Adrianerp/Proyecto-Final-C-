export type ReservaReqest = {
    reservaId: number
    clienteId: number,
    usuarioId: number,
    fechaLimite: string,
    fechaReal: string,
    estado: string
    total: number
}