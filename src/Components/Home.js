import React from "react";
import WelcomeBanner from "./WelcomeBanner";
import TaskManager from "./TaskManager";
import CommonScreen from "./CommonScreen";

function Home() {
  return (
    <>
      <WelcomeBanner />
      <TaskManager tasks={tasks} setTasks={setTasks} />
      <CommonScreen />
    </>
  );
}

export default Home;
