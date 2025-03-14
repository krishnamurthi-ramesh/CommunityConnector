import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Clock, Heart, Cross, Home, Droplet } from "lucide-react";
import { useState } from "react";

export default function AssistanceFinder() {
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("all");

  // Sample data - in a real app, this would come from an API
  const organizations = [
    {
      id: 1,
      name: "City Food Bank",
      category: "food",
      address: "123 Main St, City Center",
      phone: "555-0123",
      hours: "Mon-Sat: 9AM-5PM",
      services: ["Food distribution", "Meal service", "Emergency food boxes"],
    },
    {
      id: 2,
      name: "Community Blood Center",
      category: "blood",
      address: "456 Health Ave",
      phone: "555-0124",
      hours: "Mon-Sun: 8AM-8PM",
      services: ["Blood donation", "Plasma donation", "Health screening"],
    },
    {
      id: 3,
      name: "Hope Shelter",
      category: "shelter",
      address: "789 Hope Street",
      phone: "555-0125",
      hours: "24/7",
      services: ["Emergency shelter", "Transitional housing", "Support services"],
    },
  ];

  const filteredOrganizations = organizations.filter(org => 
    (category === "all" || org.category === category) &&
    (!location || org.address.toLowerCase().includes(location.toLowerCase()))
  );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "food":
        return <Heart className="h-5 w-5" />;
      case "blood":
        return <Droplet className="h-5 w-5" />;
      case "shelter":
        return <Home className="h-5 w-5" />;
      default:
        return <Cross className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Find Assistance Near You</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Locate nearby NGOs, food banks, blood donation centers, and shelters providing essential services.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <Input
                placeholder="Enter your location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  <SelectItem value="food">Food Banks</SelectItem>
                  <SelectItem value="blood">Blood Donation</SelectItem>
                  <SelectItem value="shelter">Shelters</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-6">
            {filteredOrganizations.map((org) => (
              <Card key={org.id}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(org.category)}
                    <CardTitle>{org.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{org.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{org.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{org.hours}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Services</h4>
                      <ul className="list-disc list-inside text-sm text-muted-foreground">
                        {org.services.map((service, index) => (
                          <li key={index}>{service}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <Button className="w-full mt-4">Get Directions</Button>
                </CardContent>
              </Card>
            ))}
            {filteredOrganizations.length === 0 && (
              <Card>
                <CardContent className="p-6 text-center text-muted-foreground">
                  <p>No organizations found matching your criteria.</p>
                  <p className="text-sm mt-2">Try adjusting your filters or location.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
