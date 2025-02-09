import { useState, useEffect, useCallback } from "react";

interface CountdownProps {
  targetDate?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown = ({ targetDate }: CountdownProps) => {
  const targetDateTime = targetDate
    ? new Date(targetDate)
    : new Date("2025-12-31T23:59:59");

  // Helper function to calculate remaining time
  const getTimeLeft = useCallback((): TimeLeft => {
    const now = new Date();
    const diff = targetDateTime.getTime() - now.getTime();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }, [targetDateTime]);

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDateTime]);

  return (
    <div className="font-mono text-white p-[30px] bg-[#BF02C9]/25 backdrop-blur-sm rounded-[20px]">
      <span className="text-xs">Počinje za:</span>
      <div className="flex justify-around mt-2">
        <div className="flex flex-col justify-center items-center">
          <span className="text-4xl font-bold">{timeLeft.days}</span>
          <span className="text-xs">Dan</span>
        </div>
        <div className="text-3xl font-bold font-sans">:</div>
        <div className="flex flex-col justify-center items-center">
          <span className="text-4xl font-bold">{timeLeft.hours}</span>
          <span className="text-xs">Sat</span>
        </div>
        <div className="text-3xl font-bold font-sans">:</div>
        <div className="flex flex-col justify-center items-center">
          <span className="text-4xl font-bold">{timeLeft.minutes}</span>
          <span className="text-xs">Minut</span>
        </div>
        <div className="text-3xl font-bold font-sans">:</div>
        <div className="flex flex-col justify-center items-center">
          <span className="text-4xl font-bold">{timeLeft.seconds}</span>
          <span className="text-xs">Sekund</span>
        </div>
      </div>
      {targetDateTime.getTime() - new Date().getTime() <= 0 ? (
        <div className="text-4xl font-bold font-sans mt-4">Time's up!</div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Countdown;
