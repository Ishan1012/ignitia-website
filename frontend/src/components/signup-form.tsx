import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <h2
          className="mx-auto mt-5 mb-3 max-w-lg text-center text-md font-semibold tracking-tight text-balance text-yellow-50 sm:text-4xl underline underline-offset-8 decoration-yellow-200/50"
          style={{
            textShadow: "0 0 30px rgba(253,224,71,0.6), 0 0 60px rgba(253,224,71,0.4)"
          }}
        >
          Register for Ignitia 2K26
        </h2>
        <Field>
          <FieldLabel htmlFor="name" className="text-yellow-100">Full Name</FieldLabel>
          <Input id="name" type="text" placeholder="John Doe" className="rounded-[10px]" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="email" className="text-yellow-100">Email</FieldLabel>
          <Input id="email" type="email" className="rounded-[10px]" placeholder="m@example.com" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="phone" className="text-yellow-100">Phone Number</FieldLabel>
          <Input id="phone" type="text" placeholder="+91 98765 43210" className="rounded-[10px]" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="rollno" className="text-yellow-100">Roll Number</FieldLabel>
          <Input id="rollno" type="text" placeholder="Enter your roll number" className="rounded-[10px]" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="course" className="text-yellow-100">Course/Year</FieldLabel>
          <Input id="course" type="text" placeholder="e.g., B.Tech CSE 2nd Year" className="rounded-[10px]" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="password" className="text-yellow-100">Password</FieldLabel>
          <Input id="password" type="password" placeholder="*******" className="rounded-[10px]" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password" className="text-yellow-100">Confirm Password</FieldLabel>
          <Input id="confirm-password" type="password" placeholder="*******" className="rounded-[10px]" required />
        </Field>
        <Field>
          <Button type="submit" className="bg-yellow-500 rounded-[10px] hover:bg-yellow-600 cursor-pointer">Create Account</Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <Button variant="outline" type="button" className="rounded-[10px]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z" />
            </svg>
            Continue with Google
          </Button>
          <FieldDescription className="px-6 text-center">
            Already have an account? <Link href="/login">Sign in</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
