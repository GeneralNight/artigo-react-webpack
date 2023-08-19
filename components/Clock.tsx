import * as React from 'react';
import { useEffect, useState } from 'react';
import DisplayNumber from "./DisplayNumber";
import InputNumber from "./InputNumber";

export default function Clock() {

    const [secsOnes,setSecsOnes] = useState(0)
    const [secsTens,setSecsTens] = useState(0)
    const [minutesOnes,setMinutesOnes] = useState(0)
    const [minutesTens,setMinutesTens] = useState(0)
    const [finalTime,setFinalTime] = useState(0)
    const [finalTimeout,setFinalTimeout] = useState(0)
    const [timeStarted,setTimeStarted] = useState(false)
    const [timePaused,setTimePaused] = useState(false)
    const [displayPercentage,setDisplayPercentage] = useState("")
    const [displayTime,setDisplayTime] = useState(["00"])

    useEffect(() => {
        let intervalTask: any
        if (timeStarted && !timePaused) {
            const time = finalTimeout-1
            intervalTask = setInterval(() => {
                setFinalTimeout(time)                
                console.log(time)
                if(time===0) {
                    cancelCountDown()
                }           
            }, 1000)
        }
    
        return () => {
          clearInterval(intervalTask)
        }
    }, [finalTimeout,timeStarted, timePaused])

    useEffect(()=>{
        const restOfSeconds = Math.floor(finalTimeout % 60) 
        const restOfMinutes = finalTimeout >= 60 ? Math.round(finalTimeout / 60) : 0
        const result = [restOfMinutes,restOfSeconds].map(val=>val<=9?`0${val}`:val.toString())
        setDisplayTime(result)        
    },[finalTimeout])

    useEffect(()=>{
        const result = (finalTimeout / finalTime * 100).toFixed(2) 
        setDisplayPercentage(result)        
    },[finalTimeout,finalTime])
    

    const startCountDown = () => {
        console.log('Countdown Started')
        const time = (minutesTens * 10 * 60) + (minutesOnes * 60) + (secsTens * 10) + secsOnes
        if(!timePaused) {
            console.log(time)
            setFinalTime(time) 
            setFinalTimeout(time) 
        }
        if(time===0) {
            cancelCountDown()
            return
        }
        setTimeStarted(true)
        setTimePaused(false)
    }
    
    const pauseCountDown = () => {
        console.log('Paused CountDown')
        setTimePaused(true)
    }
    
    const cancelCountDown = () => {
        console.log('Canceled CountDown')
        setFinalTimeout(0)
        setFinalTime(0)
        setSecsOnes(0)
        setSecsTens(0)
        setMinutesOnes(0)
        setMinutesTens(0)
        setTimeStarted(false)
        setTimePaused(false)
    }

    return (
        <>
            <div className="flex flex-col w-full items-center ">
        
                <div className="flex flex-col self-start border-b border-b-opacity-50 w-full p-4 sm:p-10 py-6 gap-2">
                    <p className="font-bold text-xl sm:text-2xl">O tempo é seu aliado</p>
                    <p className="text-sm sm:text-base opacity-75">Use o cronômetro abaixo para definir um tempo confortável e concluir suas tarefas.</p>
                </div>
        
                <div className="flex flex-col w-full py-10 px-4 sm:p-10 items-center gap-10 container">
                    {
                        timeStarted ?
                            (<div className="flex items-center w-full gap-3 sm:gap-6 justify-center" v-if="timeStarted">
                                <div className="flex items-center gap-3">
                                    <DisplayNumber num={parseInt(displayTime[0][0])}/>
                                    <DisplayNumber num={parseInt(displayTime[0][1])}/>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="w-[8px] sm:w-[10px] aspect-square rounded-full bg-[#505050]"></div>
                                    <div className="w-[8px] sm:w-[10px] aspect-square rounded-full bg-[#505050]"></div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <DisplayNumber num={parseInt(displayTime[1][0])}/>
                                    <DisplayNumber num={parseInt(displayTime[1][1])}/>
                                </div>
                            </div>)
                        : null
                    }

                    {
                        !timeStarted ? (
                            <div className="flex items-center w-full gap-3 sm:gap-6 justify-center">
                                <div className="flex items-center gap-3">
                                    <InputNumber updateVal={(val:number)=>setMinutesTens(val)} max={5} min={0}/>
                                    <InputNumber updateVal={(val:number)=>setMinutesOnes(val)} max={9} min={0}/>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="w-[8px] sm:w-[10px] aspect-square rounded-full bg-[#505050]"></div>
                                    <div className="w-[8px] sm:w-[10px] aspect-square rounded-full bg-[#505050]"></div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <InputNumber updateVal={(val:number)=>setSecsTens(val)} max={5} min={0}/>
                                    <InputNumber updateVal={(val:number)=>setSecsOnes(val)} max={9} min={0}/>
                                </div>
                            </div>
                        ) : null
                    }

                    {
                        timeStarted ? (
                            <div className="shadow-special h-[20px] sm:h-[30px] w-[100%] rounded-full">
                                <div className="h-[20px] sm:h-[30px] rounded-full bg-emerald-500" style={{width:`${displayPercentage}%`}}></div>
                            </div>
                        ) : null
                    }

                    <div className="flex items-center justify-center flex-wrap gap-y-5 gap-x-10 sm:gap-20">
                        {timeStarted ? (<button onClick={()=>pauseCountDown()} className="px-5 py-2 rounded text-white bg-orange-500">Pausar</button>) : null}
                        
                        {!timeStarted || timePaused ? (<button onClick={()=>startCountDown()} className="px-5 py-2 rounded text-white bg-emerald-600">{timePaused ? 'Retomar' : 'Iniciar'}</button>) : null}
                        
                        {timeStarted ? (<button onClick={()=>cancelCountDown()} className="px-5 py-2 rounded text-white bg-red-700">Cancelar</button>) : null}
                    </div>
                </div>
            </div>
        </>
    )
}