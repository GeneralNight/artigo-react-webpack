import * as React from 'react';

export default function DisplayNumber(props:{num:number}) {
    return (
        <div className="flex flex-col bg-[#505050] w-[50px] sm:w-[100px] text-white rounded gap-2">
    
            <input type="number" className="bg-transparent text-center text-xl sm:text-6xl py-10 sm:py-12 font-bold" size={1} readOnly value={props.num}/>
        
        </div>
    )
}