// Mock users for authentication
export const mockUsers = [
  {
    id: "user-1",
    name: "John Smith",
    email: "student@example.com",
    password: "password123",
    role: "student",
    university: "Pacific Island University",
    profileImage: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
    bio: "Computer Science student passionate about web development and machine learning.",
    skills: ["JavaScript", "React", "Python", "Data Analysis"],
    documents: {
      cv: null,
      universityLetter: null
    },
    applications: []
  },
  {
    id: "user-2",
    name: "Tech Innovations Inc.",
    email: "organization@example.com",
    password: "password123",
    role: "organization",
    profileImage: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "A leading technology company focused on innovative solutions.",
    industry: "Technology",
    location: "San Francisco, CA",
    website: "https://techinnovations.example.com",
    hasInternships: true,
    desiredSkills: ["JavaScript", "React", "Node.js", "UX Design"]
  },
  {
    id: "user-3",
    name: "Island State University",
    email: "university@example.com",
    password: "password123",
    role: "university",
    profileImage: "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "A leading research university dedicated to academic excellence.",
    location: "Honolulu, HI",
    website: "https://isu.example.com",
    programs: ["Computer Science", "Business", "Marine Biology", "Engineering"]
  }
];

// Mock internships
export const mockInternships = [
  {
    id: "internship-1",
    organizationId: "user-2",
    title: "Frontend Developer Intern",
    description: "Join our team to develop modern web applications using React and related technologies.",
    requirements: "Knowledge of JavaScript, React, and responsive design principles. Strong problem-solving skills and ability to work in a team.",
    duration: "3 months",
    isRemote: true,
    location: "San Francisco, CA (Remote possible)",
    deadline: "2025-06-30",
    postedDate: "2025-04-01",
    skills: ["JavaScript", "React", "HTML", "CSS"],
    isActive: true,
    applicationsCount: 12
  },
  {
    id: "internship-2",
    organizationId: "user-2",
    title: "Data Science Intern",
    description: "Work with our data team to analyze customer behavior and improve product recommendations.",
    requirements: "Experience with Python, data analysis libraries, and statistical methods. Background in mathematics or statistics preferred.",
    duration: "6 months",
    isRemote: false,
    location: "San Francisco, CA",
    deadline: "2025-07-15",
    postedDate: "2025-04-10",
    skills: ["Python", "Data Analysis", "Statistics", "Machine Learning"],
    isActive: true,
    applicationsCount: 8
  },
  {
    id: "internship-3",
    organizationId: "user-2",
    title: "UX/UI Design Intern",
    description: "Help design intuitive and beautiful user interfaces for our web and mobile applications.",
    requirements: "Proficiency in design tools like Figma or Adobe XD. Understanding of user-centered design principles.",
    duration: "4 months",
    isRemote: true,
    location: "Remote",
    deadline: "2025-06-20",
    postedDate: "2025-04-05",
    skills: ["UI Design", "UX Research", "Figma", "Prototyping"],
    isActive: true,
    applicationsCount: 15
  }
];

// Mock universities
export const mockUniversities = [
  {
    id: "univ-1",
    name: "Pacific Island University",
    location: "Honolulu, HI",
    description: "A premier research institution focusing on marine sciences and technology.",
    website: "https://piu.edu",
    programs: ["Marine Biology", "Computer Science", "Environmental Science", "Business Administration"],
    imageUrl: "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "univ-2",
    name: "Coastal State University",
    location: "San Diego, CA",
    description: "Known for strong programs in engineering and life sciences.",
    website: "https://csu.edu",
    programs: ["Mechanical Engineering", "Bioengineering", "Computer Science", "Business"],
    imageUrl: "https://images.pexels.com/photos/159490/yale-university-landscape-universities-schools-159490.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "univ-3",
    name: "Island Technical Institute",
    location: "Miami, FL",
    description: "A specialized institution focused on technology and innovation.",
    website: "https://iti.edu",
    programs: ["Software Engineering", "Robotics", "Data Science", "Digital Marketing"],
    imageUrl: "https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=600"
  }
];

// Mock applications
export const mockApplications = [
  {
    id: "app-1",
    internshipId: "internship-1",
    studentId: "user-1",
    status: "pending",
    appliedDate: "2025-04-15",
    resume: "John_Smith_Resume.pdf",
    coverLetter: "I am excited about the opportunity to join your team...",
    acceptanceLetter: null
  }
];

// Mock notifications
export const mockNotifications = [
  {
    id: "notif-1",
    userId: "user-1",
    userRole: "student",
    title: "Application Received",
    message: "Your application for Frontend Developer Intern has been received.",
    type: "application",
    read: false,
    timestamp: "2025-04-15T14:30:00Z"
  },
  {
    id: "notif-2",
    userId: "user-1",
    userRole: "student",
    title: "New Internship Matches",
    message: "3 new internships match your skills and preferences.",
    type: "recommendation",
    read: false,
    timestamp: "2025-04-14T09:15:00Z"
  },
  {
    id: "notif-3",
    userRole: "organization",
    title: "New Application",
    message: "John Smith has applied for Frontend Developer Intern position.",
    type: "application",
    read: false,
    timestamp: "2025-04-15T14:35:00Z"
  },
  {
    id: "notif-4",
    userRole: "university",
    title: "Organization Interest",
    message: "Tech Innovations Inc. is interested in partnering with your university.",
    type: "partnership",
    read: false,
    timestamp: "2025-04-13T11:20:00Z"
  }
];