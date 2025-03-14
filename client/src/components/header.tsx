import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Heart } from "lucide-react";

export function Header() {
  const { user, logoutMutation } = useAuth();

  return (
    <header className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center">
          <Link href="/" className="flex-shrink-0">
            <div className="flex items-center space-x-2 group">
              <Heart className="h-6 w-6 text-primary group-hover:text-primary/80 transition-colors" />
              <h1 className="text-2xl font-bold cursor-pointer bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Volunteer Connect
              </h1>
            </div>
          </Link>
          
          <div className="flex items-center justify-end flex-1 space-x-8">
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/events">
                <span className="text-muted-foreground hover:text-foreground transition-colors relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-primary after:left-0 after:-bottom-1 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
                  Events
                </span>
              </Link>
              <Link href="/opportunities">
                <span className="text-muted-foreground hover:text-foreground transition-colors relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-primary after:left-0 after:-bottom-1 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
                  Opportunities
                </span>
              </Link>
              <Link href="/assistance-finder">
                <span className="text-muted-foreground hover:text-foreground transition-colors relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-primary after:left-0 after:-bottom-1 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
                  Find Help
                </span>
              </Link>
              <Link href="/forum">
                <span className="text-muted-foreground hover:text-foreground transition-colors relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-primary after:left-0 after:-bottom-1 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
                  Forum
                </span>
              </Link>
              <Link href="/donate">
                <span className="text-primary hover:text-primary/80 font-medium transition-colors relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-primary after:left-0 after:-bottom-1 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
                  Donate
                </span>
              </Link>
            </nav>

            <div className="space-x-4">
              {user ? (
                <>
                  <Link href="/dashboard">
                    <Button variant="outline" className="hover:bg-primary/5 hover:text-primary hover:border-primary/20">
                      Dashboard
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    onClick={() => logoutMutation.mutate()}
                    className="hover:bg-destructive/5 hover:text-destructive hover:border-destructive/20"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Link href="/auth">
                  <Button className="bg-primary hover:bg-primary/90">Login / Register</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
