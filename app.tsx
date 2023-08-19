import * as React from 'react';
import Clock from "./components/Clock";
import Header from "./components/Header";

export default function App(){
  return (
    <div className="flex flex-col pb-10">
      <Header/>
      <div className="grid grid-cols-5 px-[15px] sm:px-10 min-h-[100vh]">
          <div className="col-span-5 rounded shadow-special">
              <Clock/>
          </div>        
      </div>
  </div>
  )
}
