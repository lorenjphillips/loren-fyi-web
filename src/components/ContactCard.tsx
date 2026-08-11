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

// Kept in pieces so the full address never appears as a contiguous string in
// the source, the bundle, or the served HTML. It is only assembled at click time.
const EMAIL_LOCAL = "lorenphillips";
const EMAIL_DOMAIN = "protonmail.com";

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
            <button
              type="button"
              onClick={() => {
                window.location.href = `mailto:${EMAIL_LOCAL}@${EMAIL_DOMAIN}`;
              }}
              className="text-foreground hover:text-accent-foreground transition-colors"
            >
              <span>{EMAIL_LOCAL}</span>
              <span aria-hidden="true">&#64;</span>
              <span>{EMAIL_DOMAIN}</span>
            </button>
          </div>

          <p className="text-sm text-muted-foreground mt-4">
            Do not hesitate to email me!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
} 