import { useState, useEffect, useRef } from 'react';
import { ListOrdered, Briefcase, Home, Search, User, ArrowLeft, CheckCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ResultsPage() {
  const [activeTab, setActiveTab] = useState<'steps' | 'results'>('steps');
  const [stepIndex, setStepIndex] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [progressHeight, setProgressHeight] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();
  const prompt = location.state?.prompt || 'Your Search Prompt';

  const sidebarItems = [
    { id: 'home', icon: Home, label: 'Home', route: '/' },
    { id: 'search', icon: Search, label: 'Search Jobs', route: '/' },
  ];

  const [sidebarTab, setSidebarTab] = useState('search');

  const handleNavigation = (id: string, route?: string) => {
    setSidebarTab(id);
    if (id === 'profile') navigate('/profile');
    else if (route) navigate(route);
  };

  const steps = [
    { title: 'Student profile being analysed' },
    { title: 'Reading your interests' },
    { title: 'Fetching opportunities according to your interests' },
    {
      title: 'Opportunities fetched. Finding a perfect opportunity that matches your profile, skills, experiences, etc.',
      thinkText: `Analyzing the student's academic profile, previous experiences, skill set, and stated interests in depth. Evaluating potential job opportunities across various companies and sectors that align with both the student's preferences and qualifications. Applying natural language understanding to interpret nuances in the profile and match them against job descriptions, requirements, and growth potential. Prioritizing roles that offer relevant responsibilities, learning opportunities, and career alignment. Using LLM reasoning to rank and justify the best opportunities based on cultural fit, technical requirements, and long-term value. Finalizing the most suitable match from the dataset.`
    },
    { title: 'Perfect Opportunity is Found ✅' }
  ];

  useEffect(() => {
    if (stepIndex < steps.length - 1) {
      const timeout = setTimeout(() => setStepIndex((prev) => prev + 1), 2000);
      return () => clearTimeout(timeout);
    }

    if (stepIndex === steps.length - 1) {
      const timeout = setTimeout(() => {
        setActiveTab('results');
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [stepIndex]);

  useEffect(() => {
    if (progressRef.current && stepRefs.current[stepIndex]) {
      const top = progressRef.current.getBoundingClientRect().top;
      const bottom = stepRefs.current[stepIndex]!.getBoundingClientRect().top + 6;
      setProgressHeight(bottom - top);
    }
  }, [stepIndex]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex w-full">
      {/* Sidebar */}
      <div className="w-16 bg-white/80 backdrop-blur-sm border-r border-slate-200/60 flex flex-col items-center py-6">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center mb-6">
          <div className="w-4 h-4 bg-white rounded-sm" />
        </div>
        <nav className="flex flex-col space-y-4 flex-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id, item.route)}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                sidebarTab === item.id
                  ? 'bg-blue-100 text-blue-600 shadow-sm'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
              }`}
              title={item.label}
            >
              <item.icon size={20} />
            </button>
          ))}
        </nav>
        <button
          onClick={() => handleNavigation('profile')}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
            sidebarTab === 'profile'
              ? 'bg-blue-100 text-blue-600 shadow-sm'
              : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
          }`}
          title="Profile"
        >
          <User size={20} />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white/60 backdrop-blur-sm border-b border-slate-200/60 flex items-center justify-end px-6">
          <div
            className="w-8 h-8 bg-gradient-to-br from-slate-300 to-slate-400 rounded-full flex items-center justify-center cursor-pointer hover:shadow-md transition-shadow duration-200"
            onClick={() => navigate('/profile')}
          >
            <User size={16} className="text-slate-600" />
          </div>
        </header>

        <main className="flex-1 px-6 pt-10 pb-16 w-full max-w-2xl mx-auto overflow-y-auto">
          <button
            onClick={() => navigate('/', { state: { prompt } })}
            className="flex items-center text-slate-600 hover:text-blue-600 transition mb-6"
          >
            <ArrowLeft size={20} className="mr-1" />
            <span className="text-sm font-medium">Back to Edit Prompt</span>
          </button>

          <div className="text-left mb-6 pl-4">
            <div className="text-3xl font-light text-slate-800 mb-8 -mt-2">{prompt}</div>
            <div className="flex space-x-6 border-b border-slate-200">
              <button
                className={`pb-1 border-b-2 text-sm font-medium flex items-center gap-1 ${
                  activeTab === 'steps' ? 'border-black text-black' : 'border-transparent text-slate-500'
                }`}
                onClick={() => setActiveTab('steps')}
              >
                <ListOrdered size={16} />
                Thinking
              </button>
              <button
                className={`pb-1 border-b-2 text-sm font-medium flex items-center gap-1 ${
                  activeTab === 'results' ? 'border-black text-black' : 'border-transparent text-slate-500'
                }`}
                onClick={() => setActiveTab('results')}
              >
                <Briefcase size={16} />
                Job Results
              </button>
            </div>
          </div>

          {activeTab === 'steps' && (
            <div className="relative flex max-h-[70vh] overflow-y-auto pr-2">
              {/* Vertical thread line */}
              <div className="w-6 relative" ref={progressRef}>
                <div
                  className="absolute top-2 left-1/2 -translate-x-1/2 w-[2px] bg-[#444] transition-all duration-700 ease-out"
                  style={{ height: `${progressHeight}px` }}
                />
              </div>

              {/* Steps with aligned dots */}
              <div className="flex-1 space-y-6 pl-4">
                {steps.slice(0, stepIndex + 1).map((step, i) => (
                  <div
                    key={i}
                    ref={(el) => (stepRefs.current[i] = el)}
                    className="mb-6 relative flex items-start gap-3"
                  >
                    {/* Dot aligned on the line */}
                    <div className="absolute left-[-35px] top-[6px] w-3 h-3 bg-[#ccc] rounded-full z-10" />

                    {/* Tick icon for final step */}
                    {i === steps.length - 1 && stepIndex === steps.length - 1 && (
                      <CheckCircle
                        className="text-green-500 absolute left-[-10px] top-[2px] animate-ping-slow z-20"
                        size={18}
                      />
                    )}

                    <div>
                    <div
  className={`text-sm font-medium mb-1 ${
    i === steps.length - 1 ? 'ml-4' : ''
  }`}
>
  {step.title}
</div>

                      {step.thinkText && (
                        <div className="mt-2 border border-slate-200 bg-white rounded-xl p-6 text-sm text-slate-700 shadow-sm max-h-[250px] min-h-[200px] w-full overflow-y-auto whitespace-pre-line leading-relaxed">
                          {step.thinkText}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

{activeTab === 'results' && (
  <div className="mt-4 text-sm text-slate-700 space-y-6">
    <p className="text-green-600 font-medium">Job Results loading complete.</p>
    {[
      {
        title: "Frontend Developer Intern - React",
        matchScore: 92,
        fitReasons: [
          "Strong match with your React experience",
          "Frontend projects align with required skills",
          "Familiarity with HTML/CSS/JS frameworks"
        ],
        mismatches: ["No prior internship experience"]
      },
      {
        title: "Data Analyst Intern - Python & SQL",
        matchScore: 89,
        fitReasons: [
          "Solid foundation in Python",
          "Strong data handling and analysis interest",
          "Coursework related to DBMS and stats"
        ],
        mismatches: ["Basic level of SQL usage"]
      },
      {
        title: "Machine Learning Research Intern",
        matchScore: 85,
        fitReasons: [
          "Interest in AI/ML as seen in projects",
          "Mathematical background fits requirements"
        ],
        mismatches: ["Limited research publication experience"]
      },
      {
        title: "Web Development Intern - MERN Stack",
        matchScore: 90,
        fitReasons: [
          "Experience with React and Node.js",
          "Personal projects match stack"
        ],
        mismatches: ["MongoDB proficiency needs improvement"]
      },
      {
        title: "Product Design Intern - UI/UX",
        matchScore: 76,
        fitReasons: [
          "Strong design sensibility",
          "Knowledge of Figma and user-centered thinking"
        ],
        mismatches: ["No formal design course"]
      },
      {
        title: "Technical Content Writer - AI",
        matchScore: 88,
        fitReasons: [
          "Strong writing ability",
          "Knowledge of AI/ML helps in content depth"
        ],
        mismatches: ["Limited blog/public platform writing"]
      },
      {
        title: "Backend Developer Intern - Node.js",
        matchScore: 80,
        fitReasons: [
          "Good JavaScript fundamentals",
          "Express.js experience"
        ],
        mismatches: ["Database schema design needs improvement"]
      },
      {
        title: "Cloud Engineering Intern - AWS",
        matchScore: 72,
        fitReasons: [
          "Interest in DevOps and Cloud",
          "Linux and networking exposure"
        ],
        mismatches: ["No AWS certification"]
      },
      {
        title: "Business Analyst Intern",
        matchScore: 83,
        fitReasons: [
          "Analytical mindset",
          "Strong communication skills"
        ],
        mismatches: ["Basic Excel knowledge"]
      },
      {
        title: "Cybersecurity Intern",
        matchScore: 75,
        fitReasons: [
          "Completed security-related courses",
          "Interest in ethical hacking"
        ],
        mismatches: ["No hands-on project in cybersecurity"]
      },
      {
        title: "AI Chatbot Development Intern",
        matchScore: 91,
        fitReasons: [
          "Experience building LLM-based interfaces",
          "Strong understanding of prompt engineering"
        ],
        mismatches: ["Lacks knowledge of RAG pipelines"]
      }
    ].map((job, index) => (
      <div key={index} className="border border-slate-200 rounded-lg p-4 shadow-sm bg-white">
        <div className="text-lg font-semibold text-slate-800">{job.title}</div>
        <div className="text-sm text-green-600 font-medium mt-1">Match Score: {job.matchScore}%</div>
        <div className="mt-2 text-slate-700">
          <strong>Why you're a good fit:</strong>
          <ul className="list-disc ml-5 mt-1">
            {job.fitReasons.map((reason, i) => (
              <li key={i}>{reason}</li>
            ))}
          </ul>
        </div>
        {job.mismatches.length > 0 && (
          <div className="mt-2 text-slate-700">
            <strong>Minor mismatches:</strong>
            <ul className="list-disc ml-5 mt-1 text-orange-600">
              {job.mismatches.map((reason, i) => (
                <li key={i}>{reason}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    ))}
  </div>
)}

        </main>
      </div>
    </div>
  );
}
