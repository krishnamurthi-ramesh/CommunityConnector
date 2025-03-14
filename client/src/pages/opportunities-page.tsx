import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { MapPin, Calendar, Users, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Opportunity } from "@shared/schema";

export default function OpportunitiesPage() {
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: opportunities, isLoading } = useQuery<Opportunity[]>({
    queryKey: ["/api/opportunities"],
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-border" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-to-br from-primary/5 to-primary/10 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Volunteer Opportunities</h1>
          <p className="text-lg text-muted-foreground">
            Find meaningful opportunities to make a difference in your community.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          {opportunities?.filter(o => o.status === "open").map((opportunity) => (
            <Card key={opportunity.id}>
              <CardHeader>
                <CardTitle>{opportunity.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{opportunity.description}</p>
                <div className="space-y-2 mb-4">
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
                    <span>Skills needed: {opportunity.requiredSkills?.join(", ")}</span>
                  </div>
                </div>
                {user?.userType === "individual" ? (
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
                ) : (
                  <Button className="w-full" variant="outline" disabled>
                    Login as Individual to Apply
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
          {(!opportunities || opportunities.filter(o => o.status === "open").length === 0) && (
            <Card className="col-span-full">
              <CardContent className="p-6 text-center text-muted-foreground">
                <p>No opportunities available at the moment.</p>
                <p className="text-sm mt-2">Check back soon!</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
