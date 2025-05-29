import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaFile, FaCheckCircle, FaClock } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { mockInternships, mockApplications } from '../../data/mockData';
import StatCard from '../../components/dashboard/StatCard';

const StudentDashboard = () => {
  const { currentUser } = useAuth();
  const [applications, setApplications] = useState([]);
  const [recommendedInternships, setRecommendedInternships] = useState([]);
  
  useEffect(() => {
    // Filter applications for the current student
    const studentApplications = mockApplications.filter(app => app.studentId === currentUser.id);
    setApplications(studentApplications);
    
    // Generate recommended internships based on student skills
    // In a real app, this would be a more sophisticated algorithm
    if (currentUser.skills && currentUser.skills.length > 0) {
      const recommended = mockInternships
        .filter(internship => {
          // Check if any student skills match the internship skills
          return internship.skills.some(skill => 
            currentUser.skills.includes(skill)
          );
        })
        .slice(0, 3); // Limit to 3 recommendations
      
      setRecommendedInternships(recommended);
    }
  }, [currentUser]);
  
  // Count applications by status
  const pendingCount = applications.filter(app => app.status === 'pending').length;
  const acceptedCount = applications.filter(app => app.status === 'accepted').length;
  const totalApplications = applications.length;
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Student Dashboard</h1>
          <p className="text-gray-600">Welcome back, {currentUser.name}</p>
        </div>
        <div className="flex space-x-3">
          <Link to="/student/internships" className="btn-primary">
            Find Internships
          </Link>
          <Link to="/student/profile" className="btn-outline">
            View Profile
          </Link>
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Applied Internships" 
          value={totalApplications} 
          icon={<FaFile className="h-6 w-6" />}
          color="primary"
        />
        <StatCard 
          title="Pending Applications" 
          value={pendingCount} 
          icon={<FaClock className="h-6 w-6" />}
          color="warning"
        />
        <StatCard 
          title="Accepted Applications" 
          value={acceptedCount} 
          icon={<FaCheckCircle className="h-6 w-6" />}
          color="success"
        />
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Applications */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Recent Applications</h2>
              <Link to="#" className="text-sm text-primary-600 hover:text-primary-700">
                View all
              </Link>
            </div>
            
            {applications.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {applications.map(application => {
                  const internship = mockInternships.find(i => i.id === application.internshipId);
                  
                  return (
                    <div key={application.id} className="py-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-800">
                            {internship?.title || 'Unknown Internship'}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Applied on {new Date(application.appliedDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            application.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : application.status === 'accepted'
                              ? 'bg-green-100 text-green-800'
                              : application.status === 'rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 flex justify-between items-center">
                        <p className="text-sm text-gray-500 truncate max-w-xs">
                          {internship?.description?.substring(0, 100)}...
                        </p>
                        <Link 
                          to={`/student/internships/${internship?.id}`} 
                          className="text-sm text-primary-600 hover:text-primary-700"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <FaFile className="mx-auto h-12 w-12 text-gray-300" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No applications yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by applying to internships
                </p>
                <div className="mt-6">
                  <Link to="/student/internships" className="btn-primary">
                    Find Internships
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Recommended Internships */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Recommended For You</h2>
            
            {recommendedInternships.length > 0 ? (
              <div className="space-y-4">
                {recommendedInternships.map(internship => (
                  <motion.div 
                    key={internship.id}
                    whileHover={{ x: 5 }}
                    className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50"
                  >
                    <h3 className="font-medium text-gray-800">{internship.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{internship.description.substring(0, 80)}...</p>
                    <div className="mt-2 flex justify-between items-center">
                      <div className="flex flex-wrap gap-1">
                        {internship.skills.slice(0, 2).map(skill => (
                          <span key={skill} className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-0.5 rounded">
                            {skill}
                          </span>
                        ))}
                        {internship.skills.length > 2 && (
                          <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded">
                            +{internship.skills.length - 2}
                          </span>
                        )}
                      </div>
                      <Link 
                        to={`/student/internships/${internship.id}`}
                        className="text-xs text-primary-600 hover:text-primary-700"
                      >
                        View
                      </Link>
                    </div>
                  </motion.div>
                ))}
                
                <div className="mt-4 text-center">
                  <Link to="/student/internships" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    View all opportunities
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <FaGraduationCap className="mx-auto h-12 w-12 text-gray-300" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No recommendations yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Complete your profile to get personalized recommendations
                </p>
                <div className="mt-6">
                  <Link to="/student/profile/edit" className="btn-outline">
                    Update Profile
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;