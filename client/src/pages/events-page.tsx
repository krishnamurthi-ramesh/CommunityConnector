import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EventsPage() {
  const events = [
    {
      id: 1,
      title: "Community Clean-up Drive",
      date: "March 20, 2024",
      time: "9:00 AM - 1:00 PM",
      location: "Central Park",
      attendees: 45,
      description: "Join us for a community-wide initiative to clean and beautify our local parks.",
    },
    {
      id: 2,
      title: "Food Bank Distribution",
      date: "March 25, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Community Center",
      attendees: 30,
      description: "Help distribute food packages to families in need.",
    },
    {
      id: 3,
      title: "Senior Center Visit",
      date: "March 28, 2024",
      time: "2:00 PM - 5:00 PM",
      location: "Golden Age Center",
      attendees: 20,
      description: "Spend time with seniors through various activities and conversations.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-to-br from-primary/5 to-primary/10 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Upcoming Events</h1>
          <p className="text-lg text-muted-foreground">
            Find and participate in local volunteer events and make a difference in your community.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event.id}>
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{event.attendees} volunteers needed</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                  <Button className="w-full">Register</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
