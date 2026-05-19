import { useState } from 'react';
import { useAuthStore } from '../model/authSlice';
import { Button } from '@/shared/ui/elements/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/shared/ui/elements/dialog';

export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, signUp } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) throw error;
      } else {
        const { error } = await signUp(email, password);
        if (error) throw error;
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <Dialog>
      <form onSubmit={handleSubmit} className="space-y-4">
        <DialogTrigger>
          <Button variant="outline">Log in</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogDescription>
              <p className="mb-4 text-center text-sm text-gray-500 italic">
                Sign in to save your collection
              </p>
            </DialogDescription>
          </DialogHeader>
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl bg-gray-50 p-3 ring-amber-200 transition-all outline-none focus:ring-1"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl bg-gray-50 p-3 ring-amber-200 transition-all outline-none focus:ring-1"
            />
          </>
          <DialogFooter className="flex flex-col">
            <Button
              type="submit"
              className="w-full bg-black py-3 font-medium text-white transition-all hover:bg-gray-800"
            >
              Sign In
            </Button>
            <Button
              onClick={() => setIsLogin(!isLogin)}
              className="w-full text-sm text-gray-400 transition-colors hover:text-black"
            >
              Don't have an account? Sign Up
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
