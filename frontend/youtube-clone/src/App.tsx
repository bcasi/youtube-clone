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
import Channel from "./pages/Channel";

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
  const [search, setSearch] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [profilePic, setProfilePic] = useState<string | null>(null);

  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen overflow-hidden">
        <div className="shrink-0 z-50">
          <TopBar
            width={sidebarWidth}
            setWidth={setSidebarWidth}
            search={search}
            setSearch={setSearch}
            token={token}
            setToken={setToken}
            profilePic={profilePic}
            setProfilePic={setProfilePic}
          />
        </div>

        <div className="flex flex-1 min-h-0 overflow-hidden">
          <aside className="shrink-0 h-full overflow-y-hidden  overflow-x-hidden">
            <SidebarNav width={sidebarWidth} setWidth={setSidebarWidth} />
          </aside>
          <main className="flex-1 min-w-0 min-h-0 overflow-y-auto overflow-x-hidden">
            <Routes>
              <Route path="/" element={<Home search={search} />} />
              <Route
                path="/signin"
                element={
                  <Signin
                    token={token}
                    setToken={setToken}
                    setProfilePic={setProfilePic}
                  />
                }
              />
              <Route path="/signup" element={<Signup />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/watch/:id" element={<VideoPage />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/feed/you" element={<Profile />} />
              <Route path="/channel/:channelname" element={<Channel />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
