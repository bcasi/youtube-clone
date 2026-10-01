import { useState } from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Upload from "./pages/Upload";
import TopBar from "./components/TopBar";
import VideoPage from "./pages/VideoPage";
import SidebarNav from "./components/SidebarNav";
import Subscriptions from "./pages/Subscriptions";

import Profile from "./pages/Profile";

// function App() {
//   return (
//     <>
//       <BrowserRouter>
//         <div>
//           <div className="flex">
//             <SidebarNav />
//             <TopBar />
//           </div>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/signin" element={<Signin />} />
//             <Route path="/signup" element={<Signup />} />
//             <Route path="/upload" element={<Upload />} />
//             <Route path="/watch/:id" element={<VideoPage />} />
//           </Routes>
//         </div>
//       </BrowserRouter>
//     </>
//   );
// }
function App() {
  const [sidebarWidth, setSidebarWidth] = useState("50");
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen">
        {/* Top bar at the top */}
        <TopBar width={sidebarWidth} setWidth={setSidebarWidth} />

        {/* Main area: sidebar + content */}
        <div className="flex flex-1">
          <SidebarNav width={sidebarWidth} setWidth={setSidebarWidth} />
          <div className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/watch/:id" element={<VideoPage />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/feed/you" element={<Profile />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
