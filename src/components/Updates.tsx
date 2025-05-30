import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";

export interface Update {
  date: Date;
  content: string;
}

interface UpdatesProps {
  updates: Update[];
  maxDisplayed?: number;
}

export default function Updates({ updates, maxDisplayed = 3 }: UpdatesProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const sortedUpdates = [...updates].sort((a, b) => b.date.getTime() - a.date.getTime());
  const displayedUpdates = sortedUpdates.slice(0, maxDisplayed);
  const historicalUpdates = sortedUpdates.slice(maxDisplayed);

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">Recent Updates</h2>
      
      <div className="space-y-4 mb-6">
        {displayedUpdates.map((update, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="text-sm text-primary mb-2">
                {format(update.date, "MMMM d, yyyy")}
              </div>
              <div 
                className="prose prose-sm text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: update.content }}
              />
            </CardContent>
          </Card>
        ))}
      </div>
      
      {historicalUpdates.length > 0 && (
        <div className="text-center">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" className="text-primary">
                View Update History
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Update History</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                {historicalUpdates.map((update, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="text-sm text-primary mb-2">
                        {format(update.date, "MMMM d, yyyy")}
                      </div>
                      <div 
                        className="prose prose-sm text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: update.content }}
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
} 