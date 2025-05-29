import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBuilding, FaUser, FaFileAlt, FaListAlt, FaUniversity, FaUsers } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { mockInternships, mockApplications, mockUniversities } from '../../data/mockData';
import StatCard from '../../components/dashboard/StatCard';

const OrganizationDashboard = () => {
  const { currentUser } = useAuth();
  const [orgInternships, setOrgInternships] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);
  const [suggestedUniversities, setSuggestedUniversities] = useState([]);
  
  useEffect(() => {
    // Filter internships for this organization
    const internships = mockInternships.filter(
      internship => internship.organizationId === currentUser.id
    );
    setOrgInternships(internships);
    
    // Get applications for this organization's internships
    const internshipIds = internships.map(internship => internship.id);
    const applications = mockApplications.filter(
      application => internshipIds.includes(application.internshipId)
    );
    // Sort by most recent and take top 5
    applications.sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate));
    setRecentApplications(applications.slice(0, 5));
    
    // Get suggested universities (simplified for demo)
    // In a real app, this would use more sophisticated matching
    setSuggestedUniversities(mockUniversities.slice(0, 3));
  }, [currentUser.id]);
  
  // Count stats
  const totalInternships = orgInternships.length;
  const activeInternships = orgInternships.filter(i => i.isActive).length;
  const totalApplications = recentApplications.length;
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Organization Dashboard</h1>
          <p className="text-gray-600">Welcome back, {currentUser.name}</p>
        </div>
        <div className="flex space-x-3">
          <Link to="#" className="btn-primary">
            Post New Internship
          </Link>
          <Link to="/organization/profile" className="btn-outline">
            View Profile
          </Link>
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Internships" 
          value={totalInternships} 
          icon={<FaListAlt className="h-6 w-6" />}
          color="primary"
        />
        <StatCard 
          title="Active Positions" 
          value={activeInternships} 
          icon={<FaFileAlt className="h-6 w-6" />}
          color="secondary"
        />
        <StatCard 
          title="Total Applications" 
          value={totalApplications} 
          icon={<FaUsers className="h-6 w-6" />}
          color="accent"
        />
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Internship listings */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Your Internships</h2>
              <Link to="#" className="text-sm text-primary-600 hover:text-primary-700">
                Manage All
              </Link>
            </div>
            
            {orgInternships.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {orgInternships.map(internship => (
                  <div key={internship.id} className="py-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-800">{internship.title}</h3>
                        <p className="text-sm text-gray-600">
                          Posted on {new Date(internship.postedDate).toLocaleDateString()} • 
                          {internship.applicationsCount} application(s)
                        </p>
                      </div>
                      <div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          internship.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {internship.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 truncate max-w-xl">
                        {internship.description.substring(0, 100)}...
                      </p>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {internship.skills.map(skill => (
                        <span key={skill} className="inline-block bg-secondary-100 text-secondary-800 text-xs px-2 py-0.5 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 flex justify-end space-x-2">
                      <Link to="#" className="text-sm text-primary-600 hover:text-primary-700">
                        View Applications
                      </Link>
                      <Link to="#" className="text-sm text-primary-600 hover:text-primary-700">
                        Edit
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FaBuilding className="mx-auto h-12 w-12 text-gray-300" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No internships yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Post your first internship opportunity
                </p>
                <div className="mt-6">
                  <Link to="#" className="btn-primary">
                    Post Internship
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          {/* Recent Applications */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Recent Applications</h2>
            
            {recentApplications.length > 0 ? (
              <div className="space-y-4">
                {recentApplications.map(application => {
                  const internship = mockInternships.find(i => i.id === application.internshipId);
                  
                  return (
                    <motion.div 
                      key={application.id}
                      whileHover={{ x: 5 }}
                      className="p-4 border border-gray-200 rounded-lg hover:border-primary-300"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <FaUser className="h-6 w-6 text-gray-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">
                            New application for {internship?.title || 'Unknown Position'}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(application.appliedDate).toLocaleDateString()}
                          </p>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          application.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : application.status === 'accepted'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                        </span>
                      </div>
                      <div className="mt-2 flex justify-end">
                        <Link to="#" className="text-xs text-primary-600 hover:text-primary-700">
                          Review
                        </Link>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500">No applications yet</p>
              </div>
            )}
          </div>
          
          {/* University Connections */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Connect with Universities</h2>
            
            <div className="space-y-4">
              {suggestedUniversities.map(university => (
                <motion.div 
                  key={university.id}
                  whileHover={{ x: 5 }}
                  className="p-4 border border-gray-200 rounded-lg hover:border-secondary-300"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <FaUniversity className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{university.name}</p>
                      <p className="text-sm text-gray-500">{university.location}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-end">
                    <Link to="#" className="text-xs text-secondary-600 hover:text-secondary-700">
                      Connect
                    </Link>
                  </div>
                </motion.div>
              ))}
              
              <div className="mt-4 text-center">
                <Link to="/universities" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View all universities
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationDashboard;