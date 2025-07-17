import React, { createContext, useContext, useState, ReactNode } from 'react';

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

interface StudentContextType {
  studentData: StudentData;
  setStudentData: (data: StudentData) => void;
  updateStudentData: (updates: Partial<StudentData>) => void;
}

const defaultStudentData: StudentData = {
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

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (context === undefined) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
};

interface StudentProviderProps {
  children: ReactNode;
}

export const StudentProvider: React.FC<StudentProviderProps> = ({ children }) => {
  const [studentData, setStudentDataState] = useState<StudentData>(() => {
    const stored = localStorage.getItem("studentData");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return defaultStudentData;
      }
    }
    return defaultStudentData;
  });

  const setStudentData = (data: StudentData) => {
    setStudentDataState(data);
    localStorage.setItem("studentData", JSON.stringify(data));
  };

  const updateStudentData = (updates: Partial<StudentData>) => {
    setStudentDataState(prev => {
      const updated = { ...prev, ...updates };
      localStorage.setItem("studentData", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <StudentContext.Provider value={{ studentData, setStudentData, updateStudentData }}>
      {children}
    </StudentContext.Provider>
  );
}; 