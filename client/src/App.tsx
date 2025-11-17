import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import Welcome from "@/pages/Welcome";
import MainPage from "@/pages/MainPage";
import LiveRoutineDemo from "@/pages/LiveRoutineDemo";
import Challenges from "@/pages/Challenges";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route path="/" component={Welcome} />
        <Route path="/app" component={MainPage} />
        <Route path="/live-routine" component={LiveRoutineDemo} />
        <Route path="/challenges" component={Challenges} />
      </Switch>
    </QueryClientProvider>
  );
}

export default App;
