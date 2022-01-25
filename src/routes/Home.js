import React from "react";
import {Link} from "react-router-dom";
import DayCal from "components/DayCallendar";
import "style.css";

function Home(){    
    const date = new Date();
    const prevLast = new Date(date.getFullYear(), date.getMonth(), 0);
    const thisLast = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    
    const PLDate = prevLast.getDate();
    const PLDay = prevLast.getDay();
    const TLDate = thisLast.getDate();
    const TLDay = thisLast.getDay();
    
    const prevDates = [];
    const thisDates = [...Array(TLDate + 1).keys()].slice(1);
    const nextDates = [];

    if (PLDay !== 6) {
        for (let i = 0; i < PLDay + 1; i++) {
          prevDates.unshift(PLDate - i);
        }
      }
    
      // nextDates 계산
      for (let i = 1; i < 7 - TLDay; i++) {
        nextDates.push(i)
      }
    
      // Dates 합치기
      const dates = prevDates.concat(thisDates, nextDates);
    
      // Dates 정리
      dates.forEach((date, i) => {
        dates[i] =  <DayCal day = {date}/>;
      })

    return(
        <div>
            <h1>EveryDay</h1>
            <h2>{date.getFullYear()}년{date.getMonth() + 1}월</h2>
            <Link to = "/profile">
                <button>My Profile</button>
            </Link>
            <div className="calStyle">
                {dates}
            </div>
        </div>
    );
}
export default Home;