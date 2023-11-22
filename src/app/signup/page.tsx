import SignupForm from "pages/signup/form";

export default function SignupPage() {
  return (
    <div className="flex flex-col max-w-md mx-auto my-12">
      <h1 className="font-sans font-bold text-5xl mb-6">Sign up</h1>
      <SignupForm />
    </div>
  );
}
