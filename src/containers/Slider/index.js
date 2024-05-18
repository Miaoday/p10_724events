import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const slidesLength = data && data.focus && data.focus.length;
  const byDateDesc = (data?.focus|| []).sort(
    (evtA, evtB) => new Date(evtB.date) - new Date(evtA.date)
  );
  // const data1= 0
  // console.log(data1?.focus);

  const nextCard = () => {
    setTimeout(
      () => setIndex((index + 1)% slidesLength),
      3000
    );
  };
  useEffect(() => {
    nextCard();
  });
  
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.title}
          className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
        >
          <img src={event.cover} alt={event.description} />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))};
    
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc.map((events, radioIdx) => (
            <input
              key={events.date}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              readOnly
            />
          ))}
        </div>
      </div>
    </div> 
  );
};

export default Slider;
