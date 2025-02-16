import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <SignUp
      afterSignUpUrl="/dashboard" // Redirect after successful registration
    />
  );
}
