import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import format from "date-fns/format";
import add from "date-fns/add";
import styles from "./index.module.css";
import { blockDaysFunction, getLockedDates } from "@/lib/api";
import { json } from "stream/consumers";

interface DateTime {
  justDate: Date | null;
  dateTime: Date | null;
}

interface BlockDates {
  date: string;
  time: string;
  number: number;
}

interface lockedDates {
  id: number;
  name: string;
  email: string;
  number: string;
  date: string;
  time: string;
  productType: string;
  location: string;
}

const LockPage = () => {
  const [data, setData] = useState<DateTime>({
    justDate: null,
    dateTime: null,
  });
  const [response, setResponse] = useState("");
  const [lockedDates, setLockedDates] = useState<lockedDates[]>();
  const [active, setActive] = useState<BlockDates[]>([]);
  const [activeDate, setActiveDate] = useState("");
  //work hours
  const WorkTime = {
    Open: 9,
    Close: 20,
    interval: 1,
  };

  // if date chose
  const HandleDate = (date: Date) => {
    let finish = format(date, "yyyy-MMMM-dd");
    setActiveDate(finish);
    setActive([]);
    getInfo(finish);
    setData((prev) => ({ ...prev, justDate: date }));
  };

  // getTime
  const getTimes = () => {
    if (!data.justDate) return;

    const { justDate } = data;
    const beginning = add(justDate, { hours: WorkTime.Open });
    const end = add(justDate, { hours: WorkTime.Close });

    const times = [];
    for (let i = beginning; i <= end; i = add(i, { hours: WorkTime.interval })) {
      times.push(i);
    }

    return times;
  };

  const times = getTimes();

  // hadnle time chose
  const handleTime = (time: string, n: number) => {
    if (!data.justDate) return;

    const { justDate } = data;
    const i = active.findIndex((e) => e.time === time && e.number === n && e.date === format(justDate, "yyyy-MMMM-dd"));
    if (i > -1) {
      setActive(active.filter((e) => e.time !== time && e.number !== n));
    } else if (true) {
      active.push({
        date: activeDate,
        time: time,
        number: n,
      });
    }
  };

  // selected time
  const checkifActive = (i: number) => {
    let res = false;
    active.map((e) => {
      if (i === e.number) {
        res = true;
        return res;
      }
    });
    return res;
  };

  //locked times
  //check if time is free and if it's not expired
  const CheckIfAvailable = (time: Date) => {
    const now = new Date();
    let res = false;
    if (lockedDates?.length !== 0 && lockedDates) {
      lockedDates.map((e) => {
        if (e.time == time.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true })) {
          res = true;
        }
      });
    }
    if (format(time, "yyyy-MMMM-dd") === format(now, "yyyy-MMMM-dd")) {
      if (format(time, "kk:mm") <= format(now, "kk:mm")) res = true;
    }
    return res;
  };

  //block the whole day
  const blockTheDay = () => {
    const now = new Date();
    if (active.length > 0) {
      setActive([]);
    } else {
      times?.map((time, index) => {
        let ftime = time.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true });
        if (lockedDates?.filter((e) => e.time === ftime).length === 0) {
          setActive((prev) => [
            ...prev,
            {
              date: activeDate,
              time: ftime,
              number: index,
            },
          ]);
        }
      });
    }
  };

  // get booked days and hours
  const getInfo = async (date: string) => {
    try {
      await getLockedDates(date)
        .then((res) => res.json())
        .then((json) => {
          setLockedDates(json);
        });
    } catch (error) {
      console.log(error);
    }
  };

  //handle send
  const handleRequest = async () => {
    try {
      await blockDaysFunction(active)
        .then((res) => res.json())
        .then((json) => {
          setResponse(json.message);
        });
    } catch (error) {
      console.log(error);
    }
    setActive([]);
    await getInfo(activeDate);
  };

  return (
    <div className={styles.container}>
      <Calendar
        minDate={new Date()}
        view="month"
        className={`REACT-CALENDAR`}
        onClickDay={(date) => {
          HandleDate(date);
        }}
        value={data.justDate}
        calendarType="hebrew"
      />

      {/* Time chose box */}

      {data.justDate && lockedDates ? (
        <div className={styles.time_cont}>
          <button
            className={`yellow ${styles.block_day}`}
            onClick={() => {
              blockTheDay();
            }}
          >
            {active.length > 0 ? "Unblock the day" : "Block the day"}
          </button>
          <div className={styles.time_box}>
            {times?.map((time, i) => (
              <div className={styles.date_buttons} key={`time-${i}`}>
                <button
                  type="button"
                  className={`yellow ${styles.t_button} ${CheckIfAvailable(time) ? "disabled" : ""}   
                  ${checkifActive(i) ? "active" : ""}  `}
                  onClick={() => {
                    let ftime = time.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true });
                    handleTime(ftime, i);
                    setData((prev) => ({ ...prev, dateTime: time }));
                  }}
                >
                  {time.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true })}
                </button>
              </div>
            ))}
          </div>
          <h1>{response}</h1>
          <button className={`yellow ${styles.block_day}`} onClick={() => handleRequest()}>
            Confirm blocking
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default LockPage;
