import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Sparkles, Shield } from "lucide-react";

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-to-br from-primary/5 to-primary/10 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Support Our Cause</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your donation helps us continue connecting volunteers with meaningful opportunities and supporting local communities.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h2 className="text-2xl font-bold">Your Impact</h2>
            <div className="grid gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <Heart className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-semibold mb-2">Support Local Communities</h3>
                      <p className="text-muted-foreground">
                        Your donation helps local initiatives reach more people in need.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <Sparkles className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-semibold mb-2">Enable More Opportunities</h3>
                      <p className="text-muted-foreground">
                        Help us create and support more volunteer opportunities.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <Shield className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-semibold mb-2">Secure Platform</h3>
                      <p className="text-muted-foreground">
                        Maintain and improve our platform for volunteers and NGOs.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Make a Donation</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <Button variant="outline">$10</Button>
                    <Button variant="outline">$25</Button>
                    <Button variant="outline">$50</Button>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Custom Amount
                    </label>
                    <Input type="number" placeholder="Enter amount" min="1" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <Input placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <Input type="email" placeholder="Your email" />
                  </div>
                  <Button className="w-full">Donate Now</Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Secure payment powered by Stripe
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
