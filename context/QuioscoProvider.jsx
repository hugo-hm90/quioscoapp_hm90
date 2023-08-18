import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const QuioscoContext = createContext();

const QuioscoProvider = ({children}) => {

    const [ categorias, setCategorias ] = useState([]);
    const [ categoriaActual, setCategoriaActual ] = useState({});
    const [ producto, setProducto ] = useState({});
    const [ modal, setModal ] = useState(false);
    const [ pedido , setPedido ] = useState([]);
    const [ nombre, setNombre] = useState('');
    const [ total, setTotal] = useState(0);

    const router = useRouter();

    const obtenerCategorias = async () => {
        
        const {data} = await axios('/api/categorias')
        setCategorias(data);    
        
        
    }

    useEffect(() => {
      obtenerCategorias()
    }, [])

    useEffect(() => {
        setCategoriaActual(categorias[0])
    }, [categorias])

    useEffect( () => {
        const nuevoTotal = pedido.reduce( (total, producto) => (producto.precio * producto.cantidad) + total, 0);
        setTotal(nuevoTotal);
    }, [pedido] )
    
    const handleClickCategoria = (id) => {
        const categoria = categorias.filter( cat => cat.id === id );
       setCategoriaActual(categoria[0]);
       router.push('/');
    }

    const handleSetProducto = (producto) => {
        setProducto(producto)
    }

    const handleModal = () => { 
        setModal(!modal); // El valor contrario 
    }

    const handleAgregarPedido = ({categoriaId, ...producto}) => { // excluimos categoria e imagen 
        if (pedido.some( productoState => productoState.id === producto.id)) {
            // Actualizar cantidad
            const pedidoActualizado = pedido.map( productState => productState.id === producto.id ? producto : productState);
            setPedido(pedidoActualizado);
            toast.success('Guardado correctamente');
        } else{
            setPedido([...pedido, producto]);
            toast.success('Agregado al pedido');
        }
        setModal(false);
    }

    const handleEditarCantidades = (id) => {

        const productoActualizar = pedido.filter( producto => producto.id === id);
        setProducto(productoActualizar[0]);
        setModal(!modal);

    }

    const handleEliminarProducto = (id) => {

        const productoActualizar = pedido.filter( producto => producto.id !== id);
        setPedido(productoActualizar);
        toast.error('Eliminado correctamente');
    }
   
    const colocarOrden = async (e) => {
        e.preventDefault();

        try {

            await axios.post('/api/ordenes', {pedido, nombre, total, fecha: Date.now().toString()});    
            toast.success('Orden registrada');

            setCategoriaActual(categorias[0]);
            setPedido([]);
            setNombre('');
            setTotal(0);

            setTimeout(() => {
                router.push('/');
            }, 3000);


        } catch (error) {
            console.log(error);
        }
        

    }

    return (
        <QuioscoContext.Provider 
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                handleSetProducto,
                producto,
                handleModal,
                modal,
                pedido,
                handleAgregarPedido, 
                handleEditarCantidades,
                handleEliminarProducto,
                nombre,
                setNombre,
                colocarOrden, 
                total
            }}
        >  
        {children}
        </QuioscoContext.Provider>
    )
}

export  {QuioscoProvider}

export default QuioscoContext;