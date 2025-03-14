import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Users, Star, Send } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "wouter";

export default function ForumPage() {
  const { user } = useAuth();
  const [selectedDiscussion, setSelectedDiscussion] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const discussions = [
    {
      id: 1,
      title: "Tips for First-Time Volunteers",
      author: "Sarah M.",
      replies: 24,
      views: 156,
      lastActive: "2 hours ago",
      messages: [
        { id: 1, author: "Sarah M.", content: "What advice would you give to someone just starting their volunteering journey?", time: "2 hours ago" },
        { id: 2, author: "John D.", content: "Start small and be consistent. It's better to commit to a few hours weekly than burnout trying to do too much.", time: "1 hour ago" }
      ]
    },
    {
      id: 2,
      title: "Best Practices for NGO Fundraising",
      author: "Michael R.",
      replies: 18,
      views: 203,
      lastActive: "4 hours ago",
      messages: [
        { id: 1, author: "Michael R.", content: "Looking for innovative fundraising ideas that worked well for your organization.", time: "4 hours ago" }
      ]
    },
    {
      id: 3,
      title: "Organizing Community Clean-up Events",
      author: "Emma L.",
      replies: 31,
      views: 289,
      lastActive: "1 day ago",
      messages: [
        { id: 1, author: "Emma L.", content: "Planning a beach cleanup next month. Any tips on organizing large groups?", time: "1 day ago" }
      ]
    },
  ];

  const handleSendMessage = () => {
    if (!user) {
      // Redirect to login if not authenticated
      return;
    }
    // In a real app, this would send the message to the backend
    console.log("Sending message:", newMessage);
    setNewMessage("");
  };

  const selectedThread = discussions.find(d => d.id === selectedDiscussion);

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
          {user ? (
            <Button>Start New Discussion</Button>
          ) : (
            <Link href="/auth">
              <Button>Login to Participate</Button>
            </Link>
          )}
        </div>

        <div className="grid md:grid-cols-12 gap-6">
          <div className={`${selectedDiscussion ? 'md:col-span-5' : 'md:col-span-12'} grid gap-4`}>
            {discussions.map((discussion) => (
              <Card 
                key={discussion.id} 
                className={`cursor-pointer transition-colors hover:bg-accent ${selectedDiscussion === discussion.id ? 'border-primary' : ''}`}
                onClick={() => setSelectedDiscussion(discussion.id)}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold hover:text-primary">
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

          {selectedDiscussion && selectedThread && (
            <div className="md:col-span-7">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>{selectedThread.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {selectedThread.messages.map((message) => (
                      <div key={message.id} className="p-4 rounded-lg bg-muted/50">
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{message.author}</span>
                          <span className="text-sm text-muted-foreground">{message.time}</span>
                        </div>
                        <p className="text-muted-foreground">{message.content}</p>
                      </div>
                    ))}
                  </div>

                  {user ? (
                    <div className="flex gap-2 mt-4">
                      <Input
                        placeholder="Write your reply..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                      />
                      <Button onClick={handleSendMessage}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="p-4 text-center">
                        <p className="text-muted-foreground mb-2">Login to join the discussion</p>
                        <Link href="/auth">
                          <Button variant="outline">Login</Button>
                        </Link>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
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