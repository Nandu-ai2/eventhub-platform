import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";
import { isUnauthorizedError } from "@/lib/authUtils";
import { X, Check, Clock, MapPin, Calendar } from "lucide-react";
import type { Event, Rsvp, RsvpStatus } from "@shared/schema";

interface RsvpModalProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
  currentRsvp?: Rsvp | null;
}

export default function RsvpModal({ event, isOpen, onClose, currentRsvp }: RsvpModalProps) {
  const [selectedStatus, setSelectedStatus] = useState<RsvpStatus>(currentRsvp?.status || "yes");
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const rsvpMutation = useMutation({
    mutationFn: async (status: RsvpStatus) => {
      const response = await apiRequest("POST", "/api/rsvp", {
        eventId: event.id,
        status,
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "RSVP Updated!",
        description: `Your response has been saved for ${event.title}.`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/rsvp", user?.id || "", event?.id] });
      queryClient.invalidateQueries({ queryKey: ["/api/events", event?.id, "rsvps"] });
      queryClient.invalidateQueries({ queryKey: ["/api/users", user?.id || "", "rsvps"] });
      onClose();
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Failed to RSVP",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = () => {
    rsvpMutation.mutate(selectedStatus);
  };

  const getStatusButtonClass = (status: RsvpStatus) => {
    const baseClass = "px-4 py-3 rounded-lg font-semibold text-center transition-colors border-2";
    
    if (selectedStatus === status) {
      switch (status) {
        case "yes":
          return `${baseClass} border-secondary bg-secondary text-white`;
        case "maybe":
          return `${baseClass} border-accent bg-accent text-white`;
        case "no":
          return `${baseClass} border-red-500 bg-red-500 text-white`;
      }
    }
    
    return `${baseClass} border-slate-300 text-slate-600 hover:border-slate-400`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle data-testid="text-modal-title">RSVP to Event</DialogTitle>
          <DialogDescription>
            RSVP to this event and let us know if you'll be attending.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Event Details */}
          <div>
            <h4 className="text-lg font-semibold text-slate-800 mb-2" data-testid="text-event-title">
              {event.title}
            </h4>
            <div className="flex items-center text-slate-600 mb-2">
              <Calendar className="h-4 w-4 mr-2" />
              <span data-testid="text-event-date">
                {new Date(event.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className="flex items-center text-slate-600">
              <MapPin className="h-4 w-4 mr-2" />
              <span data-testid="text-event-location">{event.city}</span>
            </div>
          </div>

          {/* RSVP Options */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Your Response
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setSelectedStatus("yes")}
                className={getStatusButtonClass("yes")}
                data-testid="button-rsvp-yes"
              >
                <Check className="h-5 w-5 mb-1 mx-auto" />
                Yes
              </button>
              <button
                onClick={() => setSelectedStatus("maybe")}
                className={getStatusButtonClass("maybe")}
                data-testid="button-rsvp-maybe"
              >
                <Clock className="h-5 w-5 mb-1 mx-auto" />
                Maybe
              </button>
              <button
                onClick={() => setSelectedStatus("no")}
                className={getStatusButtonClass("no")}
                data-testid="button-rsvp-no"
              >
                <X className="h-5 w-5 mb-1 mx-auto" />
                No
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleSubmit}
              disabled={rsvpMutation.isPending}
              className="flex-1"
              data-testid="button-submit-rsvp"
            >
              {rsvpMutation.isPending ? "Saving..." : "Submit RSVP"}
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              data-testid="button-cancel-rsvp"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
