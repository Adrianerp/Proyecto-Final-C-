import React, { useEffect, useState } from 'react'
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.min.css'; // IMPORTANTE
import { useNavigate } from 'react-router-dom';
import { Reserva } from '@/Models/reservas';
import { getReservas } from '@/services/reservaService';

DataTable.use(DT);

export default function listarReservas() {
      const [tableData, setTableData] = useState<Reserva[]>([]);
      const navigate = useNavigate();


      useEffect(() => {
            const fetchReservas = async () => {
              try {
                const reservas = await getReservas();
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
        data={tableData.map(reserva => [
          reserva.reservaId,
          reserva.nombreCliente,
          reserva.nombreUsuario,
          reserva.fechaReserva,
          reserva.total,
          reserva.estado,
        ])}
        columns={[
          { title: 'Id'},
          { title: 'Cliente' },
          { title: 'Usuario' },
          { title: 'Fecha Reserva' },
          { title: 'Total' },
          { title: 'Estado' },
        ]}
        className="display nowrap"
      />
    </div>
  )
}
