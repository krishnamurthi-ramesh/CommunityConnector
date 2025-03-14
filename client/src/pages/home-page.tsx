import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Heart, Calendar, MessageSquare, ArrowRight, CheckCircle, Trophy, Clock } from "lucide-react";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Volunteer Connect</h1>
          <nav className="space-x-6">
            <Link href="/events" className="text-muted-foreground hover:text-foreground">
              Events
            </Link>
            <Link href="/donate" className="text-muted-foreground hover:text-foreground">
              Donate
            </Link>
            <Link href="/forum" className="text-muted-foreground hover:text-foreground">
              Forum
            </Link>
            {user ? (
              <Link href="/dashboard">
                <Button variant="default">Dashboard</Button>
              </Link>
            ) : (
              <Link href="/auth">
                <Button variant="default">Login / Register</Button>
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main>
        <section className="py-24 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Connect with Meaningful Volunteer Opportunities
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Whether you're an individual looking to make a difference or an organization seeking dedicated volunteers, we're here to help you connect and create positive change.
            </p>
            <div className="space-x-4">
              <Link href="/auth">
                <Button size="lg" variant="default">Get Started</Button>
              </Link>
              <Link href="/opportunities">
                <Button size="lg" variant="outline">Browse Opportunities</Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12">Our Features</h3>
            <div className="grid md:grid-cols-4 gap-8">
              <Card className="text-center p-6">
                <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h4 className="text-xl font-semibold mb-4">Volunteer Matching</h4>
                <p className="text-muted-foreground">
                  Find opportunities that match your skills and interests
                </p>
              </Card>
              <Card className="text-center p-6">
                <Heart className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h4 className="text-xl font-semibold mb-4">Make an Impact</h4>
                <p className="text-muted-foreground">
                  Contribute to causes you care about
                </p>
              </Card>
              <Card className="text-center p-6">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h4 className="text-xl font-semibold mb-4">Event Management</h4>
                <p className="text-muted-foreground">
                  Organize and join community events
                </p>
              </Card>
              <Card className="text-center p-6">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h4 className="text-xl font-semibold mb-4">Community Forum</h4>
                <p className="text-muted-foreground">
                  Connect with other volunteers
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12">Success Stories</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6">
                <CardContent className="space-y-4">
                  <Trophy className="h-8 w-8 text-primary" />
                  <h4 className="text-xl font-semibold">Local Food Drive</h4>
                  <p className="text-muted-foreground">
                    "Our team of volunteers helped distribute over 1000 meals to families in need during the holiday season."
                  </p>
                  <p className="text-sm font-medium">- Community Food Bank</p>
                </CardContent>
              </Card>
              <Card className="p-6">
                <CardContent className="space-y-4">
                  <CheckCircle className="h-8 w-8 text-primary" />
                  <h4 className="text-xl font-semibold">Youth Mentorship</h4>
                  <p className="text-muted-foreground">
                    "Through our mentorship program, we've helped 50 students improve their academic performance."
                  </p>
                  <p className="text-sm font-medium">- Education First NGO</p>
                </CardContent>
              </Card>
              <Card className="p-6">
                <CardContent className="space-y-4">
                  <Clock className="h-8 w-8 text-primary" />
                  <h4 className="text-xl font-semibold">Environmental Impact</h4>
                  <p className="text-muted-foreground">
                    "Our volunteers planted 500 trees and cleaned up 3 local parks in just one month."
                  </p>
                  <p className="text-sm font-medium">- Green Earth Initiative</p>
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
                Volunteer Connect is a platform dedicated to connecting volunteers with meaningful opportunities to make a difference.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/opportunities">Browse Opportunities</Link></li>
                <li><Link href="/events">Upcoming Events</Link></li>
                <li><Link href="/donate">Donate</Link></li>
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