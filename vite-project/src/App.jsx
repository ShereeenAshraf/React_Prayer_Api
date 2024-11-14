import { useEffect, useState } from "react"
import Prayer from "./component/prayer"

function App() {


  const [prayerTimes , setPrayerTimes] = useState({})
  const [dateTime , setdateTime] = useState("")
  const [city , setCity] = useState("Cairo")

console.log(city)

const cities =[
  {name : "القاهرة" , value : "Cairo"},
  {name : "الاسكندرية" , value : "Alexandria"},
  {name : "الجيزة" , value : "Giza"},
  {name : "الفيوم" , value : "AL%20Fayoum"},
  {name : "اسوان" , value : "Aswan"},
  {name : "الاقصر" , value : "Luxor"}
]

useEffect(() =>{
  const fetchPrayerTimes = async () =>{
    try{

      const response = await fetch(`https://api.aladhan.com/v1/timingsByCity/14-11-2024?city=Eg&country=${city}`)
      const data_prayer = await response.json()
      setPrayerTimes(data_prayer.data.timings) //for sala time
      setdateTime(data_prayer.data.date.gregorian.date) // for date 

      console.log(data_prayer.data.timings);

    }catch(error){
      console.error(error)
    }
  
  }

  fetchPrayerTimes()
},[city])

const formatTime = (time) =>{

  if(!time){
    return"00:00";
  }

  let [hours , minutes] = time.split(":").map(Number)
  const perd = hours >= 12 ?"PM" : "AM";
  hours = hours % 12 || 12 ;

  return`${hours}:${minutes < 10 ? "0" + minutes : minutes} ${perd}`
}

  return (
    <section>
      <div className="container">
        <div className="top_sec">
          <div className="city">
            <h3>المدينه</h3>
            <select name="" id="" onChange={(e) => setCity(e.target.value)}>
              {cities.map((city_obj) =>(
                <option key={city_obj.value} value={city_obj.value}>{city_obj.name}</option>
              ))}
            </select>
          </div>
          <div className="date">
            <h3>التاريخ</h3>
            <h4>{dateTime}</h4>
          </div>
        </div>
        <Prayer name = "الفجر"  time = {formatTime(prayerTimes.Fajr)}/>
        <Prayer name = "الظهر"  time = {formatTime(prayerTimes.Dhuhr)}/>
        <Prayer name = "العصر"  time = {formatTime(prayerTimes.Asr)}/>
        <Prayer name = "المغرب"  time = {formatTime(prayerTimes.Maghrib)}/>
        <Prayer name = "العشاء"  time = {formatTime(prayerTimes.Isha)}/>
      </div>
    </section>
  )
}

export default App
