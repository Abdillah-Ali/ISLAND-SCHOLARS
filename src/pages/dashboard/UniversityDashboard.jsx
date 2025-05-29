import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUniversity, FaBuilding, FaGraduationCap, FaHandshake } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import StatCard from '../../components/dashboard/StatCard';

const UniversityDashboard = () => {
  const { currentUser } = useAuth();
  
  // Mock data for university dashboard
  const stats = {
    studentCount: 1247,
    organizationPartners: 28,
    activeInternships: 43,
    collaborations: 12
  };
  
  // Mock recent partnership requests
  const partnershipRequests = [
    {
      id: 'req-1',
      organization: 'Tech Innovations Inc.',
      date: '2025-04-15',
      type: 'Internship Program',
      status: 'pending'
    },
    {
      id: 'req-2',
      organization: 'Global Finance Group',
      date: '2025-04-12',
      type: 'Research Collaboration',
      status: 'pending'
    },
    {
      id: 'req-3',
      organization: 'Healthcare Solutions',
      date: '2025-04-10',
      type: 'Guest Lectures',
      status: 'approved'
    }
  ];
  
  // Mock featured student placements
  const studentPlacements = [
    {
      id: 'place-1',
      name: 'Sarah Johnson',
      organization: 'Tech Innovations Inc.',
      position: 'Frontend Development Intern',
      startDate: '2025-06-01'
    },
    {
      id: 'place-2',
      name: 'Michael Chen',
      organization: 'Global Finance Group',
      position: 'Data Analysis Intern',
      startDate: '2025-06-15'
    },
    {
      id: 'place-3',
      name: 'Emily Rodriguez',
      organization: 'Healthcare Solutions',
      position: 'UX Research Intern',
      startDate: '2025-05-20'
    }
  ];
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">University Dashboard</h1>
          <p className="text-gray-600">Welcome back, {currentUser.name}</p>
        </div>
        <div className="flex space-x-3">
          <Link to="#" className="btn-primary">
            Manage Programs
          </Link>
          <Link to="/university/profile" className="btn-outline">
            View Profile
          </Link>
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Registered Students" 
          value={stats.studentCount} 
          icon={<FaGraduationCap className="h-6 w-6" />}
          color="primary"
        />
        <StatCard 
          title="Organization Partners" 
          value={stats.organizationPartners} 
          icon={<FaBuilding className="h-6 w-6" />}
          color="secondary"
        />
        <StatCard 
          title="Active Internships" 
          value={stats.activeInternships} 
          icon={<FaUniversity className="h-6 w-6" />}
          color="accent"
        />
        <StatCard 
          title="Active Collaborations" 
          value={stats.collaborations} 
          icon={<FaHandshake className="h-6 w-6" />}
          color="success"
        />
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Partnership Requests */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Partnership Requests</h2>
              <Link to="#" className="text-sm text-primary-600 hover:text-primary-700">
                View All
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Organization
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {partnershipRequests.map((request) => (
                    <tr key={request.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{request.organization}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{request.type}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{new Date(request.date).toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          request.status === 'pending' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : request.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {request.status === 'pending' ? (
                          <div className="space-x-2">
                            <Link to="#\" className="text-primary-600 hover:text-primary-900">
                              Approve
                            </Link>
                            <Link to="#" className="text-red-600 hover:text-red-900">
                              Decline
                            </Link>
                          </div>
                        ) : (
                          <Link to="#" className="text-primary-600 hover:text-primary-900">
                            View
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Student Placements */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Recent Placements</h2>
              <Link to="#" className="text-sm text-primary-600 hover:text-primary-700">
                View All
              </Link>
            </div>
            
            <div className="space-y-4">
              {studentPlacements.map(placement => (
                <motion.div 
                  key={placement.id}
                  whileHover={{ x: 5 }}
                  className="p-4 border border-gray-200 rounded-lg hover:border-primary-300"
                >
                  <h3 className="font-medium text-gray-800">{placement.name}</h3>
                  <p className="text-sm text-gray-600">{placement.position}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <p className="text-xs text-gray-500">
                      Starting {new Date(placement.startDate).toLocaleDateString()}
                    </p>
                    <span className="text-xs px-2 py-0.5 bg-secondary-100 text-secondary-800 rounded-full">
                      {placement.organization}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityDashboard;