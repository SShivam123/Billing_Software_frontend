import React, { Children, createContext, useEffect, useState } from 'react'
import { data, useNavigate } from 'react-router-dom';

export const Appcontext = createContext();
const AppContextProvider = ({ children }) => {
    const [auth, setauth] = useState({ token: null, role: null })
    const [category, setcategory] = useState([])
    const [userdata, setuserdata] = useState(null)
    const [loadingUsere, setloadingUsere] = useState(false)
    const [Items, setItems] = useState([])
    const [loadItem, setloadItem] = useState(false)
    const [CartItem, setCartItem] = useState([])
   const navigate = useNavigate()
    const setAuthData = (token, role) => {
        setauth({ token, role })
    }

    async function getLoggedinUser() {
        try {
            let response = await fetch("https://billingsoftwarebackend-production-c836.up.railway.app/profile", {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
            }
            );
           
            if (response.ok) {
                 let data = await response.json();
                // console.log(data);
                setuserdata(data)
            }else if(response.status == 401){
                localStorage.removeItem("token")
                localStorage.removeItem("auth")
                navigate("/login")
            }
             else {
                console.log("Error occured");

            }
            setcategory(response);
        } catch (error) {
            console.log("Error in api", error);
        } finally {
            setloadingUsere(false)
        }
    }

    useEffect(() => {
        getLoggedinUser()
        loadCategory()
        loadItems()
        if(localStorage.getItem("token") && localStorage.getItem("role")){
            setAuthData(localStorage.getItem("token") , localStorage.getItem("role"));
        }
    }, [])


    async function loadCategory() {
        try {
            let response = await fetch("https://billingsoftwarebackend-production-c836.up.railway.app/category/all", {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
            }
            );
            if (response.ok) {
                response = await response.json();
                setcategory(response);
            }

        } catch (error) {
            console.log("Error in api", error);
        }
    }

    async function loadItems() {
        try {
            setloadItem(true)
            let response = await fetch("https://billingsoftwarebackend-production-c836.up.railway.app/items", {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
            }
            );
            if (response.ok) {
                response = await response.json();
                setItems(response);
            }

        } catch (error) {
            console.log("Error in api", error);
        } finally {
            setloadItem(false)
        }
    }

    const addToCart = (item) => {
        let existingItems =CartItem && CartItem.find(cartitem => cartitem.name === item.name);
        if (existingItems) {
            setCartItem(CartItem.map((cartitem) => (cartitem.name === item.name ? { ...cartitem, quantity: cartitem.quantity + 1 } : cartitem)))
        } else {
            setCartItem(CartItem &&[...CartItem, { ...item, quantity: 1 }])
        }
    }

    const removeFromCart=(item)=>{
      let filterdCart = CartItem.filter((cartitem)=>{
        return cartitem.name!=item.name
      })
      setCartItem(filterdCart)
    }

    const UpdateQuantity=(itemid , newQuantity)=>{
        let updateItem = CartItem.map(cartitem=>cartitem.itemid === itemid ? {...cartitem,quantity:newQuantity}:cartitem)
        setCartItem(updateItem)
    }

    const clearCart=()=>{
        setCartItem([]);
    }

    return (
        <Appcontext.Provider value={{setuserdata,clearCart, loadItem, setloadItem, loadItems, Items, setItems, loadCategory, category, setcategory, setAuthData, auth, setauth, getLoggedinUser, userdata, setloadingUsere , addToCart , CartItem,setCartItem,removeFromCart,UpdateQuantity}}>
            {children}
        </Appcontext.Provider>
    )
}

export default AppContextProvider
