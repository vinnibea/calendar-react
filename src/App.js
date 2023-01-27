import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import { Calendar } from './Calendar';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

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
  const [show, setShow] = useState(true);
  const [showPicker, setShowPicker] = useState(false);
  const [scroll, setScroll] = useState(0);
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

  useEffect(() => {
    document.body.addEventListener('click', (e) => {
      const className = e.target.parentNode.className;
      if (!className.includes('picker') && !className.includes('control')) {
        setShowPicker(false)
      }
    });
  }, [])

  const handlePreviousYear = () => {
    if (month === 0) {
      setYear(dateFunc(11, year - 1).getFullYear())
      setMonth(dateFunc(11, year).getMonth());
      return;
    }
    setMonth(() => dateFunc(month - 1, year).getMonth());
  }

  const handleNextYear = () => {
    if (month === 11) {
      setYear(dateFunc(0, year + 1).getFullYear());
      setMonth(dateFunc(0, year + 1).getMonth());
      return;
    };
    setMonth(dateFunc(month + 1, year).getMonth());
    setYear(dateFunc(month + 1, year).getFullYear());
  }

  return (
    <div className="App">
      <div className='calendar-control calendar-control--main'>
        <span className='calendar-add-button' onClick={() => setShow(!show)}>
          <AddCircleIcon ></AddCircleIcon>
        </span>
        <div className='calendar-control calendar-control--right'>
          <span className='calendar-control arrow' onClick={() => handlePreviousYear()}>{'<'} </span >
          <h2 className='calendar-month'>  {months[month]} {year}

          </h2>
          <span className='calendar-control arrow' onClick={() => handleNextYear()}>{'>'} </span>
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
                {new Array(15).fill(year + scroll).map((y, index) => {
                  return (
                    <li key={index + year} className={index + 1 + y === year ? 'calendar-picker-active-year' : ''}
                      data={y + 1 + index}
                      onClick={handleYearChange}
                    >
                      {y + 1 + index}

                    </li>
                  )

                })}
              </ul>


              <div className='calendar-picker calendar-picker--months'>
                <ul className='calendar-picker-months'>
                  {months.map((m, index) => {
                    return (
                      <li key={index + month} className={index === month ? 'calendar-picker-active-month' : ''}
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
      {/* {!show && <>
        <div className='hover'> </div>
        <div className='calendar-form'> </div>
      </>
      } */}


      <Calendar year={year} month={month}></Calendar>
    </div>
  );
}

export default App;
