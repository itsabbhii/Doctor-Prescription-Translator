import SignupForm from '@/components/auth/signup-form';
import Logo from '@/components/logo';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function SignupPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl">
          <CardHeader className="flex flex-col items-center justify-center gap-4 text-center">
            <Logo className="text-2xl" />
            <div className="flex flex-col">
              <h1 className="font-headline text-3xl font-bold">Create an Account</h1>
              <p className="text-muted-foreground">
                Join SPAM to understand your prescriptions better.
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <SignupForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
