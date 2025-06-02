
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Hotels from "./pages/Hotels";
import Rooms from "./pages/Rooms";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Booking from "./pages/Booking";
import Careers from "./pages/Careers";
import Support from "./pages/Support";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import FAQ from "./pages/FAQ";
import HotelDetails from "./pages/HotelDetails";
import RoomDetails from "./pages/RoomDetails";
import NotFound from "./pages/NotFound";

// Admin routes
import Dashboard from "./pages/admin/Dashboard";
import AdminHotels from "./pages/admin/Hotels";
import AdminRooms from "./pages/admin/Rooms";
import Bookings from "./pages/admin/Bookings";
import Staff from "./pages/admin/Staff";
import Finances from "./pages/admin/Finances";
import Inventory from "./pages/admin/Inventory";
import Maintenance from "./pages/admin/Maintenance";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";
import BookingRemindersPage from "./pages/admin/BookingRemindersPage";
import Salaries from "./pages/admin/Salaries";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
       <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/support" element={<Support />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/hotels/:hotelId" element={<HotelDetails />} />
          <Route path="/rooms/:roomId" element={<RoomDetails />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/hotels" element={<AdminHotels />} />
          <Route path="/admin/rooms" element={<AdminRooms />} />
          <Route path="/admin/bookings" element={<Bookings />} />
          <Route path="/admin/booking-reminders" element={<BookingRemindersPage />} />
          <Route path="/admin/staff" element={<Staff />} />
          <Route path="/admin/salaries" element={<Salaries />} />
          <Route path="/admin/finances" element={<Finances />} />
          <Route path="/admin/inventory" element={<Inventory />} />
          <Route path="/admin/maintenance" element={<Maintenance />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/admin/settings" element={<Settings />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
