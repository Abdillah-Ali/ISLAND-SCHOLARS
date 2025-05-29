import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';

// Layout
import MainLayout from './components/layout/MainLayout';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Landing Pages
import LandingPage from './pages/landing/LandingPage';

// Dashboard Pages
import StudentDashboard from './pages/dashboard/StudentDashboard';
import OrganizationDashboard from './pages/dashboard/OrganizationDashboard';
import UniversityDashboard from './pages/dashboard/UniversityDashboard';

// Profile Pages
import StudentProfile from './pages/profiles/StudentProfile';
import OrganizationProfile from './pages/profiles/OrganizationProfile';
import UniversityProfile from './pages/profiles/UniversityProfile';
import EditStudentProfile from './pages/profiles/EditStudentProfile';
import EditOrganizationProfile from './pages/profiles/EditOrganizationProfile';

// Internship Pages
import InternshipExplore from './pages/internships/InternshipExplore';
import InternshipDetails from './pages/internships/InternshipDetails';
import InternshipApplication from './pages/internships/InternshipApplication';

// University Pages
import UniversityList from './pages/universities/UniversityList';

// Protected Route
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<LandingPage />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              
              {/* Protected Routes */}
              {/* Student Routes */}
              <Route 
                path="student/dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <StudentDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="student/profile" 
                element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <StudentProfile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="student/profile/edit" 
                element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <EditStudentProfile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="student/internships" 
                element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <InternshipExplore />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="student/internships/:id" 
                element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <InternshipDetails />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="student/internships/:id/apply" 
                element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <InternshipApplication />
                  </ProtectedRoute>
                } 
              />
              
              {/* Organization Routes */}
              <Route 
                path="organization/dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['organization']}>
                    <OrganizationDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="organization/profile" 
                element={
                  <ProtectedRoute allowedRoles={['organization']}>
                    <OrganizationProfile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="organization/profile/edit" 
                element={
                  <ProtectedRoute allowedRoles={['organization']}>
                    <EditOrganizationProfile />
                  </ProtectedRoute>
                } 
              />
              
              {/* University Routes */}
              <Route 
                path="university/dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['university']}>
                    <UniversityDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="university/profile" 
                element={
                  <ProtectedRoute allowedRoles={['university']}>
                    <UniversityProfile />
                  </ProtectedRoute>
                } 
              />
              
              {/* Shared Routes */}
              <Route 
                path="universities" 
                element={
                  <ProtectedRoute allowedRoles={['student', 'organization']}>
                    <UniversityList />
                  </ProtectedRoute>
                } 
              />
            </Route>
          </Routes>
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
