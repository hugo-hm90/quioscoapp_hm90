import useQuiosco from "../hooks/useQuiosco";
import Image from "next/image"
import { formatearDinero } from "../helpers";


const Producto = ({producto}) => {

    const { handleSetProducto, handleModal, categoriaActual} = useQuiosco();
    const { nombre, imagen, precio, id } = producto;
    
    return (
        <div className={`border rounded-lg ${categoriaActual?.id !== 4 ? "card3" : "cardDonas"} `} >
            <Image src={`/assets/img/${imagen}.jpg`} 
                height={500} width={400}
                alt={`imagen ${nombre}`} 
                className="rounded-t-lg"
            />
            
            <div className="p-5">
                <h3 className={`text-2xl font-bold text-center 
                    ${categoriaActual?.id === 1 || categoriaActual?.id === 2 ? "tituloCafe" : ""}
                    ${categoriaActual?.id === 3 ? "tituloPizza" : ""}
                    ${categoriaActual?.id === 4 ? "tituloDonas" : ""}
                `}>{nombre}</h3>
                <p className={`mt-5 font-black text-4xl subtituloCafe  
                    ${categoriaActual?.id === 1 || categoriaActual?.id === 2 ? "subtituloCafe" : ""}
                    ${categoriaActual?.id === 3 ? "subtituloPizza" : ""}
                    ${categoriaActual?.id === 4 ? "subtituloDonas" : ""}
                `}>{formatearDinero(precio)}</p>
            </div>
            <div className="flex items-center justify-center">
                <button 
                    type="button" 
                    className={` button text-white w-full m-5 p-3 rounded-lg uppercase font-bold
                    ${categoriaActual?.id === 1 || categoriaActual?.id === 2 || categoriaActual?.id === 5 || categoriaActual?.id === 6 ? "pulse" : ""}
                    ${categoriaActual?.id === 3 ? "raisePizza" : ""}
                    ${categoriaActual?.id === 4 ? "upDonas" : ""}
                    
                    `
                }
                    onClick={ ()=> { 
                        handleSetProducto(producto);
                        handleModal();
                    }}
                    >
                    Agregar
                </button>
            </div>

        </div>
    )
}

export default Producto