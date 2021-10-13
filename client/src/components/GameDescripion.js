import React from "react";


const GameDescription = (props) => {

  return (
    <div>
      <p>
       This is a game that will cost you ether, but you can win tokens. You combine like-numbered tiles numbered with powers of two until you get a tile with the value of 2048. Gameplay consists of swiping the tiles up, right, down and left, and any tiles that match in the direction and adjacent spot will combine in the direction swiped.  
       </p>
    </div>
  );
};

export default GameDescription;