import { Link } from 'react-router-dom';
import { FaTwitter, FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-600 text-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="animate-wave absolute inset-0 w-[200%] h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSIxMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTAgMTIwVjBDMjQwIDUwIDQ4MCAxMDAgNzIwIDEwMEM5NjAgMTAwIDEyMDAgNTAgMTQ0MCAwVjEyMEgwWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+')]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and description */}
            <div className="md:col-span-1">
              <Link to="/" className="text-2xl font-bold">Island Scholars</Link>
              <p className="mt-2 text-sm text-white text-opacity-80">
                Connecting students, organizations, and universities for transformative internship experiences.
              </p>
              
              {/* Social links */}
              <div className="mt-4 flex space-x-4">
                <a href="#" className="text-white hover:text-accent-300 transition-colors">
                  <FaTwitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-white hover:text-accent-300 transition-colors">
                  <FaFacebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-white hover:text-accent-300 transition-colors">
                  <FaLinkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-white hover:text-accent-300 transition-colors">
                  <FaInstagram className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            {/* Navigation links */}
            <div>
              <h3 className="text-lg font-semibold mb-3">For Students</h3>
              <ul className="space-y-2">
                <li><Link to="/student/internships" className="text-white text-opacity-80 hover:text-white">Find Internships</Link></li>
                <li><Link to="/universities" className="text-white text-opacity-80 hover:text-white">Explore Universities</Link></li>
                <li><Link to="/register" className="text-white text-opacity-80 hover:text-white">Create an Account</Link></li>
                <li><a href="#" className="text-white text-opacity-80 hover:text-white">Resources</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">For Organizations</h3>
              <ul className="space-y-2">
                <li><Link to="/register" className="text-white text-opacity-80 hover:text-white">Join the Platform</Link></li>
                <li><a href="#" className="text-white text-opacity-80 hover:text-white">Post Opportunities</a></li>
                <li><Link to="/universities" className="text-white text-opacity-80 hover:text-white">Partner with Universities</Link></li>
                <li><a href="#" className="text-white text-opacity-80 hover:text-white">Success Stories</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-white text-opacity-80 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-white text-opacity-80 hover:text-white">Contact</a></li>
                <li><a href="#" className="text-white text-opacity-80 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-white text-opacity-80 hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white border-opacity-20 text-center text-sm text-white text-opacity-70">
            <p>&copy; {currentYear} Island Scholars. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;