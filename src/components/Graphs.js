import React from 'react'
import { BarChart } from "reaviz";
import Moment from "moment";

export default function Graphs(props) {
    const ratingsList = props.days.filter((day) =>{
        if(day.rating === undefined){
          return false
        }
        return true
      }).map( (day) =>{
          console.log(day)
          return (
              {key:Moment(day.date, "MM/DD/YYYY").format("DD/MM/YY"), data: day.rating}
          )
      })
  
      const durationList = props.days.filter((day) =>{
        if(day.sleepDuration === undefined){
          return false
        }
        return true
      }).map( (day) =>{
          console.log(day)
          return (
              {key:Moment(day.date, "MM/DD/YYYY").format("DD/MM/YY"), data: day.sleepDuration}
          )
      })
  return (
    <div>
      <h3>Ratings</h3>
        <BarChart width={350} height={250} data={ratingsList} />
        <h3>Duration</h3>
        <BarChart width={350} height={250} data={durationList} />
    </div>
  )
}
