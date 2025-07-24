import React, { useEffect, useRef, useState } from 'react'
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.min.css'; // IMPORTANTE
import { useNavigate } from 'react-router-dom';
import { Usuario } from '@/Models/usuarios';
import { deleteUsuario, getUsuarios } from '@/services/usuarioService';
import Swal from 'sweetalert2';


DataTable.use(DT);

export default function listarUsuarios() {
  const [tableData, setTableData] = useState<Usuario[]>([]);
  const tableRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const usuarios = await getUsuarios();
        setTableData(usuarios);
      } catch (error) {
        console.error('Error al listar usuarios:', error);
      }
    };

    fetchUsuarios();
  }, []);

  useEffect(() => {
      const handler = (e: any) => {
        const target = e.target;
        if (target.classList.contains('btn-editar')) {
          const id = target.getAttribute('data-usuarioId');
          if (id) navigate(`/editar-usuario/${id}`);
        } else if (target.classList.contains('btn-eliminar')) {
          const id = target.getAttribute('data-usuarioId');
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
          await deleteUsuario(id);
          await Swal.fire({
            title: '¡Eliminado!',
            text: 'El Usuario ha sido eliminado permanentemente.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
          });
          const autores = await getUsuarios();
          setTableData(autores);
        } catch (error) {
          console.error("Error al eliminar físicamente el Usuario:", error);
          Swal.fire('Error', 'Hubo un problema al eliminar el usuario físicamente.', 'error');
        }
      };
  return (
    <div ref={tableRef}>
      <DataTable
        data={tableData.map(usuario => [
          usuario.usuarioId,
          usuario.nombre,
          usuario.usuario,
          usuario.clave,
          usuario.rol,
          `<button class="btn-editar mx-1" data-usuarioId="${usuario.usuarioId}">Editar</button>
           <button class="btn-eliminar" data-usuarioId="${usuario.usuarioId}">Eliminar</button>`
        ])}
        columns={[
          { title: 'Id Usuario ' },
          { title: 'Nombre' },
          { title: 'Username' },
          { title: 'Password' },
          { title: 'Rol' },
          { title: 'Acciones' }
        ]}
        className="display nowrap"
      />
    </div>
  )
}
