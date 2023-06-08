import { useState } from 'react'
import Progress from '../Progress'
import Day from '../calendars/day'
 
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }



export default function Homes(){
return (
  <>
    <main id='Home' className="flex-1">
      <div className="mt-8 relative mx-auto max-w-4xl md:px-8 xl:px-0">
        <div className="pt-0 pb-16">
          <div className="px-4 sm:px-6 md:px-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Home</h1>
          </div>
          <div className="px-4 sm:px-6 md:px-0">
            <div className='py-6 flex justify-end flex-col flex-wrap'>
              {/* <h1 className='text-2xl indent-20'><b>学习进度:</b></h1> */}
              <Progress col="purple" wid='100%' name="区块链" />
              <Progress col="teal" wid='53%' name="BTC" />
              <Progress col="green" wid='10%' name="solidity" />
              <Day />
            </div>
          </div>
        </div>
      </div>
    </main>
  </>
)

} 


