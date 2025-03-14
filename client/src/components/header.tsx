import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export function Header() {
  const { user, logoutMutation } = useAuth();

  return (
    <header className="bg-background border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/">
            <h1 className="text-2xl font-bold cursor-pointer">Volunteer Connect</h1>
          </Link>
          <nav className="space-x-4">
            <Link href="/events" className="text-muted-foreground hover:text-foreground">
              Events
            </Link>
            <Link href="/opportunities" className="text-muted-foreground hover:text-foreground">
              Opportunities
            </Link>
            <Link href="/assistance-finder" className="text-muted-foreground hover:text-foreground">
              Find Help
            </Link>
            <Link href="/forum" className="text-muted-foreground hover:text-foreground">
              Forum
            </Link>
            <Link href="/donate" className="text-muted-foreground hover:text-foreground">
              Donate
            </Link>
          </nav>
        </div>
        <div className="space-x-4">
          {user ? (
            <>
              <Link href="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
              <Button variant="outline" onClick={() => logoutMutation.mutate()}>
                Logout
              </Button>
            </>
          ) : (
            <Link href="/auth">
              <Button>Login / Register</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
