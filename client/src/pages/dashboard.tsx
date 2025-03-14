import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Loader2 } from "lucide-react";

export default function Dashboard() {
  const { user, logoutMutation } = useAuth();

  const { data: opportunities, isLoading: loadingOpportunities } = useQuery({
    queryKey: ["/api/opportunities"],
  });

  const { data: applications, isLoading: loadingApplications } = useQuery({
    queryKey: ["/api/applications"],
  });

  if (loadingOpportunities || loadingApplications) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-border" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
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
                      <p className="text-muted-foreground">{opportunity.description}</p>
                      <p className="mt-2">Location: {opportunity.location}</p>
                      <p>Status: {opportunity.status}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Your Applications</h2>
              <div className="grid gap-4">
                {applications?.map((application) => {
                  const opportunity = opportunities?.find(
                    (o) => o.id === application.opportunityId
                  );
                  return (
                    <Card key={application.id}>
                      <CardHeader>
                        <CardTitle>{opportunity?.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Status: {application.status}</p>
                        <p>Applied: {new Date(application.appliedAt).toLocaleDateString()}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
