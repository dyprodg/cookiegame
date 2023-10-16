'use client'

import Image from 'next/image'
import { useState , useEffect } from 'react'

export default function Home() {
  const [cookieCount, setCookieCount] = useState(0)
  const [clickPower, setClickPower] = useState(1)
  const upgradeCosts = [10, 50, 100]
  const [currentTime, setCurrentTime] = useState(new Date ())

  //clicks erhoehen dein Counter
  const handleClick = () => {
    setCookieCount(cookieCount + clickPower)
  }

  //upgrades erhoehen clickpower
  const handleUpgrade = (cost) => {
    if (cookieCount >= cost) {
      setCookieCount(prevCount => prevCount - cost)

      switch (cost) {
        case 10:
          setClickPower(clickPower + 2);
          break;
        case 50:
          setClickPower(clickPower + 4);
          break;
        case 100:
          setClickPower(clickPower + 8);
          break;
        default:
          break;
      }
    }
  }

  //setTime useEffect
  useEffect(() => {
    const IntervallId = setInterval(() => {
    setCurrentTime(new Date ());
  }, 1000)
  return () => clearInterval(IntervallId);}, []);

  //variable fuer formatierte Zeit
  const formattedTime = currentTime.toLocaleTimeString('de-DE', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  return (
    <div className='w-full h-screen'>
      <div className='flex flex-col justify-center items-center'>
        <div>Aktuelle Uhrzeit: {formattedTime}</div>
        <h1 className='text-3xl m-10'>Cookie Clicker</h1>
        <div>
          <button onClick={handleClick}>
            <Image src='/cookieface.png' alt='cookie' width={500} height={500} 
            className=' transform transition-transform duration-150 active:scale-95 rounded-full'/>
          </button>
        </div>
        <div>
          <h1 className='text-3xl'>Cookie Count: {cookieCount}</h1>
        </div>
        <div>
          <h1 className='text-3xl'>Click Power: {clickPower}</h1>
        </div>
        <div>
          {upgradeCosts.map(cost => (
            <div key={cost}>
              <button
                onClick={() => handleUpgrade(cost)} // Änderung hier
                value={cost}
                className='flex w-full border border-black rounded-xl py-2 px-4 m-1 hover:shadow-md transform transition-transform duration-150 active:scale-95'
              >
                Upgrade Cost: {cost}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
