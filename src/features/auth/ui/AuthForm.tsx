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
      <DialogTrigger>
        <Button variant="outline">{isLogin ? 'Log in' : 'Sign Up'}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogDescription>
            <p className="mb-4 text-center text-sm text-gray-500 italic">
              {isLogin
                ? 'Sign in to save your collection'
                : 'Create an account to save your collection'}
            </p>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <DialogFooter className="flex flex-col">
            <Button
              type="submit"
              className="w-full bg-black py-3 font-medium text-white transition-all hover:bg-gray-800"
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
            </Button>
            <Button
              onClick={() => setIsLogin(!isLogin)}
              className="w-full text-sm text-gray-400 transition-colors hover:text-black"
            >
              {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
