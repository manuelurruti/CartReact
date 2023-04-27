import { useState } from "react";

import "./App.css";
import { Button } from '@mui/material';
import {Delete} from "@mui/icons-material"

const Productos = [
  {
    id: 1,
    name: "Tomate",
    price: "1500",
    img: "../tomate.jpg",
  },
  {
    id: 2,

    name: "Lechuga",
    price: "500",
    img: "../lechuga.jpg",
  },
  {
    id: 3,

    name: "Arbejas",
    price: "2500",
    img: "../arbejas.jpg",
  },
];

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [carrovisible, setCarrovisible] = useState(false);

  const agregarAlCarro = (producto) => {
    // Verificar si el producto ya está en el carrito
    const itemExistente = cartItems.find((item) => item.id === producto.id);
    if (itemExistente) {
      // Si ya está en el carrito, actualizar la cantidad
      const nuevosItems = cartItems.map((item) =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
      setCartItems(nuevosItems);
    } else {
      // Si no está en el carrito, agregar el producto
      const nuevosItems = [...cartItems, { ...producto, cantidad: 1 }];
      setCartItems(nuevosItems);
    }
  };
  const cantidadTotal = cartItems.reduce(
    (total, item) => total + item.cantidad,
    0
  );
  function sumarCantidad(id) {
    const nuevosItems = cartItems.map((item) =>
      item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
    );
    setCartItems(nuevosItems);
  }
  
  function restarCantidad(id) {
    const nuevosItems = cartItems.map((item) =>
      item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
    );
    setCartItems(nuevosItems.filter((item) => item.cantidad > 0));
  }
  console.log(cartItems);
  const toggleCarro = () => {
    setCarrovisible(!carrovisible);
  }
  return (
    <>
      <nav className="navbar">
        <p className="Shop">Shop</p>
        <span className="spanbutton">
          <span className="span">
            {cantidadTotal > 9 ? "9+" : cantidadTotal}
          </span>
          <button className="button" onClick={toggleCarro}>Carro</button>
          {carrovisible ? (
            <div className="bgcolor">
                {cartItems.map((x) => (
              <ul className="ulStyles">
                  <li key={x.name} className="liStyles">
                    <img src={x.img} alt={x.name} width="50" height="32"/>
                    <p className="pTotal">{x.name} </p>
                    <button className="buttonMore" onClick={() => restarCantidad(x.id)}>-</button>
                    <span>{x.cantidad}</span>
                    <button className="buttonMore" onClick={() => sumarCantidad(x.id)}>+</button>
                    <p>${x.price * x.cantidad}</p>
                 </li>
              </ul>
                 
                   
              ))}
             <div className="divTotal"><p className="pTotal">Total: ${cartItems.reduce((total, item) => total + (item.price * item.cantidad), 0)}</p></div>
             <div className="flexin">
             <Button variant="outlined"  className="buttonMUI" startIcon={<Delete />}>
 Vaciar Carrito
</Button>
             <Button variant="contained" className="buttonMUIC">Comprar</Button>
             </div>
            </div>
            
          ) : null}
        </span>
      </nav>
      <div className="layout">
        <div className="container">
          <div>
            <h1 className="Titulo">Tienda</h1>
          </div>
          <div className="flex">
            {Productos.map((producto) => (
              <div key={producto.id} className="border">
                <img src={producto.img} className="img" />
                <p> {producto.name} </p>
                <p> ${producto.price} </p>
                <div className="paddingx"></div>
                <button
                  onClick={() => agregarAlCarro(producto)}
                  className="Button"
                  type="Submit"
                >
                  enviar al carro
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
