import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MusicPlayer from "@/components/MusicPlayer";
import FloatingLogo from "@/components/FloatingLogo";
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
import Admin from "@/pages/Admin";
import NotFound from "@/pages/NotFound";

function Layout() {
  return (
    <>
      <FloatingLogo />
      <Navbar />
      {/* flex-1 (not on mobile) stretches main to push the footer to the
          bottom of the viewport on short pages — good on desktop, but on
          mobile it leaves an absurd black gap above the footer whenever a
          page's content is shorter than the screen. Below sm, main just
          sizes to its content and the footer follows directly after. */}
      <main className="pb-24 sm:flex-1 sm:pb-20">
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
        <Route path="/admin" element={<Admin />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/standings" element={<Standings />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/:teamId" element={<TeamDetail />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/players" element={<Players />} />
          <Route path="/players/:playerSlug" element={<PlayerDetail />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/accolades" element={<Accolades />} />
          <Route path="/history" element={<History />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
