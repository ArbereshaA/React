import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//Ky resht sherben  per te importuar komponent dhe elementet
// nevojshme nga libraria react-router-dom. Kto komponente
//dhe elemente jane perdorur per te menaxhuar
// navigimin dhe routes ne kete aplikacion React.

// *Router* eshte përdorur si emer i shkurt (alias)
//per BrowserRouter, komponenti kryesor për menaxhimin e navigimit.

//Routes: Ky komponent perdoret per te percaktuar routes ne aplikacion

//Route: Ky perdoret per te specifikuar se cilin komponent duhet te behet render kur perdoruesi ndjek nje routes te caktuar

import "./navbar.css"; // bejme import navbar.js qe eshte pergjgjeses per style e aplikacionit
import Navbar from "./components/navbar";
import HomeShow from "./components/HomeShow";
import Stufshow from "./components/Stufshow";
import Contactshow from "./components/Contactshow";

const App = () => {
  return (
    <Router>
      <div >
        <Navbar />
        <Routes>
          <Route path="/" linkstyle element={<HomeShow />} />
          {/*<Route path="/" element={<HomeShow />} />: Ky eshte nje rruge qe 
          percakton se kur navigohet ne rrugen kryesore, duhet t ngarkohet komponenti HomeShow. Dmth, kur 
          faqja hapet ne routin bydefault, userit do ti shfaqet permbajtja e komponentit HomeShow*/}

          <Route path="/stuff" element={<Stufshow />} />

          {/* Ky route percakton se 
          kur navigohet ne routin "/stuff", duhet te ekekutohet komponenti Stufshow. Kjo do dmth se kur 
          useri navigon ne "/stuff" ne aplikacion, ateher  do ti shfaqet 
        permbajtja e komponentit Stufshow*/}

          <Route path="/contact" element={<Contactshow />} />
        
          {/* Edhe Ky route ka logjiken e njejt qe dmth se 
          kur navigohet ne routin "/contact", duhet te ekekutohet komponenti Contactshow. Qe dmth se kur 
          useri navigon ne "/contact" ne aplikacion, ateher  do ti shfaqet 
        permbajtja e komponentit Contactshow*/}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
