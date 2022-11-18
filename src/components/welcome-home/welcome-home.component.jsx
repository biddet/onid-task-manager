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
<script type='text/javascript'>
function random_content(){
	var tip=new Array()

	tip[0]="Always use Amorer\'s Hammers to repair items\.\.\. it is much cheaper and helps you level up faster\."
	tip[1]="Go as long as you can without meditating\.\.\. you\'ll get attributes faster but won\'t get a high level\."
	tip[2]="Try not to use sources of fast travel \(e\.g\. Silt Strider\) and you will get more experience from kills along the way and just running\."
	tip[3]="If you want to kill someone... take something and wait until they hit you, it will be self-defense and you are only fined for theft\."
	tip[4]="Never store your items in a container\.\.\. some have owners and all items put in them will be considered stolen when removed\."
	tip[5]="The farther you fall\.\.\. the faster you level up in acrobatics\.\.\. unless\, of course\, you die\. \:\-\)"

	var rt=Math.floor(Math.random()*tip.length)

	document.write(tip[rt])
}
random_content()
</script>
    </div>
  );
};

export default WelcomeHome;
