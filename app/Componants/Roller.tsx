
"use client"
import React from "react";
import Cards2 from "./Cards2";
import { useState } from "react";
import TitleCard from "./TitleCard";
import images from "../assets/index"
import { propTypes } from "react-bootstrap/esm/Image";
import motion from "@/sanity/schemaTypes/motion";
import dynamic from "next/dynamic";
import Link from "next/link";



const P5Sketch = dynamic(() => import('../Componants/p5sketch'), { ssr: false });

interface Data {
  title: string;
  _id: string;
  imageUrl:string;

}


interface propsType{
  sanity:Data[]
}




export default function Roller({sanity}:propsType) {





  const [activeIndex7, setActiveIndex7] = useState(true);
  
 



    return (


        <>




{/* <div className="w-screen h-1/3 top-0   ">
<div className="text-black text-1xl font-light w-10 h-5 bg-pink-500  z-40 absolute bottom-2/3 ">Type</div>
</div> */}


<div className="   w-full  h-full      ">

<div className="h-6 w-screen "></div>



   {sanity?.map((sanity) => (
<div key={sanity._id} >


 {sanity.imageUrl?<Cards2  src={sanity.imageUrl} title={sanity.title}  />:null}

</div>
  ))}



<div className="   w-sceen   ">
<P5Sketch>
</P5Sketch>
</div>


</div>




     
      

      
     
      </>
    );
  }



