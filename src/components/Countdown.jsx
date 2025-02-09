const Countdown = () => {
  return (
    <div class="font-mono text-white p-[30px] bg-[#BF02C9]/25 backdrop-blur-sm rounded-[20px]">
      <span class="text-xs">Počinje za:</span>
      <div class="flex justify-around mt-2">
        <div class="flex flex-col justify-center items-center">
          <span class="text-4xl font-bold">00</span>
          <span class="text-xs">Sati</span>
        </div>
        <div class="text-3xl font-bold font-sans">:</div>
        <div class="flex flex-col justify-center items-center">
          <span class="text-4xl font-bold">00</span>
          <span class="text-xs">Minuta</span>
        </div>
        <div class="text-3xl font-bold font-sans">:</div>
        <div class="flex flex-col justify-center items-center">
          <span class="text-4xl font-bold">00</span>
          <span class="text-xs">Sekundi</span>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
