"use client"

import { MouseEventHandler, SetStateAction } from "react";
import Image from "next/image";
import { useState } from "react";
import TitleCard from "./TitleCard";
import P5Sketch from "./p5sketch";


 
type propsType={
    // isActive: boolean,
    // onShow: (value: SetStateAction<number>) => void,
    // onReSet: React.Dispatch<React.SetStateAction<boolean>>,
    // onClick: MouseEventHandler<HTMLButtonElement>
    // colour: string;
    // Close: boolean;
    // setClose: (value: SetStateAction<number>) => void,
    src:string;
    title:string;
    // _id: string;
    // imageUrl:string;


    
    

   
}





export default function Cards2( props:(propsType)) {


  const [activeIndex6, setActiveIndex6] = useState(false);



  


  ////shadow-[rgba(0,0,15,0.5)_0px_-1px_10px_0px]

    return (
      <>
<div className="relative">
<TitleCard  title={props.title} />



<div  onClick={()=>setActiveIndex6(!activeIndex6)}  className={`${ activeIndex6 === true ? '  w-screen duration-300 ease-in-out   transition-height   h-[220px] md:h-[330px] lg:h-[580px]  overflow-y-clip   ' : ' duration-300 ease-in-out transition-height h-10 hover:h-20  overflow-y-clip   '}`}>




<Image  className="  w-screen object-contain   " src={props.src} width={1280} height={800}  alt="" /> 



</div>

</div>


      </>
    );
  }


  