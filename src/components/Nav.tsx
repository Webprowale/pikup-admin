import { Input } from '@/components/ui/input'
import {  MoveLeft } from 'lucide-react'
import React from 'react'

const Nav = () => {
    const formattedDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long', 
        month: 'long',    
        day: 'numeric',   
        year: 'numeric'   
    })
    return (
        <nav className='grid md:grid-cols-5 justify-center items-center border-b !w-[100%] px-6'>
            <div className="col-span-4 head space-y-3">
                <h2 className='font-bold text-[24px]'>Dashboard</h2>
                <span className='flex gap-3 text-[11px] items-center'><MoveLeft size={16} /> Dashboard</span>
            </div>
            <div className="side items-center p-3 space-y-5">
            <span className='text-[13px]'>{formattedDate}</span>
                <Input placeholder='Search...' className='bg-white border' />
            </div>
        </nav>
    )
}

export default Nav;
