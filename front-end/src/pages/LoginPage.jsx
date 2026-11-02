import { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';
import { isValidEmail } from '../utils/validation';

/**
 * LoginPage Route Container (Placeholder Foundation)
 */
export function LoginPage() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError('Please provide a valid email address.');
      return;
    }
    setError(null);
    await login({ email, password });
  };

  return (
    <div style={{ maxWidth: '440px', margin: '2rem auto' }}>
      <div className="placeholder-card">
        <span className="placeholder-badge">AUTH MODULE</span>
        <h2 className="page-title" style={{ fontSize: '1.5rem' }}>Sign In to Atelier</h2>
        <p className="page-subtitle" style={{ marginBottom: '1.5rem' }}>
          Access your orders, saved sizes, and addresses.
        </p>

        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          <Input
            label="Email Address"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            error={error}
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            style={{ width: '100%', marginTop: '0.5rem' }}
          >
            Sign In
          </Button>
        </form>

        <p style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
          Don&apos;t have an account?{' '}
          <Link to="/register" style={{ color: 'var(--color-accent)', fontWeight: 600 }}>
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;

