import Image from 'next/image'

const Hero = (props:{src: any}) => (
  <>
    <div className=" transition duration-300 ease-in-out  shadow-[rgba(0,0,15,0.5)_0px_-3px_10px_0px]    ">
      <Image alt={''} width={1000} {...props}  />
    </div>
  </>
)

export default Hero


// hover:row-span-6