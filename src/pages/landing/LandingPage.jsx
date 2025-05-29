import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBuilding, FaUniversity, FaSearch, FaFileAlt, FaHandshake } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

const LandingPage = () => {
  const { isAuthenticated, currentUser } = useAuth();

  // Determine the proper dashboard link based on user role
  const getDashboardLink = () => {
    if (!isAuthenticated) return '/register';
    
    switch (currentUser.role) {
      case 'student':
        return '/student/dashboard';
      case 'organization':
        return '/organization/dashboard';
      case 'university':
        return '/university/dashboard';
      default:
        return '/register';
    }
  };

  const dashboardLink = getDashboardLink();
  
  return (
    <div className="space-y-20">
      {/* Hero section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-primary-500 opacity-5 -z-10" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-200 rounded-full blur-3xl opacity-20 -z-10" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent-200 rounded-full blur-3xl opacity-20 -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 max-w-2xl">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary-600 leading-tight"
              >
                Connecting <span className="text-accent-500">Scholars</span> with <span className="text-secondary-500">Opportunities</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-6 text-xl text-gray-600 max-w-2xl"
              >
                Island Scholars is where students, organizations, and universities come together to explore internship opportunities and build meaningful connections.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-10 flex flex-wrap gap-4"
              >
                <Link to={dashboardLink} className="btn-primary px-8 py-3 text-lg">
                  {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
                </Link>
                <Link to="#how-it-works" className="btn-outline px-8 py-3 text-lg">
                  Learn More
                </Link>
              </motion.div>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex-1 max-w-md"
            >
              <img 
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260" 
                alt="Students collaborating" 
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* For who section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-600">Who Island Scholars Is For</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform serves three key groups, creating a vibrant ecosystem for internship opportunities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* For Students */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="card flex flex-col items-center text-center p-8 hover:border-primary-500 hover:border"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                <FaGraduationCap className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">For Students</h3>
              <p className="text-gray-600">
                Discover internship opportunities, build your professional profile, and connect with leading organizations in your field.
              </p>
              <ul className="mt-6 text-left space-y-2">
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">✓</span>
                  <span>Create a professional profile</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">✓</span>
                  <span>Apply for internships</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">✓</span>
                  <span>Track application status</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">✓</span>
                  <span>Get personalized recommendations</span>
                </li>
              </ul>
              <Link to="/register" className="mt-8 btn-outline">Sign Up as Student</Link>
            </motion.div>
            
            {/* For Organizations */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="card flex flex-col items-center text-center p-8 hover:border-secondary-500 hover:border"
            >
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mb-6">
                <FaBuilding className="w-8 h-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">For Organizations</h3>
              <p className="text-gray-600">
                Find talented students for internships, collaborate with universities, and build your talent pipeline.
              </p>
              <ul className="mt-6 text-left space-y-2">
                <li className="flex items-start">
                  <span className="text-secondary-500 mr-2">✓</span>
                  <span>Create organization profile</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary-500 mr-2">✓</span>
                  <span>Post internship opportunities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary-500 mr-2">✓</span>
                  <span>Manage student applications</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary-500 mr-2">✓</span>
                  <span>Connect with universities</span>
                </li>
              </ul>
              <Link to="/register" className="mt-8 btn-outline">Join as Organization</Link>
            </motion.div>
            
            {/* For Universities */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="card flex flex-col items-center text-center p-8 hover:border-accent-500 hover:border"
            >
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mb-6">
                <FaUniversity className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">For Universities</h3>
              <p className="text-gray-600">
                Connect your students with quality internships and build relationships with industry partners.
              </p>
              <ul className="mt-6 text-left space-y-2">
                <li className="flex items-start">
                  <span className="text-accent-500 mr-2">✓</span>
                  <span>Create university profile</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-500 mr-2">✓</span>
                  <span>Partner with organizations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-500 mr-2">✓</span>
                  <span>Track student participation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-500 mr-2">✓</span>
                  <span>Facilitate industry collaborations</span>
                </li>
              </ul>
              <Link to="/register" className="mt-8 btn-outline">Join as University</Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* How it works section */}
      <section id="how-it-works" className="bg-neutral-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-600">How It Works</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Island Scholars makes it easy to explore opportunities, connect with the right people, and launch your career.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                  <FaSearch className="w-8 h-8 text-primary-600" />
                </div>
                <div className="absolute top-8 left-full w-full h-0.5 bg-primary-200 hidden md:block"></div>
              </div>
              <h3 className="text-xl font-semibold mb-4">Explore</h3>
              <p className="text-gray-600">
                Browse available internships, organizations, and universities. Discover opportunities aligned with your career goals.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                  <FaFileAlt className="w-8 h-8 text-primary-600" />
                </div>
                <div className="absolute top-8 left-full w-full h-0.5 bg-primary-200 hidden md:block"></div>
              </div>
              <h3 className="text-xl font-semibold mb-4">Apply</h3>
              <p className="text-gray-600">
                Submit your application with all required documents. Organizations can review and reach out to candidates directly.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                <FaHandshake className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Connect</h3>
              <p className="text-gray-600">
                Build relationships with organizations and universities. Receive official documentation and manage your internship journey.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">Ready to get started?</h2>
              <p className="mt-4 text-xl text-white text-opacity-90 max-w-2xl">
                Join Island Scholars today and take the first step toward your next great opportunity.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link to="/register" className="btn-accent px-8 py-3 text-lg">
                Sign Up Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;