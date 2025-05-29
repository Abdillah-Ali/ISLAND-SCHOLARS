import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaUser, FaBuilding, FaUniversity, FaExclamationCircle } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student', // Default role
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    // Clear any previous errors
    setError('');
    setLoading(true);
    
    try {
      const user = await register(formData);
      
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
          navigate('/');
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  
  // Get role icon based on selected role
  const getRoleIcon = (role) => {
    switch (role) {
      case 'student':
        return <FaUser className="h-5 w-5" />;
      case 'organization':
        return <FaBuilding className="h-5 w-5" />;
      case 'university':
        return <FaUniversity className="h-5 w-5" />;
      default:
        return <FaUser className="h-5 w-5" />;
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
          <h1 className="text-3xl font-bold text-primary-600">Create an Account</h1>
          <p className="text-gray-600 mt-2">Join Island Scholars today</p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-center">
            <FaExclamationCircle className="mr-2" />
            <span>{error}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role selection */}
          <div>
            <label className="label">I am a...</label>
            <div className="grid grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, role: 'student' }))}
                className={`flex flex-col items-center justify-center p-4 rounded-md border ${
                  formData.role === 'student' 
                    ? 'bg-primary-50 border-primary-500 text-primary-700' 
                    : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                }`}
              >
                <FaUser className="h-6 w-6 mb-2" />
                <span>Student</span>
              </button>
              
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, role: 'organization' }))}
                className={`flex flex-col items-center justify-center p-4 rounded-md border ${
                  formData.role === 'organization' 
                    ? 'bg-secondary-50 border-secondary-500 text-secondary-700' 
                    : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                }`}
              >
                <FaBuilding className="h-6 w-6 mb-2" />
                <span>Organization</span>
              </button>
              
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, role: 'university' }))}
                className={`flex flex-col items-center justify-center p-4 rounded-md border ${
                  formData.role === 'university' 
                    ? 'bg-accent-50 border-accent-500 text-accent-700' 
                    : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                }`}
              >
                <FaUniversity className="h-6 w-6 mb-2" />
                <span>University</span>
              </button>
            </div>
          </div>
          
          {/* Name field */}
          <div>
            <label htmlFor="name" className="label">
              {formData.role === 'student' ? 'Full Name' : 
               formData.role === 'organization' ? 'Organization Name' : 'University Name'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {getRoleIcon(formData.role)}
              </div>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="input pl-10"
                placeholder={
                  formData.role === 'student' ? 'John Smith' : 
                  formData.role === 'organization' ? 'Acme Corporation' : 'State University'
                }
              />
            </div>
          </div>
          
          {/* Email field */}
          <div>
            <label htmlFor="email" className="label">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="input pl-10"
                placeholder="you@example.com"
              />
            </div>
          </div>
          
          {/* Password field */}
          <div>
            <label htmlFor="password" className="label">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="input pl-10"
                placeholder="••••••••"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">Must be at least 6 characters</p>
          </div>
          
          {/* Confirm Password field */}
          <div>
            <label htmlFor="confirmPassword" className="label">Confirm Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input pl-10"
                placeholder="••••••••"
              />
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              id="terms"
              type="checkbox"
              className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              I agree to the <a href="#" className="text-primary-600 hover:text-primary-500">Terms of Service</a> and <a href="#" className="text-primary-600 hover:text-primary-500">Privacy Policy</a>
            </label>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`btn-primary w-full py-3 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        
        <div className="mt-8">
          <p className="text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 hover:text-primary-500">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;