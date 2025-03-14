import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Heart, Calendar, MessageSquare, MapPin, Droplet, Cross, Home } from "lucide-react";
import { Header } from "@/components/header";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        <section className="py-24 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Connect with Meaningful Volunteer Opportunities
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Whether you're looking to make a difference or seeking assistance, we're here to help you connect and create positive change.
            </p>
            <div className="space-x-4">
              <Link href="/auth">
                <Button size="lg" variant="default">Get Started</Button>
              </Link>
              <Link href="/assistance-finder">
                <Button size="lg" variant="secondary">Find Local Help</Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12">Quick Actions</h3>
            <div className="grid md:grid-cols-4 gap-8">
              <Link href="/opportunities">
                <Card className="text-center p-6 hover:border-primary cursor-pointer">
                  <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h4 className="text-xl font-semibold mb-4">Volunteer Opportunities</h4>
                  <p className="text-muted-foreground">
                    Find opportunities that match your skills
                  </p>
                </Card>
              </Link>

              <Link href="/assistance-finder">
                <Card className="text-center p-6 hover:border-primary cursor-pointer">
                  <MapPin className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h4 className="text-xl font-semibold mb-4">Find Local Help</h4>
                  <p className="text-muted-foreground">
                    Locate nearby NGOs and assistance centers
                  </p>
                </Card>
              </Link>

              <Link href="/events">
                <Card className="text-center p-6 hover:border-primary cursor-pointer">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h4 className="text-xl font-semibold mb-4">Events</h4>
                  <p className="text-muted-foreground">
                    Join upcoming community events
                  </p>
                </Card>
              </Link>

              <Link href="/forum">
                <Card className="text-center p-6 hover:border-primary cursor-pointer">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h4 className="text-xl font-semibold mb-4">Community Forum</h4>
                  <p className="text-muted-foreground">
                    Connect with other volunteers
                  </p>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12">Available Services</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6">
                <CardContent className="space-y-4">
                  <Heart className="h-8 w-8 text-primary" />
                  <h4 className="text-xl font-semibold">Food Banks</h4>
                  <p className="text-muted-foreground">
                    Find local food banks and meal services for those in need.
                  </p>
                  <Link href="/assistance-finder?category=food">
                    <Button variant="link" className="pl-0">Find Food Banks →</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardContent className="space-y-4">
                  <Droplet className="h-8 w-8 text-primary" />
                  <h4 className="text-xl font-semibold">Blood Donation</h4>
                  <p className="text-muted-foreground">
                    Locate blood donation centers and upcoming blood drives.
                  </p>
                  <Link href="/assistance-finder?category=blood">
                    <Button variant="link" className="pl-0">Find Donation Centers →</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardContent className="space-y-4">
                  <Home className="h-8 w-8 text-primary" />
                  <h4 className="text-xl font-semibold">Emergency Shelters</h4>
                  <p className="text-muted-foreground">
                    Access emergency shelter and housing assistance services.
                  </p>
                  <Link href="/assistance-finder?category=shelter">
                    <Button variant="link" className="pl-0">Find Shelters →</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold text-primary mb-2">1000+</p>
                <p className="text-lg text-muted-foreground">Active Volunteers</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary mb-2">500+</p>
                <p className="text-lg text-muted-foreground">NGO Partners</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary mb-2">2000+</p>
                <p className="text-lg text-muted-foreground">Opportunities</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary mb-2">100+</p>
                <p className="text-lg text-muted-foreground">Cities Covered</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">About Us</h4>
              <p className="text-sm text-muted-foreground">
                Volunteer Connect is a platform dedicated to connecting volunteers with meaningful opportunities and providing assistance to those in need.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/opportunities">Browse Opportunities</Link></li>
                <li><Link href="/events">Upcoming Events</Link></li>
                <li><Link href="/assistance-finder">Find Help</Link></li>
                <li><Link href="/forum">Community Forum</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Organizations</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/auth">Post Opportunities</Link></li>
                <li><Link href="/auth">Manage Volunteers</Link></li>
                <li><Link href="/auth">Create Events</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>support@volunteerconnect.com</li>
                <li>1-800-VOLUNTEER</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Volunteer Connect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}