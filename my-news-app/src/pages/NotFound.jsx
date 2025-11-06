import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-4">Sahifa topilmadi</h2>
        <p className="text-muted-foreground mb-8">
          Kechirasiz, siz qidirayotgan sahifa mavjud emas yoki ko'chirilgan.
        </p>
        <Link to="/">
          <Button size="lg">
            <Home className="h-5 w-5 mr-2" />
            Bosh sahifaga qaytish
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
