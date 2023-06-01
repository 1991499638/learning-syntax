import { useEffect, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'


const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];


const year=new Date().getFullYear()
const month=new Date().getMonth()
const day=new Date().getDate()
const weekDay=new Date().getDay()

function calend(add){

  
  let calendars=[];
  calendars.length = 42;
  let addYear=(add+month)/12;
  let yearNumber=year+addYear
  const firstDay=new Date(yearNumber,month+add,1).getDay(); //计算本月第一天是星期几
  let monthNumber=month+add; //手动选择的月份，默认本月，整数类型，数据没限制
  let lastDay
  let lastMouth; //判断是否存在上个月的日期，也就是判断本月1号是不是星期一
  let nowDay=1; //本月开始日期，计数
  let torDay=1; //下个月开始日期，计数
  let lastMouthNumber=monthNumber-1; //上个月的月份 
  if(firstDay!=1){

    //如果上个月是去年
    if(lastMouthNumber<0){
      lastMouthNumber=lastMouthNumber+12
    }
    lastDay=monthDays[lastMouthNumber]-firstDay+2
    lastMouth = 1
  }else{
    lastDay=1
    lastMouth = 0
  }
  
  //日历最后一个日期
  let finalyDay = 42-firstDay+1-monthDays[monthNumber]
  // let count=1;
  let date
  let isCurrentMonth
  let isToday
  let isSelected=false
  for (let i = 0; i < 42; i++) {
    if(lastMouth==1)
    {
      date = `${yearNumber}-${monthNumber}-${lastDay}`;
      isCurrentMonth=false;
      isToday=false;
      lastDay++
      if(lastDay>monthDays[lastMouthNumber]){
        lastDay=0;
        lastMouth=0;
      }
    }else{
      if(nowDay<=monthDays[monthNumber]){
        date = `${yearNumber}-${monthNumber+1}-${nowDay}`;
        isCurrentMonth = true;
        isToday=false;
        if(nowDay===day){
          isToday=true;
        }
        nowDay++
      }else{
        if(torDay<=finalyDay){
          date = `${yearNumber}-${monthNumber+2}-${torDay}`;
          isCurrentMonth=false;
          isToday=false;
          torDay++;
        }
      }
    }
    calendars.push({ date, isCurrentMonth, isToday, isSelected });
  }
  return calendars
}


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Day() {

  const [add,setadd]=useState(0)
  const [calendars,setcalendars]=useState(calend(0))

  useEffect(()=>{
    setcalendars(calend(add))
  },[add])

  return (
    <div className="mt-10 flex h-full flex-col">
      <header className="flex flex-none items-center justify-between border-y border-gray-200 py-4 px-6">
        <div>
          <h1 className="text-lg font-semibold leading-6 text-gray-900">
            <time dateTime="2022-01-22" className="sm:hidden">
            {months[month+add]} {day}, {year}
            </time>
            <time dateTime="2022-01-22" className="hidden sm:inline">
            {months[month+add]} {day}, {year}
            </time>
          </h1>
          <p className="mt-1 text-sm text-gray-500">{daysOfWeek[weekDay-1]}</p>
        </div>
      </header>
      <div className="isolate flex justify-center overflow-hidden bg-white">
        <div className=" w-full max-w-md flex-none border-l border-gray-100 py-10 px-8 md:block">
          <div className="flex items-center text-center text-gray-900">
            <button
              onClick={()=>{
                // calendars=[];
                setadd(add-1);
              }}
              type="button"
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
            <span className="sr-only">Previous month</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <div
            onClick={()=>{
              calendars.map((monthDays) => {
                console.log(`Month: ${monthDays.date} days
                isCurrentMonth: ${monthDays.isCurrentMonth}
                isToday: ${monthDays.isToday}
                isSelected: ${monthDays.isSelected}`);
              });
            }}
            className="flex-auto font-semibold">{months[month+add]} {year}</div>
            <button
              onClick={()=>{
                setadd(add+1);
              }}
              type="button"
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
            <div>S</div>
          </div>
          <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
            {calendars.map((day, dayIdx) => (
              <button
                key={day.date}
                type="button"
                className={classNames(
                  'py-1.5 hover:bg-gray-100 focus:z-10',
                  day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
                  (day.isSelected || day.isToday) && 'font-semibold',
                  day.isSelected && 'text-white',
                  !day.isSelected && day.isCurrentMonth && !day.isToday && 'text-gray-900',
                  !day.isSelected && !day.isCurrentMonth && !day.isToday && 'text-gray-400',
                  day.isToday && !day.isSelected && 'text-indigo-600',
                  dayIdx === 0 && 'rounded-tl-lg',
                  dayIdx === 6 && 'rounded-tr-lg',
                  dayIdx === calendars.length - 7 && 'rounded-bl-lg',
                  dayIdx === calendars.length - 1 && 'rounded-br-lg'
                )}
              >
                <time
                  dateTime={day.date}
                  className={classNames(
                    'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
                    day.isSelected && day.isToday && 'bg-indigo-600',
                    day.isSelected && !day.isToday && 'bg-gray-900'
                  )}
                >
                  {day.date.split('-').pop().replace(/^0/, '')}
                </time>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
