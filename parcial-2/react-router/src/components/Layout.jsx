import React from 'react'
import Nav from './Nav'
import { Outlet } from 'react-router'

const Layout = () => {
    return (
        <>
            <Nav />
            <main>
                <Outlet />
            </main>
            <footer className='flex justify-center items-center h-20 bg-slate-950'>
                <p className="text-rose-200">&copy;Lara Florian</p>
            </footer>
        </>
    )
}

export default Layout