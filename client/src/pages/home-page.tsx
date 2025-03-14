import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Volunteer Connect</h1>
          <div className="space-x-4">
            {user ? (
              <Link href="/dashboard">
                <Button variant="default">Dashboard</Button>
              </Link>
            ) : (
              <Link href="/auth">
                <Button variant="default">Login / Register</Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main>
        <section className="py-20 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Connect with Meaningful Volunteer Opportunities
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Whether you're an individual looking to make a difference or an organization seeking dedicated volunteers, we're here to help you connect.
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
            <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <h4 className="text-xl font-semibold mb-4">For Volunteers</h4>
                <p className="text-muted-foreground">
                  Create a profile, browse opportunities, and connect with organizations making a difference in your community.
                </p>
              </div>
              <div className="text-center">
                <h4 className="text-xl font-semibold mb-4">For Organizations</h4>
                <p className="text-muted-foreground">
                  Post opportunities, manage applications, and find dedicated volunteers who share your mission.
                </p>
              </div>
              <div className="text-center">
                <h4 className="text-xl font-semibold mb-4">Make an Impact</h4>
                <p className="text-muted-foreground">
                  Together, we can create positive change and build stronger communities through volunteerism.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 Volunteer Connect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
