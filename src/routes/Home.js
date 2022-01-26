import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import DayCal from "components/DayCallendar";
import "style.css";

function Home(){    
    let date = new Date();
    const [rendd,setRend] = useState(false);
    const prevLast = new Date(date.getFullYear(), date.getMonth(), 0);
    const thisLast = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    
    const PLDate = prevLast.getDate();
    const PLDay = prevLast.getDay();
    const TLDate = thisLast.getDate();
    const TLDay = thisLast.getDay();
    
    const prevDates = [];
    const thisDates = [...Array(TLDate + 1).keys()].slice(1);
    const nextDates = []; 

    const friends = [];
    for(let i = 1; i < 8; i++){
      friends.push(<button className="friendsBt">friend{i}</button>);
    }

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
    const leftMonth = () => {
      date.setMonth(date.getMonth() - 1);
      console.log(date.getMonth());
    }
    const rightMonth = () => {
      date.setMonth(date.getMonth() + 1);
      console.log(date.getMonth());
    }
    return(
        <div>
            <h1 className="textCenter">EveryDay</h1>
            <h2 className="textCenter">
              <button onClick={leftMonth}>◀</button>
              {date.getFullYear()}년{date.getMonth() + 1}월
              <button onClick={rightMonth}>▶</button>
            </h2>
            <Link to = "/profile">
                <button>My Profile</button>
            </Link>
            <div>
              {friends}
            </div>
            <div className="calStyle">
                {dates}
            </div>
        </div>
    );
}
export default Home;