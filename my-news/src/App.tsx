import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LikesProvider } from "@/contexts/LikesContext";
import Index from "./pages/Index";
import Lenta from "./pages/Lenta";
import Categories from "./pages/Categories";
import CategoryDetail from "./pages/CategoryDetail";
import SingleNews from "./pages/SingleNews";
import Settings from "./pages/Settings";
import Search from "./pages/Search";
import Saved from "./pages/Saved";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LikesProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/lenta" element={<Lenta />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/category/:slug" element={<CategoryDetail />} />
              <Route path="/news/:id" element={<SingleNews />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/search" element={<Search />} />
              <Route path="/saved" element={<Saved />} />
              <Route path="/settings/about" element={<About />} />
              <Route path="/settings/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </LikesProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
