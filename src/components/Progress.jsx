import { useEffect, useState } from 'react'

//  const proColor=['red','purple','teal','green',]

export default function Progress(props){

  let [width,setwidth] = useState(props.wid)
  let [numWidth,setnumWidth] = useState(parseFloat(width))

  let color;
  if(numWidth>=53){
    color='white';
  }else{
    color='black';
  }

  function add(){
    
    setnumWidth(numWidth+1)
    if(numWidth>99){
      setnumWidth(0)
    }
  }

  useEffect(()=>{
    setwidth(numWidth + '%')
    
  },[numWidth])



    return (
    <> 
    <div className="flex justify-center">
      <div className="my-3 lg:w-1/6 md:w-1/3  h-6 flex md:align-middle">
        <span className="myicon md:indent-8 select-none"><b><i>{props.name} :</i></b></span>
      </div>
      <div
      onClick={()=>{
        add()
        console.log(props)
      }}
      className="w-1/2 relative my-4 h-4 bg-gray-200 rounded-full">
        <div
        {...props}
          style={{ width: `${width}` }}
          role="progressbar"
          aria-label="Example 20px high"
          aria-valuenow={25}
          aria-valuemin={0}
          aria-valuemax={100}
        />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <span className={`select-none text-black-400 z-10 text-${color} text-sm`}>{width}</span>
        </div>
      </div>
    </div>
  </>)
  }