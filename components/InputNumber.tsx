import * as React from 'react';
import { useState } from 'react';
export default function InputNumber(
    props:{
        max:number,
        min:number,
        updateVal: (val:number) => void,
    }
) {

    const [actualNum,setActualNum] = useState(0)
    
    const increase = () => {
        if(actualNum>=props.max) return
        const newVal = actualNum+1
        setActualNum(newVal)
        props.updateVal(newVal)
        return
    }

    const decrease = () => {
        if(actualNum <= props.min) return
        const newVal = actualNum-1
        setActualNum(newVal)
        props.updateVal(newVal)
        return
    }

    return (
        <div className="flex flex-col bg-[#505050] w-[50px] sm:w-[100px] text-white rounded sm:gap-2">
            <button onClick={()=>increase()} className="text-xl sm:text-4xl py-2">+</button>
            <input type="number" className="bg-transparent text-center text-lg sm:text-4xl" size={1} max={props.max} min={props.min} readOnly value={actualNum}/>
            <button onClick={()=>decrease()} className="text-xl sm:text-4xl py-2">-</button>
        </div>
    )
}