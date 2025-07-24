import React, { useEffect, useRef, useState } from 'react'
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.min.css'; // IMPORTANTE
import { useNavigate } from 'react-router-dom';
import { Cliente } from '@/Models/clientes';
import { deleteCliente, getClientes } from '@/services/clienteService';
import Swal from 'sweetalert2';



DataTable.use(DT);

export default function listarClientes() {
      const [tableData, setTableData] = useState<Cliente[]>([]);
      const tableRef = useRef<HTMLDivElement>(null);
      const navigate = useNavigate();

      useEffect(() => {
          const fetchClientes = async () => {
            try {
              const clientes = await getClientes();
              setTableData(clientes);
            } catch (error) {
              console.error('Error al listar clientes:', error);
            }
          };
      
          fetchClientes();
        }, []);

        useEffect(() => {
            const handler = (e: any) => {
              const target = e.target;
              if (target.classList.contains('btn-editar')) {
                const id = target.getAttribute('data-clienteId');
                if (id) navigate(`/editar-cliente/${id}`);
              } else if (target.classList.contains('btn-eliminar')) {
                const id = target.getAttribute('data-clienteId');
                if (id) handleEliminar(Number(id));
              }
            };
        
            const tableEl = tableRef.current?.querySelector('table');
            if (tableEl) {
              tableEl.addEventListener('click', handler);
            }
        
            return () => {
              if (tableEl) {
                tableEl.removeEventListener('click', handler);
              }
            };
          }, [tableData]);
        
        
        const handleEliminar = async (id: number) => {
              try {
                await deleteCliente(id);
                await Swal.fire({
                  title: '¡Eliminado!',
                  text: 'El Usuario ha sido eliminado permanentemente.',
                  icon: 'success',
                  timer: 2000,
                  showConfirmButton: false,
                });
                const autores = await getClientes();
                setTableData(autores);
              } catch (error) {
                console.error("Error al eliminar físicamente el Usuario:", error);
                Swal.fire('Error', 'Hubo un problema al eliminar el usuario físicamente.', 'error');
              }
            };
  return (
    <div ref={tableRef}>
       <DataTable
        data={tableData.map(cliente => [
          cliente.clienteId,
          cliente.nombre,
          cliente.documento,
          cliente.telefono,
          cliente.email,
          cliente.fechaRegistro,
          `<button class="btn-editar mx-1" data-clienteId="${cliente.clienteId}">Editar</button>
           <button class="btn-eliminar" data-clienteId="${cliente.clienteId}">Eliminar</button>`
        ])}
        columns={[
          { title: 'Id Cliente' },
          { title: 'Nombre' },
          { title: 'Documento' },
          { title: 'Telefono' },
          { title: 'Email' },
          { title: 'FechaRegistro' },
          { title: 'Acciones' }
        ]}
        className="display nowrap"
      />
    </div>
  )
}
