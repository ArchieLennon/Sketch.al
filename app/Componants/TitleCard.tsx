


type propsType={

    title:string;
   
}





export default function TitleCard(props:(propsType)){




    console.log(props.title)

return(
<>

{props.title?<div className="text-white pl-1 text-base  font-normal w-40 h-6 bg-black absolute -top-6  z-10    ">{props.title}</div>:null}


</>

)

}