import React, { useState } from "react";
import backgroundImage from "./assets/open terminal and see the magic (1).png";
import TerminalButton from "./components/TerminalButton";

function App() {
  const [showTerminal, setShowTerminal] = useState(false);

  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <img 
        src={backgroundImage} 
        alt="Background" 
        className="w-full h-screen object-cover"
      />

       <div className="absolute inset-0 flex items-center justify-center">
          <TerminalButton />
        </div>
    </div>
  );
}

export default App;
