import React from "react";
import reformasi from './assets/Timeline.png';

export default function Reformasi() {
  return (
    <div className="relative bg-reformasi h-screen grid grid-cols-6">
      <img
        src={reformasi}
        alt=""
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />
      <div className="relative col-start-2 col-span-3 mt-10">
        <div className="font-bold text-3xl text-black">
          <p>BPS KABUPATEN SIDOARJO</p>
          <div className="w-5/6 h-1 hr-orange my-1"></div>
            <p className="font-bold text-custom-reformasi leading-none">
              <span className="blue font-bold text-custom-reformasi">PERJALANAN</span>{" "}
              REFORMASI BIROKRASI
            </p>
        </div>
      </div>
    </div>
  );
}
