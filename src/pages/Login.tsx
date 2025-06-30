import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { signIn, getAllEmailPasswordPairs } from '@/services/supabaseService';
import { useStudent } from '@/contexts/StudentContext';

interface LoginProps {
  onLogin: () => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setStudentData } = useStudent();

  // For demo accounts
  const [demoAccounts, setDemoAccounts] = useState<{ email: string; password: string }[]>([]);
  const [demoLoading, setDemoLoading] = useState(true);
  const [demoError, setDemoError] = useState('');

  useEffect(() => {
    const fetchDemoAccounts = async () => {
      setDemoLoading(true);
      setDemoError('');
      try {
        const data = await getAllEmailPasswordPairs();
        setDemoAccounts(data.filter((d: any) => d.email && d.password));
      } catch (err) {
        setDemoError('Could not load demo accounts.');
      } finally {
        setDemoLoading(false);
      }
    };
    fetchDemoAccounts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await signIn(email, password);
      if (user) {
        setStudentData(user);
        onLogin();
      }
    } catch (err: any) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-md"></div>
            </div>
          </div>
          <h1 className="text-4xl font-light text-slate-800 mb-2 tracking-tight">
            profeshare
          </h1>
          <p className="text-slate-600">
            Sign in to your account
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="h-12"
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="h-12"
                disabled={loading}
              />
            </div>
            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 mt-6"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          {/* Demo Accounts Section */}
          <div className="mt-8">
            <h3 className="text-slate-700 font-semibold mb-2 text-center">All Demo Accounts</h3>
            <div className="bg-slate-100 rounded-lg p-4 text-xs text-slate-700 max-h-48 overflow-y-auto">
              {demoLoading && <div>Loading accounts...</div>}
              {demoError && <div className="text-red-600">{demoError}</div>}
              {!demoLoading && !demoError && demoAccounts.length === 0 && (
                <div>No demo accounts found.</div>
              )}
              {!demoLoading && !demoError && demoAccounts.map((acc, idx) => (
                <div key={idx} className="mb-2">
                  <b>Email:</b> {acc.email}<br /><b>Password:</b> {acc.password}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
