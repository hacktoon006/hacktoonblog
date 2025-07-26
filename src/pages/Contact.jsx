import { Input } from "./../components/ui/input"
import { Textarea } from "./../components/ui/textarea"
import { Button } from "./../components/ui/button"
import { Label } from "./../components/ui/label"

export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl text-blue-600 font-bold mb-6 text-center">Contact Us</h1>

      <form className="space-y-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Your full name"
            required
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="Type your message here..."
            rows={5}
            required
          />
        </div>

        <Button type="submit" className="w-full">Send Message</Button>
      </form>
    </div>
  )
}
