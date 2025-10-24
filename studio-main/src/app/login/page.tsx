import LoginForm from '@/components/auth/login-form';
import Logo from '@/components/logo';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl">
          <CardHeader className="flex flex-col items-center justify-center gap-4 text-center">
            <Logo className="text-2xl" />
            <div className="flex flex-col">
              <h1 className="font-headline text-3xl font-bold">Welcome Back</h1>
              <p className="text-muted-foreground">
                Sign in to access your dashboard.
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
