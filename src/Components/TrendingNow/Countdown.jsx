import { useEffect, useState } from "react";

export default function CountdownTimer({ targetDate }) {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate) - new Date();
    let timeLeft = {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    };

    if (difference > 0) {
      timeLeft = {
        days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, "0"),
        hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
        minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, "0"),
        seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="countdown flex gap-4 text-center">
      <div>
        <div className="time-box text-xl font-semibold bg-gray-200 px-4 py-2 rounded">
          {timeLeft.days}
        </div>
        <p className="text-sm text-gray-600">Days</p>
      </div>
      <div>
        <div className="time-box text-xl font-semibold bg-gray-200 px-4 py-2 rounded">
          {timeLeft.hours}
        </div>
        <p className="text-sm text-gray-600">Hours</p>
      </div>
      <div>
        <div className="time-box text-xl font-semibold bg-gray-200 px-4 py-2 rounded">
          {timeLeft.minutes}
        </div>
        <p className="text-sm text-gray-600">Mins</p>
      </div>
      <div>
        <div className="time-box text-xl font-semibold bg-gray-200 px-4 py-2 rounded">
          {timeLeft.seconds}
        </div>
        <p className="text-sm text-gray-600">Secs</p>
      </div>
    </div>
  );
}
