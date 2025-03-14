import { useAuth } from "@/hooks/use-auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { Loader2, MapPin, Calendar, Users } from "lucide-react";
import type { Opportunity, Application } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const { user, logoutMutation } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: opportunities, isLoading: loadingOpportunities, error: opportunitiesError } = useQuery<Opportunity[]>({
    queryKey: ["/api/opportunities"],
  });

  const { data: applications, isLoading: loadingApplications, error: applicationsError } = useQuery<Application[]>({
    queryKey: ["/api/applications"],
    enabled: user?.userType === "individual",
  });

  const applyMutation = useMutation({
    mutationFn: async (opportunityId: number) => {
      const res = await apiRequest("POST", `/api/opportunities/${opportunityId}/apply`, {});
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/applications"] });
      toast({
        title: "Success",
        description: "Application submitted successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (loadingOpportunities || loadingApplications) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-border" />
      </div>
    );
  }

  if (opportunitiesError || applicationsError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Error loading data. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <nav className="space-x-4">
              <Link href="/" className="text-muted-foreground hover:text-foreground">
                Home
              </Link>
              <Link href="/events" className="text-muted-foreground hover:text-foreground">
                Events
              </Link>
              <Link href="/forum" className="text-muted-foreground hover:text-foreground">
                Forum
              </Link>
            </nav>
          </div>
          <div className="space-x-4">
            <Button variant="outline" onClick={() => logoutMutation.mutate()}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Welcome, {user?.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {user?.userType === "ngo"
                  ? "Manage your volunteer opportunities and applications"
                  : "Find and apply for volunteer opportunities"}
              </p>
            </CardContent>
          </Card>

          {user?.userType === "ngo" ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Your Opportunities</h2>
                <Link href="/opportunities/new">
                  <Button>Post New Opportunity</Button>
                </Link>
              </div>
              <div className="grid gap-4">
                {opportunities?.filter(o => o.organizationId === user.id).map((opportunity) => (
                  <Card key={opportunity.id}>
                    <CardHeader>
                      <CardTitle>{opportunity.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{opportunity.description}</p>
                      <div className="grid sm:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{opportunity.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(opportunity.startDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>{opportunity.status}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {(!opportunities || opportunities.filter(o => o.organizationId === user.id).length === 0) && (
                  <Card>
                    <CardContent className="p-6 text-center text-muted-foreground">
                      <p>You haven't posted any opportunities yet.</p>
                      <Link href="/opportunities/new">
                        <Button variant="link">Post your first opportunity</Button>
                      </Link>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Your Applications</h2>
                  <div className="grid gap-4">
                    {applications?.map((application) => {
                      const opportunity = opportunities?.find(
                        (o) => o.id === application.opportunityId
                      );
                      return (
                        <Card key={application.id}>
                          <CardHeader>
                            <CardTitle>{opportunity?.title || "Opportunity"}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <p>Status: <span className="font-medium">{application.status}</span></p>
                              <p className="text-sm text-muted-foreground">
                                Applied: {new Date(application.appliedAt).toLocaleDateString()}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                    {(!applications || applications.length === 0) && (
                      <Card>
                        <CardContent className="p-6 text-center text-muted-foreground">
                          <p>You haven't applied to any opportunities yet.</p>
                          <p className="text-sm mt-2">Browse opportunities below to get started!</p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Available Opportunities</h2>
                  <div className="grid gap-4">
                    {opportunities?.filter(o => o.status === "open").map((opportunity) => (
                      <Card key={opportunity.id}>
                        <CardHeader>
                          <CardTitle>{opportunity.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-4">{opportunity.description}</p>
                          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              <span>{opportunity.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(opportunity.startDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <Button 
                            className="w-full" 
                            onClick={() => applyMutation.mutate(opportunity.id)}
                            disabled={applyMutation.isPending}
                          >
                            {applyMutation.isPending ? (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : null}
                            Apply Now
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                    {(!opportunities || opportunities.filter(o => o.status === "open").length === 0) && (
                      <Card>
                        <CardContent className="p-6 text-center text-muted-foreground">
                          <p>No opportunities available at the moment.</p>
                          <p className="text-sm mt-2">Check back soon!</p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}