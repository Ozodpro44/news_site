import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Phone, MapPin } from "lucide-react";

import MainLayout from "../components/layout/MainLayout";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";

const Contact = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Link to="/settings">
          <Button variant="ghost" size="sm" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Orqaga
          </Button>
        </Link>

        <h1 className="text-4xl font-bold mb-8">Biz bilan bog'lanish</h1>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <Mail className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-semibold mb-2">Elektron pochta</h3>
            <p className="text-muted-foreground">info@newsplatform.uz</p>
            <p className="text-muted-foreground">support@newsplatform.uz</p>
          </Card>

          <Card className="p-6">
            <Phone className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-semibold mb-2">Telefon</h3>
            <p className="text-muted-foreground">+998 71 123 45 67</p>
            <p className="text-muted-foreground">+998 90 123 45 67</p>
          </Card>

          <Card className="p-6 md:col-span-2">
            <MapPin className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-semibold mb-2">Manzil</h3>
            <p className="text-muted-foreground">
              Toshkent shahri, Yunusobod tumani, Amir Temur ko'chasi, 123-uy
            </p>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Xabar yuborish</h2>
          <form className="space-y-4">
            <div>
              <Label htmlFor="name">Ismingiz</Label>
              <Input id="name" placeholder="Ismingizni kiriting" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="email@example.com" />
            </div>
            <div>
              <Label htmlFor="subject">Mavzu</Label>
              <Input id="subject" placeholder="Xabar mavzusi" />
            </div>
            <div>
              <Label htmlFor="message">Xabar</Label>
              <Textarea
                id="message"
                placeholder="Xabaringizni yozing..."
                rows={6}
              />
            </div>
            <Button type="submit" size="lg" className="w-full">
              Xabar yuborish
            </Button>
          </form>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Contact;
