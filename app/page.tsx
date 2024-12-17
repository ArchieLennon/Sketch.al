
import Roller from "./Componants/Roller"
import Title from "./Componants/Title"




import { client } from "/Users/archielennnon/Desktop/rollodex copy 4/app/lib/sanity"
import motion from "@/sanity/schemaTypes/motion";





interface Data {
  title: string;
  imageUrl: string;
  _id: string;
}







async function getProjects(){
  const query = `*[type == motion] {
  title,
  _id,
  "imageUrl": image.asset->url}`
   //now this part fetches it

   const data = await client.fetch(query);
   return data;
}

export const revalidate = 60;


export default async function Home() {

  

  const data:Data[] = await getProjects();



  return (


    <main className=" overflow-scroll h-screen w-screen bg-white ">
      
      {/* <Title/> */}
     



      
      
      <Roller sanity={data} />


      
      {/* {data.map((motion) => (
  <article className="overflow-hidden">
   
    <div className="h-56 absolute w-full">
    {motion.imageUrl? <Image fill src={motion.imageUrl} alt="image"></Image> :null}
    
    </div>
    </article>
  ))} */}


   
  

    {/* {data.map((motion) => (

<Roller key={""} sanityProp={motion} />





))} */}





     
    </main>
  );
}


// {data.map((motion) => (
//   <article className="overflow-hidden">
   
//     <div className="h-56 w-full">
//     {motion.imageUrl? <Image fill src={motion.imageUrl} alt="image"></Image> :null}
    
//     </div>
//     </article>
//   ))}