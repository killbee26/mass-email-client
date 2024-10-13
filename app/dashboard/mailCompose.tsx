import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface MailComposeProps {
  senderAddress: string;
  defaultSubject: string;
  defaultBody: string;
  onSend: (sender: string, subject: string, body: string) => void;
}

export const MailCompose = ({
  senderAddress,
  defaultSubject,
  defaultBody,
  onSend,
}: MailComposeProps) => {
  const [sender, setSender] = useState(senderAddress);
  const [subject, setSubject] = useState(defaultSubject);
  const [body, setBody] = useState(defaultBody);
  const [isLocked, setIsLocked] = useState(false); // Track if fields are locked

  const handleSend = () => {
    // Call the onSend callback with the current email details
    onSend(sender, subject, body);
    // Lock the fields after sending
    setIsLocked(true);
  };

  const handleUnlockFields = () => {
    setIsLocked(false); // Unlock the fields when clicking "Unlock Fields"
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Compose Email</CardTitle>
        <CardDescription>Fill out the email details below.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sender Email
          </label>
          <Input
            type="email"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            disabled={isLocked} // Disable input when locked
            placeholder="Enter your email address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Subject
          </label>
          <Input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            disabled={isLocked} // Disable input when locked
            placeholder="Enter the email subject"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Body
          </label>
          <Textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            disabled={isLocked} // Disable textarea when locked
            placeholder="Enter the email body"
            rows={5}
          />
        </div>

        <div className="flex justify-end space-x-2">
          {isLocked ? (
            // Show "Unlock Fields" button when fields are locked
            <Button variant="outline" className="bg-primary text-primary-foreground" onClick={handleUnlockFields}>
              Unlock Fields
            </Button>
          ) : (
            // Show "Send" button when fields are not locked
            <Button variant="outline" onClick={handleSend}>
              Confirm
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
