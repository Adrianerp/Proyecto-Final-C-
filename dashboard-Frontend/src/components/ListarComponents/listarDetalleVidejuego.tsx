import React, { useEffect, useState } from 'react'
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.min.css'; // IMPORTANTE
import { useNavigate } from 'react-router-dom';
import { ReservaVideojuegoResponse } from '@/Models/ReservaVideojuego';
import { getReservaVideojuego } from '@/services/reservaVIdeojuego';

DataTable.use(DT);

export default function listarDetalleVidejuego() {
    const [tableData, setTableData] = useState<ReservaVideojuegoResponse[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReservas = async () => {
            try {
                const reservas = await getReservaVideojuego();
                setTableData(reservas);
            } catch (error) {
                console.error('Error al listar fetchReservas:', error);
            }
        };

        fetchReservas();
    }, []);

    return (
        <div>
            <DataTable
                data={tableData.map(detReserva => [
                    detReserva.reservaVideojuegoId,
                    detReserva.reservaId,
                    detReserva.titulo,
                    detReserva.precio,
                    detReserva.cantidad,
                    detReserva.total,
                ])}
                columns={[
                    { title: 'Id' },
                    { title: 'Reserva Id' },
                    { title: 'Titulo' },
                    { title: 'Precio' },
                    { title: 'Catidad' },
                    { title: 'Total' },
                ]}
                className="display nowrap"
            />
        </div>
    )
}

