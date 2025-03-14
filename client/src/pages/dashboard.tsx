import { useAuth } from "@/hooks/use-auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { Loader2, MapPin, Calendar, Users, Clock, Award, ChartBar, Target } from "lucide-react";
import type { Opportunity, Application } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/header";

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

  const { data: registeredEvents, isLoading: loadingEvents } = useQuery({
    queryKey: ["/api/events/registrations"],
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

  if (loadingOpportunities || loadingApplications || loadingEvents) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background rounded-lg p-8">
            <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name}</h1>
            <p className="text-muted-foreground">
              {user?.userType === "ngo"
                ? "Manage your volunteer opportunities and track your impact"
                : "Find opportunities and track your volunteering journey"}
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <Card className="bg-primary/5">
                <CardContent className="p-6">
                  <Award className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-semibold text-lg">Impact Score</h3>
                  <p className="text-3xl font-bold text-primary">85</p>
                </CardContent>
              </Card>
              <Card className="bg-primary/5">
                <CardContent className="p-6">
                  <ChartBar className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-semibold text-lg">Total Hours</h3>
                  <p className="text-3xl font-bold text-primary">24</p>
                </CardContent>
              </Card>
              <Card className="bg-primary/5">
                <CardContent className="p-6">
                  <Target className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-semibold text-lg">Active Goals</h3>
                  <p className="text-3xl font-bold text-primary">3</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {user?.userType === "individual" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Your Registered Events</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {registeredEvents && registeredEvents.length > 0 ? (
                    registeredEvents.map((event: any) => (
                      <Card key={event.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader className="bg-primary/5">
                          <CardTitle>{event.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <div className="space-y-2">
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
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card className="col-span-full">
                      <CardContent className="p-6 text-center text-muted-foreground">
                        <p>You haven't registered for any events yet.</p>
                        <Link href="/events">
                          <Button variant="link">Browse upcoming events</Button>
                        </Link>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Your Applications</h2>
                  <div className="grid gap-4">
                    {applications && applications.length > 0 ? (
                      applications.map((application) => {
                        const opportunity = opportunities?.find(
                          (o) => o.id === application.opportunityId
                        );
                        return (
                          <Card key={application.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader className={`${
                              application.status === 'accepted' ? 'bg-green-50' :
                              application.status === 'rejected' ? 'bg-red-50' :
                              'bg-primary/5'
                            }`}>
                              <CardTitle>{opportunity?.title || "Opportunity"}</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4">
                              <div className="space-y-2">
                                <p>Status: <span className={`font-medium ${
                                  application.status === 'accepted' ? 'text-green-600' :
                                  application.status === 'rejected' ? 'text-red-600' :
                                  'text-primary'
                                }`}>{application.status}</span></p>
                                <p className="text-sm text-muted-foreground">
                                  Applied: {new Date(application.appliedAt).toLocaleDateString()}
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })
                    ) : (
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
                      <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
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
                            className="w-full bg-primary/90 hover:bg-primary" 
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
                  </div>
                </div>
              </div>
            </div>
          )}

          {user?.userType === "ngo" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Your Opportunities</h2>
                <Link href="/opportunities/new">
                  <Button className="bg-primary/90 hover:bg-primary">Post New Opportunity</Button>
                </Link>
              </div>
              <div className="grid gap-4">
                {opportunities?.filter(o => o.organizationId === user.id).map((opportunity) => (
                  <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="bg-primary/5">
                      <CardTitle>{opportunity.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
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
                          <span className={opportunity.status === 'open' ? 'text-green-600' : 'text-red-600'}>
                            {opportunity.status}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}