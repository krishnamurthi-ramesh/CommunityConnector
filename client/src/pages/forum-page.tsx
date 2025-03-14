import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Users, Star } from "lucide-react";

export default function ForumPage() {
  const discussions = [
    {
      id: 1,
      title: "Tips for First-Time Volunteers",
      author: "Sarah M.",
      replies: 24,
      views: 156,
      lastActive: "2 hours ago",
    },
    {
      id: 2,
      title: "Best Practices for NGO Fundraising",
      author: "Michael R.",
      replies: 18,
      views: 203,
      lastActive: "4 hours ago",
    },
    {
      id: 3,
      title: "Organizing Community Clean-up Events",
      author: "Emma L.",
      replies: 31,
      views: 289,
      lastActive: "1 day ago",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-to-br from-primary/5 to-primary/10 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Community Forum</h1>
          <p className="text-lg text-muted-foreground">
            Connect, share experiences, and learn from fellow volunteers and organizations.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="mb-8 flex justify-between items-center">
          <div className="flex gap-4">
            <Button variant="outline">Popular Topics</Button>
            <Button variant="outline">Recent Activity</Button>
            <Button variant="outline">My Discussions</Button>
          </div>
          <Button>Start New Discussion</Button>
        </div>

        <div className="grid gap-4">
          {discussions.map((discussion) => (
            <Card key={discussion.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold hover:text-primary cursor-pointer">
                      {discussion.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{discussion.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{discussion.replies} replies</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        <span>{discussion.views} views</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {discussion.lastActive}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Featured Resources</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">Volunteer Guide</h4>
                  <p className="text-sm text-muted-foreground">
                    Essential tips and best practices for new volunteers.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">NGO Resources</h4>
                  <p className="text-sm text-muted-foreground">
                    Tools and guides for organization management.
                  </p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
