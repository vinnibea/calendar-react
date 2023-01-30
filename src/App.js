import './App.css';
import { useEffect, useRef, useState } from 'react';
import { Calendar } from './Calendar';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Form } from './Form';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
export const date = new Date();

export const dateFunc = (month, year) => {
  const date = new Date();
  date.setMonth(month);
  date.setYear(year);
  date.setDate(1);
  return date;
}

const dateFromSearchParams = (path, months) => {
  const dateArray = path.search.replace(/[=&]/gi, '-').split('-');
  const month = months.indexOf(dateArray[1]);
  const year = dateArray[3];
  return [+month, +year];
}

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const pickerRef = useRef(null);

  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [show, setShow] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [events, setEvents] = useState([]);
  const [scroll, setScroll] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState();

  const handleShowPicker = () => {
    setShowPicker(!showPicker)
  };

  const handleYearChange = (e) => {
    const selectedYear = e.target.textContent;
    setYear(Number(selectedYear));
    navigate(`calendar?month=${months[month]}&year=${selectedYear}`)
  }

  const handleMonthChange = (index) => {
    setMonth(index);
    navigate(`calendar?month=${months[index]}&year=${year}`)
  }

  const handleScrollUp = () => {
    setScroll(current => current - 1);
  }

  const handleScrollDown = () => {
    setScroll(current => current + 1);
  }

  const createEvent = (newEvent) => {
    let localEvents = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [...events];

    if (newEvent.updated) {
      localEvents = localEvents.map(e => {
        if (e.id !== newEvent.id) {
          return e;
        }

        return {
          ...e,
          ...newEvent
        }

      });

      localStorage.setItem('events', JSON.stringify(localEvents));
      setEvents([...JSON.parse(localStorage.getItem('events'))]);
      setSelectedEvent();
    } else {
      localStorage.setItem('events', JSON.stringify([...localEvents, newEvent]));
      setEvents([...JSON.parse(localStorage.getItem('events'))]);
      setSelectedEvent();
      setShow(false);
    }
  }

  useEffect(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    setTimeout(() => {
      if (!location.search) {
        navigate(`calendar?month=${months[currentMonth]}&year=${currentYear}`)
        setMonth(currentMonth);
        setYear(currentYear);
      } else {
        const monthSelected = dateFromSearchParams(location, months)[0];
        const yearSelected = dateFromSearchParams(location, months)[1];
        setMonth(monthSelected);
        setYear(yearSelected);
      }
    }, 500)

    document.body.addEventListener('click', (e) => {
      const className = e.target.parentNode.className;
      if (!className.includes('picker') && !className.includes('control')) {
        setShowPicker(false)
      }
      if (!className.includes('form') && !className.includes('add-button') && !className.includes('calendar-events')) {
        setShow(false);
        setSelectedEvent();
      }
    });
  }, [])

  const handleDelete = (id) => {
    let localEvents = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')).filter(e => e.id !== id) : [...events];
    localStorage.setItem('events', JSON.stringify(localEvents));
    setEvents([...JSON.parse(localStorage.getItem('events'))]);
    setSelectedEvent();
    setShow(false);
  }

  const handlePreviousYear = () => {
    if (month === 0) {
      setYear(currentYear => currentYear - 1);
      setMonth(11);
      navigate(`calendar?month=${months[11]}&year=${year - 1}`);
      return;
    }
    setMonth(currentMonth => currentMonth - 1);
    navigate(`calendar?month=${months[month - 1]}&year=${year}`);
  }

  const handleNextYear = () => {
    if (month === 11) {
      setYear(currentYear => currentYear + 1);
      setMonth(0);
      navigate(`calendar?month=${months[0]}&year=${year + 1}`);
      return;
    };
    setMonth(currentMonth => currentMonth + 1);
    
    navigate(`calendar?month=${months[month + 1]}&year=${year}`);
    
  }

  const handleSelection = (select) => {
    setShow(true);
    setSelectedEvent(select);
  }

  return (!isNaN(month) ? (
    <div className="App">
      {show && <Form
        year={year}
        month={month}
        onEventAdd={createEvent}
        onClose={setShow}
        onDelete={handleDelete}
        currentEvent={selectedEvent}
      />}
      <div className='calendar-control calendar-control--main'>
        <span className='calendar-add-button' onClick={() => setShow(!show)}>
          <AddCircleIcon></AddCircleIcon>
        </span>

        <div className='calendar-control calendar-control--right'>
          <span className='calendar-control arrow' onClick={handlePreviousYear}>{'<'} </span >

          <h2 className='calendar-month'>
            {months[month]} {year}
          </h2>

          <span className='calendar-control arrow' onClick={handleNextYear}>{'>'} </span>

          <CalendarTodayIcon
            className='calendar-icon'
            id='picker'
            sx={{ width: '16px', height: '16px', transition: 'all 0.3s ease' }}
            onClick={handleShowPicker}
          />
          {showPicker && (
            <div className='calendar-picker' id='picker-content' ref={pickerRef}>
              <ul className='calendar-picker-years'>
                <ArrowDropUpIcon sx={{ position: 'absolute', left: -8, top: 0, color: 'black' }}
                  onClick={handleScrollUp}
                >
                </ArrowDropUpIcon >

                <ArrowDropDownIcon
                  sx={{ position: 'absolute', left: -8, bottom: 26, color: 'black' }}
                  onClick={handleScrollDown}
                ></ArrowDropDownIcon>
                
                {new Array(15).fill((year + 1 + scroll)).map((y, index) => {
                  return (
                    <li
                      key={index + year}
                      className={index + y - 1 === year ? 'calendar-picker-active-year' : ''}
                      onClick={handleYearChange}
                    >
                      {y + index - 1}
                    </li>
                  )

                })}
              </ul>

              <div className='calendar-picker calendar-picker--months'>
                <ul className='calendar-picker-months'>
                  {months.map((m, index) => {
                    return (
                      <li
                        key={index + month}
                        className={index === month ? 'calendar-picker-active-month' : ''}
                        onClick={() => handleMonthChange(index)}
                      >
                        {m}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <Calendar
       year={year} 
       month={month} 
       events={events} 
       onEventSelect={handleSelection}
       />
    </div>
  ) : <h1 className='loader'>Loading...</h1>

  );
}

export default App;
