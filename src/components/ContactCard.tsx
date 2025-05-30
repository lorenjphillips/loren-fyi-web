import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContactCardProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactCard({ isOpen, onClose }: ContactCardProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background p-6 rounded-lg shadow-lg max-w-md w-full mx-4 relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        
        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
            <a href="mailto:lorenphillips@protonmail.com" className="text-foreground hover:text-accent-foreground transition-colors">
              lorenphillips@protonmail.com
            </a>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
            <a href="tel:+17192901597" className="text-foreground hover:text-accent-foreground transition-colors">
              (719) 290-1597
            </a>
          </div>
          
          <p className="text-sm text-muted-foreground mt-4">
            Do not hesitate to email me or text directly!
          </p>
        </div>
      </div>
    </div>
  );
} 