import React from "react";
import Link from "next/link";
import InfoBox from "./InfoBox";

const InfoBoxes = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox heading='For Renters' buttonInfo={{
            text: 'Browse Properties',
            link: '/properties',
            backgroundColor:"bg-slate-800",
          }}>
            Find your dream rental property. Bookmark properties, contact owners and book your stays.
            
          </InfoBox>
          <InfoBox heading='For Property Owners'
          backgroundColor="bg-slate-200" buttonInfo={{
            text: 'Add Properties',
            link: '/properties/add',
            backgroundColor:"bg-slate-700",
          }}
          >
            List your properties and reach potential tenants. Rent for a few
            days or long term.
          </InfoBox>
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
