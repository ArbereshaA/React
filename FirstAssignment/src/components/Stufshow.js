//Kompoonenta  per pjesen Stuff
import React from "react";

function Stufshow() {
  return (
    <div className="home-content">
      <h2>STUFF</h2>
      <p className="mb-3">
        Mauris sem velit, vehicula eget sodeles vitae, rhoncus eget sapien:
      </p>
      <ol className="list-decimal px-9">
        {/*  krijojm nje list te renditur (Order List)*/}
        <li>Nulla pulvinare</li>
        <li>Facilisis bibendum</li>
        <li>Vestibulum vulputate</li>
        <li>Eget erat</li>
        <li>Id portitor</li>
      </ol>
    </div>
  );
}
export default Stufshow;
