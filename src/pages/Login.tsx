import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Lock, Mail, ArrowLeft, Loader2 } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const { error } = await signIn(email, password);
    
    if (error) {
      setError('Invalid email or password. Please try again.');
      setIsLoading(false);
    } else {
      navigate(from, { replace: true });
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4"
      style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)' }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(45, 106, 79, 0.5) 0%, transparent 70%)' }}
        />
        <div 
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(99, 102, 241, 0.5) 0%, transparent 70%)' }}
        />
      </div>

      {/* Back to home link */}
      <Link 
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-white/60 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="text-sm">Back to site</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 
            className="text-3xl font-display font-bold mb-2"
            style={{ 
              background: 'linear-gradient(135deg, #4ADE80 0%, #22D3EE 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Veronika
          </h1>
          <p className="text-white/60">Sign in to your dashboard</p>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-8 rounded-2xl"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/80 text-sm font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 h-12 rounded-xl border-0 text-white placeholder:text-white/30 bg-white/5 focus:bg-white/10 focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/80 text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 pr-10 h-12 rounded-xl border-0 text-white placeholder:text-white/30 bg-white/5 focus:bg-white/10 focus:ring-2 focus:ring-emerald-500/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm text-center p-3 rounded-lg bg-red-500/10"
              >
                {error}
              </motion.p>
            )}

            {/* Submit Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-xl font-semibold text-white border-0"
                style={{
                  background: 'linear-gradient(135deg, #2D6A4F 0%, #40916C 100%)',
                  boxShadow: '0 4px 15px rgba(45, 106, 79, 0.3)'
                }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </motion.div>
          </form>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-white/40 text-sm mt-6"
        >
          Internal access only • Contact admin for credentials
        </motion.p>
      </motion.div>
    </div>
  );
}
