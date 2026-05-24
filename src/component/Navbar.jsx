import React from 'react'
import { useState, useContext } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { ChevronDown, Menu } from "lucide-react";
import userImage from '../assets/userImage.png'
import { Appcontext } from '../Pages/AppContextProvider';
const Navbar = () => {
    const [menuOpen, setmenuOpen] = useState(false)
    const [dropdown, setdropdown] = useState(false)
    const { setauth, auth } = useContext(Appcontext)
    const navigate = useNavigate()
    const { setCartItem, setuserdata } = useContext(Appcontext)

    const LogOuthandler = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setauth(null, null)
        navigate("/login")
        setuserdata(null)
        setCartItem(null)
    }
    return (
        <div>
            <div className='relative flex gap-10 items-center bg-black px-4 py-2 justify-between'>
                <div className='flex items-center gap-4'>
                    <div>
                        <img className='h-15 w-40' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgR4MhX1OqqGmo3CFn837dt4YSSaz2x-LMWA&s" alt="" />
                    </div>
                    <div>
                        <div className='lg:flex gap-5 hidden items-center'>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-amber-200 font-bold"
                                        : "text-gray-500 font-bold"
                                }
                            >
                                DASHBOARD
                            </NavLink>
                            <NavLink
                                to="/explore"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-amber-200 font-bold"
                                        : "text-gray-500 font-bold"
                                }
                            >
                                EXPLORER
                            </NavLink>

                            {auth.role === "ADMIN" && (
                                <>
                                    <NavLink
                                        to="/manageItem"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "text-amber-200 font-bold"
                                                : "text-gray-500 font-bold"
                                        }
                                    >
                                        MANAGE ITEM
                                    </NavLink>
                                    <NavLink
                                        to="/manageCategory"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "text-amber-200 font-bold"
                                                : "text-gray-500 font-bold"
                                        }
                                    >
                                        MANAGE CATEHORIES
                                    </NavLink>
                                    <NavLink
                                        to="/manageUser"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "text-amber-200 font-bold"
                                                : "text-gray-500 font-bold"
                                        }
                                    >
                                        MANAGE USER
                                    </NavLink>
                                    <NavLink
                                        to="/addStock"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "text-amber-200 font-bold"
                                                : "text-gray-500 font-bold"
                                        }
                                    >
                                        ADD STOCK
                                    </NavLink>
                                </>
                            )}

                            <NavLink
                                to="/orderHistory"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-amber-200 font-bold"
                                        : "text-gray-500 font-bold"
                                }
                            >
                                ORDER HISTORY
                            </NavLink>
                        </div>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <Menu height={60} className='text-white lg:hidden flex cursor-pointer' onClick={() => setmenuOpen(!menuOpen)} />
                    <div className='flex justify-center items-center' onClick={() => setdropdown(!dropdown)}>
                        <img className='h-10 w-10 cursor-pointer' src={userImage} alt="" />
                        <ChevronDown color='white' size={33} className='cursor-pointer' />
                    </div>
                </div>

            </div>
            {dropdown && <div className='flex flex-col gap-2 absolute top-15 right-3 rounded-xl z-10 bg-white w-50 p-2'>
                <p onClick={()=>{navigate("/setting") ; setdropdown(false)}} className='cursor-pointer'>Setting</p>
                <p>Activity Log</p>
                <p className='border-t cursor-pointer' onClick={LogOuthandler}>LogOut</p>
            </div>}
            {menuOpen && (
                <div className=' bg-amber-400'>
                    <div className='lg:hidden flex gap-2 flex-col items-center'>
                        <NavLink
                            onClick={() => setmenuOpen(false)}
                            to="/"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-white font-bold"
                                    : "text-gray-500 font-bold"
                            }
                        >
                            DASHBOARD
                        </NavLink>
                        <NavLink
                            onClick={() => setmenuOpen(false)}
                            to="/explore"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-white font-bold"
                                    : "text-gray-500 font-bold"
                            }
                        >
                            EXPLORER
                        </NavLink>
                        {auth.role === "ADMIN" && (
                            <>
                                <NavLink
                                    onClick={() => setmenuOpen(false)}
                                    to="/manageItem"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-amber-200 font-bold"
                                            : "text-gray-500 font-bold"
                                    }
                                >
                                    MANAGE ITEM
                                </NavLink>
                                <NavLink
                                    onClick={() => setmenuOpen(false)}
                                    to="/manageCategory"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-amber-200 font-bold"
                                            : "text-gray-500 font-bold"
                                    }
                                >
                                    MANAGE CATEHORIES
                                </NavLink>
                                <NavLink
                                    onClick={() => setmenuOpen(false)}
                                    to="/manageUser"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-amber-200 font-bold"
                                            : "text-gray-500 font-bold"
                                    }
                                >
                                    MANAGE USER
                                </NavLink>
                                <NavLink
                                onClick={() => setmenuOpen(false)}
                                    to="/addStock"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-amber-200 font-bold"
                                            : "text-gray-500 font-bold"
                                    }
                                >
                                    ADD STOCK
                                </NavLink>
                            </>
                        )}
                        <NavLink
                            onClick={() => setmenuOpen(false)}
                            to="/orderHistory"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-white font-bold"
                                    : "text-gray-500 font-bold"
                            }
                        >
                            ORDER HISTORY
                        </NavLink>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Navbar
