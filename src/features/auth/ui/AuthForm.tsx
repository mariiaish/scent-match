import { useState } from 'react';
import { useAuthStore } from '../model/authSlice';
import { Button } from '@/shared/ui/elements/button';

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
    <div className="mx-auto mt-10 max-w-sm rounded-3xl border border-gray-100 bg-white p-6 shadow-xl">
      <h2 className="mb-6 text-center font-serif text-2xl">
        {isLogin ? 'Welcome Back' : 'Create Account'}
      </h2>
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
        <Button
          type="submit"
          className="w-full rounded-xl bg-black py-3 font-medium text-white transition-all hover:bg-gray-800"
        >
          {isLogin ? 'Sign In' : 'Join ScentMatch'}
        </Button>
      </form>
      <Button
        onClick={() => setIsLogin(!isLogin)}
        className="mt-4 w-full text-sm text-gray-400 transition-colors hover:text-black"
      >
        {isLogin ? "Don't have an account? Sign Up" : 'Already a member? Log In'}
      </Button>
    </div>
  );
};
