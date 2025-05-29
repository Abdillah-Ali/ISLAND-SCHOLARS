import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaExclamationCircle } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the intended destination from location state, or default to dashboard
  const from = location.state?.from?.pathname || '/';
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    // Clear any previous errors
    setError('');
    setLoading(true);
    
    try {
      const user = await login(email, password);
      
      // Redirect based on user role
      switch (user.role) {
        case 'student':
          navigate('/student/dashboard');
          break;
        case 'organization':
          navigate('/organization/dashboard');
          break;
        case 'university':
          navigate('/university/dashboard');
          break;
        default:
          navigate(from);
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  
  // Prefill form for demo purposes
  const fillDemoCredentials = (role) => {
    switch (role) {
      case 'student':
        setEmail('student@example.com');
        setPassword('password123');
        break;
      case 'organization':
        setEmail('organization@example.com');
        setPassword('password123');
        break;
      case 'university':
        setEmail('university@example.com');
        setPassword('password123');
        break;
      default:
        break;
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-600">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Sign in to your Island Scholars account</p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-center">
            <FaExclamationCircle className="mr-2" />
            <span>{error}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="label">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input pl-10"
                placeholder="you@example.com"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className="label">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input pl-10"
                placeholder="••••••••"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                type="checkbox"
                className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            
            <div className="text-sm">
              <a href="#" className="text-primary-600 hover:text-primary-500">
                Forgot password?
              </a>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`btn-primary w-full py-3 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <div className="mt-8">
          <p className="text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-600 hover:text-primary-500">
              Sign up
            </Link>
          </p>
        </div>
        
        {/* Demo account options */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-center text-sm text-gray-600 mb-4">For demo purposes, try these accounts:</p>
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => fillDemoCredentials('student')}
              className="text-xs px-2 py-1 border border-primary-200 text-primary-700 bg-primary-50 rounded hover:bg-primary-100"
            >
              Student Demo
            </button>
            <button
              onClick={() => fillDemoCredentials('organization')}
              className="text-xs px-2 py-1 border border-secondary-200 text-secondary-700 bg-secondary-50 rounded hover:bg-secondary-100"
            >
              Organization Demo
            </button>
            <button
              onClick={() => fillDemoCredentials('university')}
              className="text-xs px-2 py-1 border border-accent-200 text-accent-700 bg-accent-50 rounded hover:bg-accent-100"
            >
              University Demo
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;