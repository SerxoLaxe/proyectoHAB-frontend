import './style.css'
import { useEffect, useState } from "react"

const Stars = ({ rating }) => {
  const [starNumber, setStarNumber] = useState(0);

  useEffect(() => {
    setStarNumber(rating);
  }, [rating]);

  return (
    <div className='stars'>
      {[...Array(starNumber)].map((e,i)=>{
        return <svg key={i} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z"/></svg>
      })}
    </div>
  );
}

export default Stars;
