import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import { Calendar } from './Calendar';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Form } from './Form';

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



function App() {
  const [year, setYear] = useState(dateFunc(0, 2023).getFullYear());
  const [month, setMonth] = useState(dateFunc(0, 2023).getMonth());
  const [show, setShow] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [events, setEvents] = useState([]);
  const [scroll, setScroll] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState();
  const pickerRef = useRef(null)
  const handleShowPicker = () => {
    setShowPicker(!showPicker)
  };

  const handleYearChange = (e) => {
    setYear(Number(e.target.textContent))
  }

  const handleMonthChange = (index) => {
    setMonth(index)
  }

  const handleScrollUp = () => {
    setScroll(current => current - 1)
  }

  const handleScrollDown = () => {
    setScroll(current => current + 1)
  }

  const createEvent = (newEvent) => {
    let localEvents = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [...events];

    if (newEvent.updated) {
      localEvents = localEvents.map(e => {
        if (e.id !== newEvent.id) {

          return e;
        }

        console.log('something')
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
    document.body.addEventListener('click', (e) => {
      const className = e.target.parentNode.className;
      console.log(className)
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
    console.log(month)
    if (month === 0) {
      setYear(currentYear => currentYear - 1)
      setMonth(11);
      return;
    }
    setMonth(currentMonth => currentMonth - 1);
  }

  const handleNextYear = () => {
    if (month === 11) {
      setYear(currentYear => currentYear + 1);
      setMonth(0);
      return;
    };
    setMonth(currentMonth => currentMonth + 1);
  }

  const handleSelection = (select) => {
    setShow(true);
    setSelectedEvent(select);
  }

  return (
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



      <Calendar year={year} month={month} events={events} onEventSelect={handleSelection}></Calendar>
    </div>
  );
}

export default App;
