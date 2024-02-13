import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  // const filteredEvents = (
    // (!type
    //   ? data?.events
    //   : data?.events) || []
  // )
  // const filteredEvents = (!type && data ? data.events : data.events.filter((event) => event.type === type))
  // const filteredEvents = (
  //   (!type
  //     ? data?.events
  //     : data.events.filter((event) => event.type === type)
  //   ) || [] // Ajout filter en fonction du type
  // ) 
  // .filter((_event, index) => {
  //   if (
  //     (currentPage - 1) * PER_PAGE <= index &&
  //     PER_PAGE * currentPage > index
  //   ) {
  //     return true;
  //   }
  //   return false;
  // });
  const filteredEvents = (() => {
    if (!type && data && data.events) {
      return data.events;
    } if (data && data.events) {
      return data.events.filter((event) => event.type === type);
    } 
      return [];
  })()
    .filter((_event, index) => {
      const startIndex = (currentPage - 1) * PER_PAGE;
      const endIndex = startIndex + PER_PAGE;
      return index >= startIndex && index < endIndex;
    });
  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };
  const pageNumber = Math.floor((filteredEvents.length || 0) / PER_PAGE) + 1;
  // const typeList = new Set(data?.events.map((event) => event.type));
  const typeList = new Set();
  if (data && data.events) {
    data.events.forEach((event) => typeList.add(event.type));
  }
  
  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;