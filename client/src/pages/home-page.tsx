import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Heart, Calendar, MessageSquare, MapPin, Droplet, Cross, Home, Phone } from "lucide-react";
import { Header } from "@/components/header";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        <section className="py-36 relative bg-gradient-to-br from-primary/5 to-primary/10">
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: 'url("/src/components/images/image.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.15
            }}
          />
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Connect with Meaningful Volunteer Opportunities
            </h2>
            <br/>
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

        <section className="py-20 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12">Available Services</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="relative h-[400px] overflow-hidden group hover:shadow-xl transition-all duration-300">
                <img 
                  src="/src/components/images/food.webp" 
                  alt="Food Bank Services" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                <CardContent className="relative h-full flex flex-col justify-end p-8 text-white space-y-4">
                  <div className="absolute top-6 left-6">
                    <Heart className="h-10 w-10 text-primary-foreground drop-shadow-lg" />
                  </div>
                  <h4 className="text-2xl font-bold text-primary-foreground drop-shadow-lg">Food Banks</h4>
                  <p className="text-gray-200 text-lg">
                    Find local food banks and meal services for those in need.
                  </p>
                  <Link href="/assistance-finder?category=food" className="mt-4 block">
                    <Button 
                      variant="default" 
                      className="w-full bg-white/90 hover:bg-white text-black hover:text-black/80 border-2 border-transparent hover:border-white/50 transition-all duration-300"
                    >
                      Find Food Banks →
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="relative h-[400px] overflow-hidden group hover:shadow-xl transition-all duration-300">
                <img 
                  src="/src/components/images/blood donation.webp" 
                  alt="Blood Donation Centers" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                <CardContent className="relative h-full flex flex-col justify-end p-8 text-white space-y-4">
                  <div className="absolute top-6 left-6">
                    <Droplet className="h-10 w-10 text-red-500 drop-shadow-lg" />
                  </div>
                  <h4 className="text-2xl font-bold text-primary-foreground drop-shadow-lg">Blood Donation</h4>
                  <p className="text-gray-200 text-lg">
                    Locate blood donation centers and upcoming blood drives.
                  </p>
                  <Link href="/assistance-finder?category=blood" className="mt-4 block">
                    <Button 
                      variant="default" 
                      className="w-full bg-white/90 hover:bg-white text-black hover:text-black/80 border-2 border-transparent hover:border-white/50 transition-all duration-300"
                    >
                      Find Donation Centers →
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="relative h-[400px] overflow-hidden group hover:shadow-xl transition-all duration-300">
                <img 
                  src="/src/components/images/emergency shelters.webp" 
                  alt="Emergency Shelter Services" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                <CardContent className="relative h-full flex flex-col justify-end p-8 text-white space-y-4">
                  <div className="absolute top-6 left-6">
                    <Home className="h-10 w-10 text-blue-400 drop-shadow-lg" />
                  </div>
                  <h4 className="text-2xl font-bold text-primary-foreground drop-shadow-lg">Emergency Shelters</h4>
                  <p className="text-gray-200 text-lg">
                    Access emergency shelter and housing assistance services.
                  </p>
                  <Link href="/assistance-finder?category=shelter" className="mt-4 block">
                    <Button 
                      variant="default" 
                      className="w-full bg-white/90 hover:bg-white text-black hover:text-black/80 border-2 border-transparent hover:border-white/50 transition-all duration-300"
                    >
                      Find Shelters →
                    </Button>
                  </Link>
                </CardContent>
              </Card>
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

        <section 
          className="py-20 relative bg-cover bg-center"
          style={{
            backgroundImage: 'url("/src/components/images/desc.jpg")'
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-5xl font-bold text-white mb-2">1000+</p>
                <p className="text-lg text-gray-200">Active Volunteers</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-white mb-2">500+</p>
                <p className="text-lg text-gray-200">NGO Partners</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-white mb-2">2000+</p>
                <p className="text-lg text-gray-200">Opportunities</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-white mb-2">100+</p>
                <p className="text-lg text-gray-200">Cities Covered</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gradient-to-br from-black to-gray-950 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Heart className="h-6 w-6 text-rose-500 animate-pulse" />
                <h4 className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-rose-300 bg-clip-text text-transparent">About Us</h4>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Volunteer Connect is a platform dedicated to connecting volunteers with meaningful opportunities and providing assistance to those in need. Together, we're building a stronger, more compassionate community.
              </p>
              <div className="flex items-center space-x-4 pt-2">
                <Button variant="outline" size="icon" className="rounded-full bg-gray-900 border-rose-500/20 hover:bg-rose-500 hover:border-rose-500 text-rose-500 hover:text-white transition-all duration-300">
                  <MessageSquare className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full bg-gray-900 border-rose-500/20 hover:bg-rose-500 hover:border-rose-500 text-rose-500 hover:text-white transition-all duration-300">
                  <Users className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full bg-gray-900 border-rose-500/20 hover:bg-rose-500 hover:border-rose-500 text-rose-500 hover:text-white transition-all duration-300">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-rose-500">Quick Links</h4>
              <ul className="space-y-3">
                <li className="hover:translate-x-2 transition-transform duration-300">
                  <Link href="/opportunities" className="text-gray-400 hover:text-rose-300">Browse Opportunities →</Link>
                </li>
                <li className="hover:translate-x-2 transition-transform duration-300">
                  <Link href="/events" className="text-gray-400 hover:text-rose-300">Upcoming Events →</Link>
                </li>
                <li className="hover:translate-x-2 transition-transform duration-300">
                  <Link href="/assistance-finder" className="text-gray-400 hover:text-rose-300">Find Help →</Link>
                </li>
                <li className="hover:translate-x-2 transition-transform duration-300">
                  <Link href="/forum" className="text-gray-400 hover:text-rose-300">Community Forum →</Link>
                </li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-rose-500">For Organizations</h4>
              <ul className="space-y-3">
                <li className="hover:translate-x-2 transition-transform duration-300">
                  <Link href="/auth" className="text-gray-400 hover:text-rose-300">Post Opportunities →</Link>
                </li>
                <li className="hover:translate-x-2 transition-transform duration-300">
                  <Link href="/auth" className="text-gray-400 hover:text-rose-300">Manage Volunteers →</Link>
                </li>
                <li className="hover:translate-x-2 transition-transform duration-300">
                  <Link href="/auth" className="text-gray-400 hover:text-rose-300">Create Events →</Link>
                </li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-rose-500">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3 text-gray-400">
                  <MessageSquare className="h-5 w-5 text-rose-500" />
                  <span>support@volunteerconnect.com</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-400">
                  <Phone className="h-5 w-5 text-rose-500" />
                  <span>1-800-VOLUNTEER</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-400">
                  <MapPin className="h-5 w-5 text-rose-500" />
                  <span>Global Community</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-900 text-center text-gray-500">
            <p className="text-sm">&copy; 2024 Volunteer Connect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}