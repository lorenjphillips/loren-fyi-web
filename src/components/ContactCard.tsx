import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ContactCardProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactCard({ isOpen, onClose }: ContactCardProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Contact Information</DialogTitle>
          <DialogDescription>
            Get in touch with me through email.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
            <a href="mailto:lorenphillips@protonmail.com" className="text-foreground hover:text-accent-foreground transition-colors">
              lorenphillips@protonmail.com
            </a>
          </div>

          <p className="text-sm text-muted-foreground mt-4">
            Do not hesitate to email me!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
} 