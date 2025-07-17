import { useState, useRef } from 'react';
import { MapPin, Calendar, Building2, GraduationCap, Mail, ArrowLeft, ExternalLink, Code, Award, Briefcase, Target, Globe, Edit3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';
import { useStudent } from '@/contexts/StudentContext';
import { Fragment } from 'react';
import { AppSidebar } from '@/components/ui/sidebar';

interface Project {
  title: string;
  description: string;
  tech_stack: string[];
  project_url: string;
}

interface Experience {
  company: string;
  role: string;
  start_date: string;
  end_date: string;
  description: string;
}

interface Certification {
  title: string;
  issuing_organization: string;
  credential_id: string;
  credential_url: string;
  issue_date: string;
  expiration_date: string | null;
}

interface JobPreferences {
  desired_roles: string[];
  preferred_locations: string[];
  employment_type: string[];
  remote: boolean;
  interests: string[];
}

interface StudentData {
  student_id: string;
  first_name: string;
  last_name: string;
  email: string;
  profile_image: string;
  skills: string[];
  projects: Project[];
  experience: Experience[];
  certifications_and_licenses: Certification[];
  job_preferences: JobPreferences;
}

const sampleStudentData: StudentData = {
  "student_id": "c1f6728d-94e1-41d4-9f12-ffb3d27e7cc5",
  "first_name": "Sarthak",
  "last_name": "Rao",
  "email": "sarthak.rao.mlai@gmail.com",
  "profile_image": "https://dummyimage.com/200x200/111111/ffffff.png&text=Sarthak+R",
  "skills": [
    "Python",
    "TensorFlow",
    "Scikit-learn",
    "Pandas",
    "NumPy",
    "OpenCV",
    "Deep Learning",
    "Natural Language Processing",
    "Data Preprocessing",
    "Model Deployment"
  ],
  "projects": [
    {
      "title": "Real-time Face Mask Detection System",
      "description": "Developed a deep learning model using CNNs and OpenCV to detect whether individuals are wearing face masks in real-time.",
      "tech_stack": [
        "Python",
        "TensorFlow",
        "OpenCV"
      ],
      "project_url": "https://github.com/sarthakrao/face-mask-detector"
    },
    {
      "title": "NLP Resume Classifier",
      "description": "Built a resume classification system that uses NLP techniques and ML algorithms to categorize resumes into job profiles like Data Science, Web Dev, etc.",
      "tech_stack": [
        "Scikit-learn",
        "NLTK",
        "Pandas",
        "Streamlit"
      ],
      "project_url": "https://github.com/sarthakrao/resume-classifier"
    }
  ],
  "experience": [
    {
      "company": "AI Hub India",
      "role": "Machine Learning Intern",
      "start_date": "2024-02-01",
      "end_date": "2024-04-30",
      "description": "Worked on building classification models, handling data cleaning pipelines, and visualizing model outputs for ongoing projects."
    }
  ],
  "certifications_and_licenses": [
    {
      "title": "Deep Learning Specialization",
      "issuing_organization": "Coursera / DeepLearning.AI",
      "credential_id": "DL-2024-COURSE",
      "credential_url": "https://coursera.org/certificate/deep-learning-ai-sarthak",
      "issue_date": "2024-03-15",
      "expiration_date": null
    },
    {
      "title": "AI For Everyone",
      "issuing_organization": "Coursera / Andrew Ng",
      "credential_id": "AI4E-CERT-2023",
      "credential_url": "https://coursera.org/certificate/ai4everyone-sarthak",
      "issue_date": "2023-08-10",
      "expiration_date": null
    }
  ],
  "job_preferences": {
    "desired_roles": [
      "Machine Learning Intern",
      "Data Science Intern",
      "AI Research Intern"
    ],
    "preferred_locations": [
      "Remote",
      "Bangalore",
      "Hyderabad",
      "Pune"
    ],
    "employment_type": [
      "Internship"
    ],
    "remote": true,
    "interests": [
      "machine learning",
      "deep learning",
      "ai"
    ]
  }
};

const StudentProfile = () => {
  const navigate = useNavigate();
  const { studentData, setStudentData } = useStudent();
  const [rawJson, setRawJson] = useState<string>(JSON.stringify(studentData, null, 2));
  const [isEditing, setIsEditing] = useState(false);
  const [sidebarTab, setSidebarTab] = useState('student-profile');
  const [jsonError, setJsonError] = useState<string | null>(null);
  const jsonEditorRef = useRef<HTMLDivElement | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showLogoutSuccess, setShowLogoutSuccess] = useState(false);

  const handleJsonUpdate = () => {
    try {
      const parsedData = JSON.parse(rawJson);
      setStudentData(parsedData);
      setIsEditing(false);
      setJsonError(null);
      setShowModal(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error: any) {
      let errorMsg = 'Invalid JSON format.';
      if (error.message) {
        errorMsg = error.message;
        const match = error.message.match(/at position (\d+)/);
        if (match) {
          const pos = parseInt(match[1], 10);
          const lines = rawJson.slice(0, pos).split('\n');
          const line = lines.length;
          const col = lines[lines.length - 1].length + 1;
          errorMsg += ` (Line ${line}, Column ${col})`;
        }
      }
      setJsonError(errorMsg);
    }
  };

  const handleEditProfileClick = () => {
    setIsEditing(true);
    setShowModal(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setShowModal(false);
    setJsonError(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  const handleThemeToggle = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    // For now, just toggles state. You can add real theme logic later.
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear all session data
    navigate('/login');
    setShowSettings(false);
    setShowLogoutSuccess(true);
    setTimeout(() => setShowLogoutSuccess(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex w-full">
      <AppSidebar activeTab="student-profile" />
      {/* Main Content - Add margin to account for fixed sidebar */}
      <div className="flex-1 flex flex-col ml-16">
        <div className="w-full flex justify-center">
          <div className="w-full max-w-5xl px-4">
            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-slate-600 hover:text-blue-600 transition mb-6 mt-6"
            >
              <ArrowLeft size={20} className="mr-1" />
              <span className="text-sm font-medium">Back</span>
            </button>

            {/* Header Card */}
            <Card className="mb-6 overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
              <CardContent className="pt-6 pb-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                      <AvatarImage
                        src={studentData.profile_image}
                        alt={`${studentData.first_name} ${studentData.last_name}`}
                      />
                      <AvatarFallback className="text-2xl">
                        {studentData.first_name[0]}{studentData.last_name[0]}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  {/* Profile Info */}
                  <div className="flex-1 min-w-0">
                    <div className="relative">
                      <h1 className="text-3xl font-semibold text-slate-800 mb-1">
                        {studentData.first_name} {studentData.last_name}
                      </h1>
                      <button
                        onClick={handleEditProfileClick}
                        className="absolute top-0 right-0 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-lg border border-blue-700 transition z-10"
                        title="Edit Profile"
                      >
                        <Edit3 size={18} className="mr-1" />
                        Edit Profile
                      </button>
                    </div>

                    <div className="flex items-center gap-1 text-blue-600 text-sm mb-4">
                      <Mail size={14} />
                      <span>{studentData.email}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {studentData.job_preferences.desired_roles.map((role, index) => (
                        <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Skills Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code size={20} />
                      Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {studentData.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="bg-slate-50">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Projects Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code size={20} />
                      Projects
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {studentData.projects.map((project, index) => (
                      <div key={index} className="border border-slate-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-semibold text-slate-800">{project.title}</h3>
                          <a
                            href={project.project_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <ExternalLink size={16} />
                          </a>
                        </div>
                        <p className="text-slate-600 text-sm mb-3">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tech_stack.map((tech, techIndex) => (
                            <Badge key={techIndex} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Experience Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase size={20} />
                      Experience
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {studentData.experience.map((exp, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
                          <Building2 size={20} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-slate-800 mb-0.5">{exp.role}</h3>
                          <p className="text-slate-600 text-sm mb-1">{exp.company}</p>
                          <div className="flex items-center gap-4 text-xs text-slate-500 mb-2">
                            <div className="flex items-center gap-1">
                              <Calendar size={12} />
                              <span>{formatDate(exp.start_date)} - {formatDate(exp.end_date)}</span>
                            </div>
                          </div>
                          <p className="text-sm text-slate-700">{exp.description}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Certifications Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award size={20} />
                      Certifications & Licenses
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {studentData.certifications_and_licenses.map((cert, index) => (
                      <div key={index} className="border border-slate-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-semibold text-slate-800">{cert.title}</h3>
                          <a
                            href={cert.credential_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <ExternalLink size={16} />
                          </a>
                        </div>
                        <p className="text-slate-600 text-sm mb-2">{cert.issuing_organization}</p>
                        <p className="text-xs text-slate-500 mb-2">ID: {cert.credential_id}</p>
                        <p className="text-xs text-slate-500">
                          Issued: {formatDate(cert.issue_date)}
                          {cert.expiration_date && ` • Expires: ${formatDate(cert.expiration_date)}`}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Job Preferences Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target size={20} />
                      Job Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-800 mb-2">Desired Roles</h4>
                      <div className="flex flex-wrap gap-2">
                        {studentData.job_preferences.desired_roles.map((role, index) => (
                          <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                            {role}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-slate-800 mb-2">Preferred Locations</h4>
                      <div className="flex flex-wrap gap-2">
                        {studentData.job_preferences.preferred_locations.map((location, index) => (
                          <Badge key={index} variant="outline" className="bg-slate-50">
                            <MapPin size={12} className="mr-1" />
                            {location}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-slate-800 mb-2">Employment Type</h4>
                      <div className="flex flex-wrap gap-2">
                        {studentData.job_preferences.employment_type.map((type, index) => (
                          <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-800">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-slate-800 mb-2">Remote Work</h4>
                      <Badge variant={studentData.job_preferences.remote ? "default" : "secondary"}>
                        {studentData.job_preferences.remote ? "Available" : "Not Available"}
                      </Badge>
                    </div>

                    <div>
                      <h4 className="font-medium text-slate-800 mb-2">Interests</h4>
                      <div className="flex flex-wrap gap-2">
                        {studentData.job_preferences.interests.map((interest, index) => (
                          <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Modal for Raw JSON Editor */}
            {showModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 p-0 overflow-hidden animate-fade-in">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
                    <div className="flex items-center gap-2 text-lg font-semibold text-slate-800">
                      <Edit3 size={20} />
                      Edit Profile (JSON)
                    </div>
                    <button onClick={handleCancel} className="text-slate-400 hover:text-slate-600 text-xl font-bold px-2 py-1 rounded transition">&times;</button>
                  </div>
                  <div className="px-6 py-4">
                    <Textarea
                      value={rawJson}
                      onChange={(e) => setRawJson(e.target.value)}
                      className="font-mono text-sm h-80 resize-none border border-slate-200 rounded-lg"
                      placeholder="Enter JSON data..."
                      autoFocus
                    />
                    {jsonError && (
                      <div className="flex items-start gap-2 mt-3 mb-2">
                        <div className="flex-shrink-0 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <div className="rounded-lg border border-red-300 bg-red-50/80 px-4 py-3 text-sm text-red-700 font-medium shadow-sm w-full whitespace-pre-line">
                          {jsonError}
                        </div>
                      </div>
                    )}
                    <div className="flex justify-end gap-2 mt-6">
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 rounded-lg border border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleJsonUpdate}
                        className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow transition"
                      >
                        Update Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Success Popup */}
            {showSuccess && (
              <div className="fixed bottom-6 right-6 z-[100] pointer-events-none">
                <div className="bg-green-600 text-white px-6 py-3 rounded-xl shadow-2xl text-base font-semibold animate-fade-in pointer-events-auto">
                  Profile updated successfully!
                </div>
              </div>
            )}

            {/* Logout Success Popup */}
            {showLogoutSuccess && (
              <div className="fixed bottom-6 right-6 z-[100] pointer-events-none">
                <div className="bg-green-600 text-white px-6 py-3 rounded-xl shadow-2xl text-base font-semibold animate-fade-in pointer-events-auto">
                  Logged out successfully!
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile; 