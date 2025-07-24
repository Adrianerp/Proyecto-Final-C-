import React, { useEffect, useState } from "react";
import { getJuegos } from "@/services/juegosService";
import { createReserva } from "@/services/reservaService";
import { crearCliente } from "@/services/clienteService";
import { Juego } from "@/Models/juegos";
import { Cliente } from "@/Models/clientes";
import { ReservaVideoJuegoRequest } from "@/Models/ReservaVideojuegoRequest";
import { crearReservaVideojuego } from "@/services/reservaVIdeojuego";

// Tipos
type ReservaRequest = {
  clienteId: number;
  usuarioId: number;
  fechaLimite: string;
  fechaReal: string;
  estado: string;
  total: number;
};

type ItemCarrito = {
  juego: Juego;
  cantidad: number;
};

type ConfirmacionData = {
  cliente: Cliente;
  usuario: any;
  fechaReal: string;
  fechaLimite: string;
  total: number;
  carrito: ItemCarrito[];
};

const Reserva = () => {
  const [juegos, setJuegos] = useState<Juego[]>([]);
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const [mostrarModalCliente, setMostrarModalCliente] = useState(false);
  const [mostrarModalReserva, setMostrarModalReserva] = useState(false);
  const [mostrarResumen, setMostrarResumen] = useState(false);
  const [datosResumen, setDatosResumen] = useState<ConfirmacionData | null>(null);

  const [clienteForm, setClienteForm] = useState<Omit<Cliente, "clienteId">>({
    nombre: "",
    documento: "",
    telefono: "",
    email: "",
    fechaRegistro: new Date().toISOString(),
  });

  const [fechaReal, setFechaReal] = useState<string>(new Date().toISOString().split("T")[0]);
  const [fechaLimite, setFechaLimite] = useState<string>(
    new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split("T")[0]
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await getJuegos();
      setJuegos(data);
    };

    fetchData();

    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) setCarrito(JSON.parse(carritoGuardado));
  }, []);

  const agregarAlCarrito = (juego: Juego) => {
    const index = carrito.findIndex((item) => item.juego.videojuegoId === juego.videojuegoId);
    let nuevoCarrito: ItemCarrito[];

    if (index !== -1) {
      nuevoCarrito = [...carrito];
      nuevoCarrito[index].cantidad += 1;
    } else {
      nuevoCarrito = [...carrito, { juego, cantidad: 1 }];
    }

    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const quitarDelCarrito = (juegoId: number) => {
    const nuevoCarrito = carrito
      .map((item) => {
        if (item.juego.videojuegoId === juegoId) {
          return { ...item, cantidad: item.cantidad - 1 };
        }
        return item;
      })
      .filter((item) => item.cantidad > 0);

    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const calcularTotal = () => {
    return carrito.reduce((acc, item) => acc + item.juego.precio * item.cantidad, 0);
  };

  const handleRegistrarCliente = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const nuevoCliente = await crearCliente(clienteForm);

      setMostrarModalCliente(false);
      setMostrarModalReserva(true);

      setDatosResumen({
        cliente: nuevoCliente,
        usuario: JSON.parse(localStorage.getItem("usuario") || "{}"),
        fechaReal,
        fechaLimite,
        total: calcularTotal(),
        carrito,
      });
    } catch (error) {
      console.error("Error al crear el cliente:", error);
      alert("Hubo un error al registrar los datos del cliente.");
    }
  };

  const handleReservar = async (e: React.FormEvent) => {
    e.preventDefault();

    const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

    if (!usuario?.usuarioId) {
      alert("Usuario no encontrado en localStorage.");
      return;
    }

    try {
      const reserva: ReservaRequest = {
        clienteId: datosResumen?.cliente.clienteId || 0,
        usuarioId: usuario.usuarioId,
        fechaReal,
        fechaLimite,
        estado: "Reservado",
        total: calcularTotal(),
      };

      const nuevaReserva = await createReserva(reserva);

      await Promise.all(
        carrito.map((item) => {
          const detalle: ReservaVideoJuegoRequest = {
            reservaId: nuevaReserva.reservaId,
            videojuegoId: item.juego.videojuegoId,
            cantidad: item.cantidad,
            total: item.juego.precio * item.cantidad,
          };
          return crearReservaVideojuego(detalle);
        })
      );

      localStorage.removeItem("carrito");
      setCarrito([]);
      setMostrarModalReserva(false);
      setMostrarResumen(true);
    } catch (error) {
      console.error("Error al crear la reserva o sus detalles:", error);
      alert("Hubo un error al registrar la reserva.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Videojuegos disponibles</h2>
      <div className="grid grid-cols-3 gap-4">
        {juegos.map((juego) => (
          <div key={juego.videojuegoId} className="border p-2 rounded shadow">
            <h3 className="font-semibold">{juego.titulo}</h3>
            <p>Género: {juego.genero}</p>
            <p>Stock: {juego.stock}</p>
            <p>Precio: S/.{juego.precio.toFixed(2)}</p>
            <button
              onClick={() => agregarAlCarrito(juego)}
              className="mt-2 bg-blue-500 text-white px-2 py-1 rounded"
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold mt-6 mb-2">Carrito</h2>
      <div>
        {carrito.map((item) => (
          <div key={item.juego.videojuegoId} className="flex justify-between items-center mb-2">
            <span>
              {item.juego.titulo} - Cantidad: {item.cantidad} - Total: S/.
              {(item.juego.precio * item.cantidad).toFixed(2)}
            </span>
            <button
              onClick={() => quitarDelCarrito(item.juego.videojuegoId)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Quitar
            </button>
          </div>
        ))}
        {carrito.length > 0 && (
          <div className="mt-2 font-semibold">
            Total general: S/.{calcularTotal().toFixed(2)}
          </div>
        )}
      </div>

      {carrito.length > 0 && (
        <button
          onClick={() => setMostrarModalCliente(true)}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
        >
          Pasar a Reservar
        </button>
      )}

      {/* Modal Cliente */}
      {mostrarModalCliente && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Registrar cliente</h3>
            <form onSubmit={handleRegistrarCliente}>
              {["nombre", "documento", "telefono", "email"].map((campo) => (
                <label key={campo} className="block mb-2 capitalize">
                  {campo}:
                  <input
                    type="text"
                    value={(clienteForm as any)[campo]}
                    onChange={(e) => setClienteForm({ ...clienteForm, [campo]: e.target.value })}
                    required
                    className="w-full border p-2 mt-1"
                  />
                </label>
              ))}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setMostrarModalCliente(false)}
                  className="px-3 py-1 bg-gray-300 rounded"
                >
                  Cancelar
                </button>
                <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">
                  Confirmar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Reserva */}
      {mostrarModalReserva && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Confirmar Reserva</h3>
            <form onSubmit={handleReservar}>
              <label className="block mb-2">
                Fecha Real:
                <input
                  type="date"
                  value={fechaReal}
                  onChange={(e) => setFechaReal(e.target.value)}
                  required
                  className="w-full border p-2 mt-1"
                />
              </label>
              <label className="block mb-2">
                Fecha Límite:
                <input
                  type="date"
                  value={fechaLimite}
                  onChange={(e) => setFechaLimite(e.target.value)}
                  required
                  className="w-full border p-2 mt-1"
                />
              </label>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setMostrarModalReserva(false)}
                  className="px-3 py-1 bg-gray-300 rounded"
                >
                  Cancelar
                </button>
                <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">
                  Confirmar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Resumen */}
      {mostrarResumen && datosResumen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-[500px]">
            <h3 className="text-lg font-bold mb-4">Resumen de la Reserva</h3>
            <p><strong>Cliente:</strong> {datosResumen.cliente.nombre}</p>
            <p><strong>Registrado por:</strong> {datosResumen.usuario.nombre}</p>
            <p><strong>Fecha real:</strong> {fechaReal}</p>
            <p><strong>Fecha límite:</strong> {fechaLimite}</p>
            <p className="mb-2"><strong>Total:</strong> S/.{datosResumen.total.toFixed(2)}</p>
            <table className="w-full text-sm">
              <thead>
                <tr><th className="text-left">Título</th><th>Cantidad</th></tr>
              </thead>
              <tbody>
                {datosResumen.carrito.map(item => (
                  <tr key={item.juego.videojuegoId}>
                    <td>{item.juego.titulo}</td>
                    <td className="text-center">{item.cantidad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mt-4">
              <button onClick={() => setMostrarResumen(false)} className="bg-green-600 text-white px-4 py-2 rounded">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reserva;
