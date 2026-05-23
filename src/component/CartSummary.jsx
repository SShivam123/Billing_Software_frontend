import React, { useContext, useState } from 'react'
import { Appcontext } from '../Pages/AppContextProvider'
import toast from 'react-hot-toast';
import { AppConstants } from '../Util/Constant';
import ShowPopUp from '../Pages/ShowPopUp';
import Itemss from './Itemss';

const CartSummary = ({ customername, setcustomername, customerNumber, setcustomerNumber }) => {
  const [isPrcessing, setisPrcessing] = useState(false)
  const [orderDetails, setorderDetails] = useState(null)
  const [showPopUp, setshowPopUp] = useState(false)
  const { CartItem, clearCart,Items,setItems } = useContext(Appcontext)
    // console.log(Items);
  const totalAmount = CartItem && CartItem.length > 0 ? CartItem.reduce((acc, item) => acc + (item.price * item.quantity), 0) : 0;

  const tax = (totalAmount * 0.01).toFixed(2);
  const grandTotal = (totalAmount + (totalAmount * 0.01)).toFixed(2);

  const clearAll = () => {
    setcustomername(""),
      setcustomerNumber(""),
      clearCart();
  }

  const placeOrder = () => {
    setshowPopUp(true)
    clearAll();
  }

  const handlePrintRecipt = () => {
    window.print();
  }

  const loadRazorpayScript = () => {
    return new Promise((reslve, reject) => {
      const script = document.createElement("script")
      script.src = "https:/checkout.razorpay.com/v1/checkout.js";
      script.onload = () => reslve(true);
      script.onerror = () => reslve(false);
      document.body.appendChild(script);
    })
  }

  const deleteOrderOnFailure = async (orderID) => {
    try {
      let response = await fetch(`https://billingsoftwarebackend-production-c836.up.railway.app/orders/delete/${orderId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
      if (response.status == 204) {
        console.log("successfully deleted");
      }
    } catch (error) {
      toast.error("some error occured")
    }
  }


  const completePayment = async (paymentMode) => {
    if (!customerNumber || !customername) {
      toast.error("please enter customer detail..");
      return;
    }
    if (customerNumber.length != 10) {
      toast.error("Please enter valid number")
    }
    if (CartItem.length == 0) {
      toast.error("Your cart is empty..");
      return;
    }

    const orderData = {
      customerName: customername,
      mobileNumber: customerNumber,
      cartItems: CartItem,
      subTotal: totalAmount,
      tax,
      grandTotal,
      paymentMode: paymentMode.toUpperCase()
    }

    let hasError = false;
    CartItem.forEach(cartItem => {
      const item = Items.find(item=>item.itemId === cartItem.itemId)
      if(item){
        if(item.stock < cartItem.quantity){
          hasError=true;
          toast.error(`${item.name} Stock not avilable stock is greater than avilable stock ${item.stock}`)
          return;
        }
      }
    })
    if(hasError){
      return;
    }

    setisPrcessing(true)
    try {

      let response = await fetch(`https://billingsoftwarebackend-production-c836.up.railway.app/orders/create-order`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      })
      let data = await response.json()
      if (response.status == 201 && paymentMode == "CASH") {
        toast.success("cash received order succesfull")
        setorderDetails(data)

        const UpadteOrder = Items.map(item=>{
          const cartItem = data.cartItems.find(cartItem => cartItem.itemId === item.itemId)
          if(cartItem){
            return{
              ...item,
              stock:item.stock-cartItem.quantity
            }
          }
          return item;
        })
        setItems(UpadteOrder)

        placeOrder()
      } else if (response.status == 201 && paymentMode == "UPI") {
        const razorpayLoaded = await loadRazorpayScript();
        if (!razorpayLoaded) {
          toast.error("unable to load razorpay.");
          deleteOrderOnFailure(data.orderId);
          return;
        }
        let razorpayOrder = await fetch("https://billingsoftwarebackend-production-c836.up.railway.app/payments/create-order", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ amount: grandTotal, currency: "INR" })
        })
        let razorpayResponse = await razorpayOrder.json();
        if (razorpayResponse.status == 201) {
          toast.success("Razorpay order created succesfully")
        }

        const options = {
          key: AppConstants.RAZORPAY_KEY_ID,
          amount: razorpayResponse.amount,
          currency: razorpayResponse.currency,
          order_id: razorpayResponse.id,
          name: "My Retail Shop",
          description: "Order Payment",
          handler: async function (response) {
            await verifyPayment(response, data)
          },
          prefill: {
            name: customername,
            contact: customerNumber
          },
          theme: {
            color: "#3399CC"
          },
          modal: {
            ondismiss: async () => {
              await deleteOrderOnFailure(data.orderId)
              toast.error("Payment canclled")
            }
          }
        }

        const UpadteOrder = Items.map(item=>{
          const cartItem = data.cartItems.find(cartItem => cartItem.itemId === item.itemId)
          if(cartItem){
            return{
              ...item,
              stock:item.stock-cartItem.quantity
            }
          }
          return item;
        })
        setItems(UpadteOrder)

        // console.log(options);
        const rzp = new window.Razorpay(options);
        rzp.on("Payment failed", async (response) => {

          await deleteOrderOnFailure(data.orderId);
          toast.error("Payment failed")
          console.error("response.error.description")
        });
        rzp.open();
      }
    } catch (error) {
      toast.error("some error occured")
    } finally {
      setisPrcessing(false)
    }
  }

  const verifyPayment = async (response, savedOrder) => {
    console.log(savedOrder);

    const paymentData = {
      razorpayOrderId: response.razorpay_order_id,
      razorpayPaymentId: response.razorpay_payment_id,
      razorpaySignature: response.razorpay_signature,
      orderId: savedOrder.orderId
    };
    try {
      let paymentResponse = await fetch("https://billingsoftwarebackend-production-c836.up.railway.app/payments/verify", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(paymentData)
      })
      if (paymentResponse.status == 200) {
        toast.success("Payment Successfully")
        setorderDetails({
          ...savedOrder,
          paymentDetails: {
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature
          }
        })
      } else {
        toast.error("Payment verification Failed...")
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  }

  return (
    <div>
      <div>
        <div className='flex justify-between'>
          <p className='font-semibold'>Item:-</p>
          <p className='font-semibold'>₹{totalAmount.toFixed(2)}</p>
        </div>
        <div className='flex justify-between'>
          <p className='font-semibold'>tax(1%):-</p>
          <p className='font-semibold'>₹{tax}</p>
        </div>
        <div className='flex justify-between'>
          <p className='font-semibold'>Total:-</p>
          <p className='font-semibold'>₹{grandTotal}</p>
        </div>
      </div>
      <div className='flex justify-between gap-2'>
        <button className='bg-green-600 rounded w-1/2 font-bold cursor-pointer p-0.5' onClick={() => completePayment("CASH")} disabled={isPrcessing}>{isPrcessing ? "processing" : "CASH"}</button>
        <button className='bg-blue-500 rounded w-1/2 font-bold cursor-pointer p-0.5' onClick={() => completePayment("UPI")} disabled={isPrcessing}>{isPrcessing ? "processing" : "UPI"}</button>
      </div>
      <div className='bg-amber-400 rounded font-bold w-full text-center cursor-pointer mt-1.5 p-0.5' onClick={() => placeOrder()} disabled={isPrcessing || !orderDetails}>Place Order</div>
      {showPopUp && orderDetails && <ShowPopUp orderDetails={orderDetails} setshowPopUp={setshowPopUp} handlePrintRecipt={handlePrintRecipt} />}
    </div>
  )
}
export default CartSummary