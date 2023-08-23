import axios from "axios";
import Image from "next/image";
import { toast } from "react-toastify";

import { formatearDinero } from "../helpers";

const Orden = ({orden}) => {
    const { id, nombre, pedido, total } = orden;

    const completarOrden = async () => {
        try {
            const data = await axios.post(`/api/ordenes/${id}`);
            toast.success('Orden Completada');
            console.log(data);
        } catch (error) {
            console.log('Error');
        }
    }

    
    return (
        <div className="border rounded-lg p-10 space-y-5 mt-5 cardPedido">
            <h3 className='text-2xl font-bold'>Orden : {id} </h3>
            <p className='text-lg my-10 font-bold'>
                {nombre}
            </p>
            <div>
                {pedido.map( platillo => (
                    <div key={platillo.id} className="py-3 flex border-b last-of-type:border-0 items-center">
                        <div className="w-32">
                            <Image width={400} height={500} alt={platillo.nombre} 
                                src={`/assets/img/${platillo.imagen}.jpg`}
                                className="rounded-md"
                            />
                        </div>

                        <div className="p-5 space-y-2">
                            <h4 className="text-xl font-bold tituloCafe ">{platillo.nombre}</h4>
                            <p className="text-lg font-bold tituloPedido">
                                Cantidad: {platillo.cantidad}
                            </p>
                        </div>

                    </div>
                ))}
            </div>
            <div className="md:flex md:items-center md:justify-between my-10">
                <p className="mt-5 font-black text-4xl subtituloCafe">
                    Total a pagar: {formatearDinero(total)}
                </p>
                <button className="button close text-white mt-5 md:mt-0 py-3 px-10 font-bold rounded-lg"
                    onClick={completarOrden}
                    type="button"
                >
                    Completar Orden
                </button>
            </div>

        </div>
    )
}

export default Orden