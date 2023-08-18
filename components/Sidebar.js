import Image from "next/image"
import useQuiosco from "../hooks/useQuiosco"
import Categoria from "./Categoria";

const Sidebar = () => {

  const { categorias } = useQuiosco();

  return (
    <div>
        <Image width={200} height={100} src="/assets/img/logo.svg" alt="imagen logotipo" className="ml-10 mt-5 block"
        
        />  
        <nav className="mt-10">
          {categorias.map(categoria => (
            <Categoria key={categoria.id} categoria={categoria}/>
          ))}
        </nav>
    </div>
  )
}

export default Sidebar