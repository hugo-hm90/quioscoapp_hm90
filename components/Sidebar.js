import {useRef} from "react"
import Image from "next/image"
import useQuiosco from "../hooks/useQuiosco"
import Categoria from "./Categoria";


const Sidebar = (props) => {

  const menuMobile = useRef(null);
  const botonCerrar = useRef(null);
  const abrirMenu = useRef(null);

  const handleClick = () => {
    // Acceder al div utilizando la referencia
    if (menuMobile.current) {
        abrirMenu.current.style.display = 'none'
        botonCerrar.current.style.display = 'block'
        menuMobile.current.style.display = 'block';
        menuMobile.current.style.position = 'fixed';
        menuMobile.current.style.zIndex = '1';
        menuMobile.current.style.width = '100%';
        menuMobile.current.style.top = '2.5rem';

    }
  }

  const handleCerrar = () => {

    if (menuMobile.current) {
        abrirMenu.current.style.display = 'block'
        botonCerrar.current.style.display = 'none'
        menuMobile.current.style.display = 'none';
    }

  }


  const { categorias } = useQuiosco();

  // const verMenu = querySelector('#menu');

  // const activar = () => {
  //   verMenu.
  // }
  

  return (
    <div>
        <div className="navegador">
          <svg
            viewBox="0 0 24 24"
            fill="white"
            height="4rem"
            width="4rem"
            {...props}
            onClick={handleClick}
            ref={abrirMenu}
          >
            <path d="M12 2A10 10 0 002 12a10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2M6 7h12v2H6V7m0 4h12v2H6v-2m0 4h12v2H6v-2z" />
          </svg>

          <div ref={botonCerrar} className="botonOculto">
            <svg
              viewBox="0 0 24 24"
              fill="white"
              height="4rem"
              width="4rem"
              {...props}
              onClick={handleCerrar}
            >
              <path d="M12 2c5.53 0 10 4.47 10 10s-4.47 10-10 10S2 17.53 2 12 6.47 2 12 2m3.59 5L12 10.59 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41 15.59 7z" />
            </svg>
          </div>
          

        </div>
        <Image width={200} height={100} src="/assets/img/logo.svg" alt="imagen logotipo" className="ml-10 mt-5 block margin-top"
        
        />
          
        <nav className="mt-10 menu-mobile" ref={menuMobile}>
          {categorias.map(categoria => (
            <Categoria key={categoria.id} categoria={categoria}/>
          ))}
        </nav>
    </div>
  )
}

export default Sidebar