import { useState, useEffect } from "react";
import Image from "next/image"
import useQuiosco from "../hooks/useQuiosco"
import { formatearDinero } from "../helpers";

const ModalProducto = () => {

    const { producto, handleModal, handleAgregarPedido, pedido, categoriaActual } = useQuiosco(); 
    const { nombre, imagen, precio } = producto;

    const [cantidad, setCantidad] = useState(1);
    const [edicion, setEdicion] = useState(false);
    

    useEffect(() => {
        
        if (pedido.some((pedidoState) => pedidoState.id === producto.id )) {
            const productoEdicion = pedido.find(
                (pedidoState => pedidoState.id === producto.id)
            );
            setEdicion(true);
            setCantidad(productoEdicion.cantidad)
        }

    }, [producto, pedido])
    
    return (
        <div className="md:flex gap-10">

            <div className="md:w-1/3">
                <Image src={`/assets/img/${imagen}.jpg`} 
                    width={300} height={400} alt={`imagen ${nombre}`}
                    className="rounded-lg" 
                />
            </div>

            <div className="md:w-2/3">

                <div className="flex justify-end">
                    <button onClick={handleModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                    </button>
                </div>

                <h1 className={`text-3xl font-bold mt-5 
                        ${categoriaActual?.id === 1 || categoriaActual?.id === 2 || categoriaActual?.id === 5 || categoriaActual?.id === 6 ? "tituloCafe" : ""}
                        ${categoriaActual?.id === 3 ? "tituloPizza" : ""}
                        ${categoriaActual?.id === 4 ? "tituloDonas" : ""}
                    `}>
                    {nombre}
                </h1>
                <p className={`mt-5 font-black text-5xl first-letter:
                        ${categoriaActual?.id === 1 || categoriaActual?.id === 2 || categoriaActual?.id === 5 || categoriaActual?.id === 6 ? "subtituloCafe"  : "" }
                        ${categoriaActual?.id === 3 ? "subtituloPizza" : ""}
                        ${categoriaActual?.id === 4 ? "subtituloDonas" : ""}
                    `}>
                    {formatearDinero(precio)}
                </p>

                <div className="flex gap-4 mt-5 items-center">
                    <button type="button" onClick={ ()=> {
                        if (cantidad <= 1) return;
                        setCantidad(cantidad-1)
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>

                    <p className="text-3xl">{cantidad}</p>

                    <button type="button" onClick={ ()=> {
                        if (cantidad >= 10) return;
                        setCantidad(cantidad+1)
                    }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                    </button>

                    <button type="button" className={`button px-5 py-2 text-white font-bold rounded 
                        ${categoriaActual?.id === 1 || categoriaActual?.id === 2 || categoriaActual?.id === 5 || categoriaActual?.id === 6 ? "pulse" : ""}
                        ${categoriaActual?.id === 3 ? "raisePizza" : ""}
                        ${categoriaActual?.id === 4 ? "upDonas" : ""}
                    `}
                        onClick={() => {
                            handleAgregarPedido({...producto, cantidad})
                        }}
                    > 
                        {edicion ? 'Guardar Cambios' : 'Añadir al pedido'}
                    </button>

                </div>


            </div>

        </div>
    )
}

export default ModalProducto