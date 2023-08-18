import Image from "next/image";
import useQuiosco from "../hooks/useQuiosco";

const Categoria = ({categoria}) => {
    const { categoriaActual, handleClickCategoria } = useQuiosco();
    const { nombre, icono, id } = categoria;

    return (
        <div className={`flex items-center gap-4 w-full p-5  menu ${ categoriaActual?.id === id ? "menuGris" : ""}`  }> 
            <Image width={70} height={70} src={`/assets/img/icono_${icono}.svg`} alt="texto alternativo"
                
            />

            <button type="button" className={`text-2xl font-bold hover:cursor-pointer ${ categoriaActual?.id === id ? "text-black" : "menuTitulo"}`}
            onClick={ () => handleClickCategoria(id)} >
                {nombre}
            </button>

        </div>
    )
}

export default Categoria