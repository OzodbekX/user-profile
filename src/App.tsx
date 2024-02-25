import React from 'react';
import {QueryClient, QueryClientProvider} from "react-query";
import UserProfile from "./Components/UserProfile";
import './App.css';

const queryClient = new QueryClient()

function App() {
  return (<QueryClientProvider client={queryClient}>
        <div className="App">
          <UserProfile/>
        </div>
      </QueryClientProvider>

  );
}

export default App;
