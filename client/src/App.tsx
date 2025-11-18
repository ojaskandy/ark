import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import Welcome from "@/pages/Welcome";
import MainPage from "@/pages/MainPage";
import LiveRoutineDemo from "@/pages/LiveRoutineDemo";
import Challenges from "@/pages/Challenges";
import About from "@/pages/About";
import ClassSchedule from "@/pages/ClassSchedule";
import Registration from "@/pages/Registration";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route path="/" component={Welcome} />
        <Route path="/about" component={About} />
        <Route path="/class-schedule" component={ClassSchedule} />
        <Route path="/registration" component={Registration} />
        <Route path="/app" component={MainPage} />
        <Route path="/live-routine" component={LiveRoutineDemo} />
        <Route path="/challenges" component={Challenges} />
      </Switch>
    </QueryClientProvider>
  );
}

export default App;
