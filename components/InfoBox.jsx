import React from "react";
import Link from "next/link";

const InfoBox = ({
  heading,
  backgroundColor= 'bg-slate-100',textColor1='text-slate-800',
  textColor2='text-slate-700',
  buttonInfo,
  children,
  }) => {
  return (
    <div className={`${backgroundColor} bg-slate-100 p-6 rounded-lg shadow-md`}>
      <h2 className={`${textColor1} text-2xl font-bold text-slate-800 `}>{heading}</h2>
      <p className={` ${textColor2} mt-2 mb-4 text-slate-700`}>
        {children}
      </p>
      <Link
        href={buttonInfo.link}
        className={`${buttonInfo.backgroundColor} inline-block text-white rounded-lg px-4 py-2 hover:bg-slate-900`}
      >
        {buttonInfo.text}
      </Link>
    </div>
  );
};

export default InfoBox;
