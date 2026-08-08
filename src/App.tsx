import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MusicPlayer from "@/components/MusicPlayer";
import PageTransition from "@/components/PageTransition";
import Home from "@/pages/Home";
import Standings from "@/pages/Standings";
import Schedule from "@/pages/Schedule";
import Teams from "@/pages/Teams";
import TeamDetail from "@/pages/TeamDetail";
import Stats from "@/pages/Stats";
import Players from "@/pages/Players";
import PlayerDetail from "@/pages/PlayerDetail";
import Staff from "@/pages/Staff";
import Accolades from "@/pages/Accolades";
import History from "@/pages/History";
import NotFound from "@/pages/NotFound";

function Layout() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pb-24 sm:pb-20">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
      <MusicPlayer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/standings" element={<Standings />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/:teamId" element={<TeamDetail />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/players" element={<Players />} />
          <Route path="/players/:playerId" element={<PlayerDetail />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/accolades" element={<Accolades />} />
          <Route path="/history" element={<History />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
