import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "./welcome-home.styles.scss";

const WelcomeHome = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const { userName, assignedTasks } = currentUser;
  const [timeOfDay, setTimeOfDay] = useState(null);

  /* const name = userName.split(" ")[0]; */ // ne radi za ime jednog rijeci

  const name = userName;
  let time = new Date();

  useEffect(() => {
    let h = time.getHours();

    if (h >= 0 && h <= 12) {
      setTimeOfDay("Good morning");
    }
    if (h > 12 && h <= 18) {
      setTimeOfDay("Good afternoon");
    }
    if (h > 18 && h <= 24) {
      setTimeOfDay("Good evening");
    }
  }, [time]);
  return (
    <div className="welcomeHome">
      <h3>
        {timeOfDay}, {name}! <span>👋</span>
      </h3>
      {assignedTasks?.length === 0 && (
        <p>You have nothing for today, take a nap!</p>
      )}
<SCRIPT LANGUAGE="JAVASCRIPT">
<!-- 

var r_text = new Array (); 
r_text[0] = "I was just thinking about you!"; 
r_text[1] = "You are a great example for others."; 
r_text[2] = "You have great ideas."; 
r_text[3] = "When I grow up I want to be you!"; 
r_text[4] = "I appreciate all of your opinions."; 

var i = Math.floor(r_text.length * Math.random()); 

document.write("<br /><br /><br /><br /><br /><br /><br /><center><FONT SIZE=72><FONT COLOR='#FFFFFF'>" + 
r_text[i]  + "</FONT></center><br />"); 

var bgcolorlist=new Array("#228B22", "#FFD700", "#ADFF2F", "#FF69B4", "#CD5C5C", "#4B0082", "#7CFC00", "#ADD8E6", "#E84643", "#ED0A07", "#EA2907", "#E5294B", "#E00D26", "#FF3030", "#FC7500", "#F95700", "#F43900", "#F95620") 

document.body.style.background=bgcolorlist[Math.floor(Math.random()*bgcolorlist.length)]; 

</script><br> <br> 
    <br> 
    <br> 
    <style type="text/css"> 
<!-- 
body,td,th { 
     color: #000; 
     font-family: Helvetica, sans-serif; 
</html> 
    </div>
  );
};

export default WelcomeHome;
