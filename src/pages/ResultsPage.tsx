// import { useState, useEffect, useRef } from 'react';
// import {
//   ListOrdered,
//   Briefcase,
//   Home,
//   Search,
//   User,
//   ArrowLeft,
//   CheckCircle,
// } from 'lucide-react';
// import { useLocation, useNavigate } from 'react-router-dom';

// export default function ResultsPage() {
//   const [activeTab, setActiveTab] = useState<'steps' | 'results'>('steps');
//   const [stepIndex, setStepIndex] = useState(0);
//   const progressRef = useRef<HTMLDivElement>(null);
//   const lastStepRef = useRef<HTMLDivElement>(null);
//   const [progressHeight, setProgressHeight] = useState(0);

//   const location = useLocation();
//   const navigate = useNavigate();
//   const prompt = location.state?.prompt || 'Your Search Prompt';
//   const [searchInput, setSearchInput] = useState('');

//   const sidebarItems = [
//     { id: 'home', icon: Home, label: 'Home', route: '/' },
//     { id: 'search', icon: Search, label: 'Search Jobs', route: '/' },
//   ];

//   const [sidebarTab, setSidebarTab] = useState('search');

//   const handleNavigation = (id: string, route?: string) => {
//     setSidebarTab(id);
//     if (id === 'profile') {
//       navigate('/profile');
//     } else if (route) {
//       navigate(route);
//     }
//   };

//   const handleNewSearch = () => {
//     if (searchInput.trim()) {
//       navigate('/', { state: { prompt: searchInput } });
//     }
//   };

//   const steps = [
//     { title: 'Student data loaded and interests set!', subtitle: 'Searching...' },
//     {
//       title: 'Loading and Indexing Jobs...',
//       thinkText: `Alright, so I've got this query from a user who wants me to act as a career advisor and job matcher. They provided a JSON array of job postings and a student profile. My task is to analyze each job against the student's background and preferences, assign a match score, and present the results in a structured way.
// First, I need to understand the student's profile. Rohan Kapoor has skills in JavaScript, React.js, Node.js, Express.js, MongoDB, Redux, HTML, CSS, REST APIs, and Tailwind CSS. His projects include a Task Manager Web App and an E-Commerce Website, both using the MERN stack. He also has an internship experience as a Frontend Developer at Webverse Labs. His certifications include a Full-Stack Web Development with MERN from freeCodeCamp and Modern React with Redux from Udemy.

// Now, looking at the job postings, I need to match each one based on Rohan's skills, experience, and preferences. The job preferences mention he's looking for intern roles, both full-stack and frontend, preferably remote or in Bangalore, Pune, or Delhi NCR.

// I'll start by analyzing each job:

// Kreativstorm - Frontend Developer - Intern: This is a remote internship. Rohan's skills in React, Node, and frontend technologies are a good fit. His experience and projects align well, so this should have a high match score.

// Quinstreet Software India - PHP Developer - Intern: This role requires PHP, which Rohan doesn't have. His skills are more in JavaScript and MERN stack, so this might be a lower match.

// Edorbit - Backend Developer Intern: Focuses on backend with Java/Spring/Hibernate. Again, Rohan's experience is more frontend and full-stack with Node and Express, so not a perfect fit.

// DR Enterprises - Java Developer Intern: Another backend Java role, which doesn't align with Rohan's skills.

// Complyance - Full Stack Developer Intern: This is in Chennai, which isn't Rohan's preferred location. Plus, he prefers remote, so this might be a lower match.

// EMO Energy - Full Stack Developer- Intern: 6-month internship with possible extension. Rohan's full-stack experience makes this a good fit.

// Hubnex - Blockchain Developer Intern: Requires blockchain experience, which Rohan doesn't have, so this is a mismatch.

// Tutar By Infusory - Full Stack (MERN) Developer Intern: Perfect fit as it's MERN stack, which Rohan specializes in.

// Wijungle - Full - Stack Developer Intern: Mentions Linux programming, which isn't Rohan's strength, so lower match.

// Kreativstorm - Software Engineer - Intern: Same company as the first job but in New Delhi. Rohan's location preference includes Delhi NCR, so this is a good fit.

// After analyzing each job, I'll assign match scores based on how well Rohan's skills, experience, and preferences align. The highest scores will be for the MERN stack and frontend roles, especially those that are remote or in his preferred locations.

// I need to ensure the output is structured with each job having a detailed breakdown of why it's a good fit and potential issues. The final list should be sorted from highest to lowest match score.

// Finally, I'll present the findings in a clean, bullet-pointed format with emojis and bold headers for clarity.`
//     },
//     { title: 'Loaded and indexed jobs' },
//   ];

//   const jobResults = [
//     {
//       title: 'Kreativstorm – Frontend Developer - Intern',
//       score: 94,
//       fit: ['Frontend skills match', 'Remote preference met'],
//       mismatch: ['Duration not specified'],
//     },
//     {
//       title: 'Tutar – Full Stack (MERN) Developer Intern',
//       score: 93,
//       fit: ['MERN stack experience', 'Project alignment'],
//       mismatch: ['Remote not mentioned'],
//     },
//     // Add more jobs if needed
    
//       {
//         title: 'InnovateX – React Frontend Developer Intern',
//         score: 91,
//         fit: ['Strong React skills', 'Frontend-focused projects', 'Remote option available'],
//         mismatch: ['No backend exposure in this role'],
//       },
//       {
//         title: 'CodeCatalyst – Full Stack Developer Intern',
//         score: 90,
//         fit: ['MERN experience', 'Previous full-stack projects', 'Startup environment'],
//         mismatch: ['No mention of remote/hybrid flexibility'],
//       },
//       {
//         title: 'AlphaTech – Frontend Intern (Tailwind + Redux)',
//         score: 88,
//         fit: ['Tailwind and Redux experience', 'Frontend focus', 'Good UI sense'],
//         mismatch: ['Short 2-month duration'],
//       },
//       {
//         title: 'ByteBridge – Software Engineer Intern (MERN)',
//         score: 89,
//         fit: ['MERN stack aligned', 'Built similar apps', 'Paid internship'],
//         mismatch: ['No clear location preference match'],
//       },
//       {
//         title: 'UrbanPixel – UI Developer Intern',
//         score: 86,
//         fit: ['UI/UX knowledge', 'Tailwind CSS expertise', 'Frontend profile'],
//         mismatch: ['Minimal backend involvement'],
//       },
//       {
//         title: 'StackHive – Full Stack Web Developer Intern',
//         score: 92,
//         fit: ['MERN + real-time experience (Socket.io)', 'Good match with Task Manager project'],
//         mismatch: ['Requires familiarity with CI/CD tools'],
//       },
//       {
//         title: 'DevSprint – Frontend Engineer Intern',
//         score: 87,
//         fit: ['Strong React base', 'Redux usage', 'Good UI work'],
//         mismatch: ['In-office only (Delhi)'],
//       },
//       {
//         title: 'BrightCode – Web Dev Intern (E-commerce)',
//         score: 89,
//         fit: ['E-commerce project match', 'Stripe API experience', 'Full stack exposure'],
//         mismatch: ['3-month unpaid internship'],
//       },
//       {
//         title: 'TechnoVerse – Junior Full Stack Intern',
//         score: 90,
//         fit: ['Node + MongoDB skills', 'REST API knowledge', 'Long-term internship'],
//         mismatch: ['Requires familiarity with testing frameworks'],
//       },
//       {
//         title: 'FusionLogics – Frontend Dev Intern',
//         score: 85,
//         fit: ['Frontend-heavy role', 'React and HTML/CSS usage', 'Focus on performance optimization'],
//         mismatch: ['Location: Chennai (not preferred)'],
//       },
//       {
//         title: 'LambdaStack – MERN Developer Intern',
//         score: 93,
//         fit: ['Perfect MERN alignment', 'Projects closely match job tasks', 'Remote-friendly'],
//         mismatch: ['None'],
//       }
//     ]
    
//   ;

//   useEffect(() => {
//     if (stepIndex < steps.length - 1) {
//       const timeout = setTimeout(() => setStepIndex((prev) => prev + 1), 2000);
//       return () => clearTimeout(timeout);
//     }
//   }, [stepIndex]);

//   useEffect(() => {
//     if (progressRef.current && lastStepRef.current) {
//       const top = progressRef.current.getBoundingClientRect().top;
//       const bottom = lastStepRef.current.getBoundingClientRect().bottom;
//       setProgressHeight(bottom - top);
//     }
//   }, [stepIndex]);

//   return (
//     <div className="h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex w-full overflow-hidden">
//       {/* Sidebar */}
//       <div className="w-16 bg-white/80 backdrop-blur-sm border-r border-slate-200/60 flex flex-col items-center py-6 fixed top-0 bottom-0 left-0 z-40">
//         <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center mb-6">
//           <div className="w-4 h-4 bg-white rounded-sm" />
//         </div>
//         <nav className="flex flex-col space-y-4 flex-1">
//           {sidebarItems.map((item) => (
//             <button
//               key={item.id}
//               onClick={() => handleNavigation(item.id, item.route)}
//               className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
//                 sidebarTab === item.id
//                   ? 'bg-blue-100 text-blue-600 shadow-sm'
//                   : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
//               }`}
//               title={item.label}
//             >
//               <item.icon size={20} />
//             </button>
//           ))}
//         </nav>
//         <button
//           onClick={() => handleNavigation('profile')}
//           className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
//             sidebarTab === 'profile'
//               ? 'bg-blue-100 text-blue-600 shadow-sm'
//               : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
//           }`}
//           title="Profile"
//         >
//           <User size={20} />
//         </button>
//       </div>

//       {/* Main Content */}
//       <div className="ml-16 flex flex-col flex-1 relative">
//         {/* Top Navbar */}
//         <header className="h-16 bg-white/60 backdrop-blur-sm border-b border-slate-200/60 flex items-center justify-end px-6 fixed left-16 right-0 top-0 z-30">
//           <div
//             className="w-8 h-8 bg-gradient-to-br from-slate-300 to-slate-400 rounded-full flex items-center justify-center cursor-pointer hover:shadow-md transition-shadow duration-200"
//             onClick={() => navigate('/profile')}
//           >
//             <User size={16} className="text-slate-600" />
//           </div>
//         </header>

//         {/* Scrollable Inner Main Section */}
//         <main className="pt-16 flex-1 overflow-hidden">
//           <div className="h-full overflow-y-auto px-6 pt-10 pb-32 w-full max-w-2xl mx-auto">
//             {/* Go Back */}
//             <button
//               onClick={() => navigate('/', { state: { prompt } })}
//               className="flex items-center text-slate-600 hover:text-blue-600 transition mb-6"
//             >
//               <ArrowLeft size={20} className="mr-1" />
//               <span className="text-sm font-medium">Back to Edit Prompt</span>
//             </button>

//             {/* Tabs */}
//             <div className="text-left mb-6 pl-4">
//               <div className="text-3xl font-light text-slate-800 mb-8 -mt-2">{prompt}</div>
//               <div className="flex space-x-6 border-b border-slate-200">
//                 <button
//                   className={`pb-1 border-b-2 text-sm font-medium flex items-center gap-1 ${
//                     activeTab === 'steps' ? 'border-black text-black' : 'border-transparent text-slate-500'
//                   }`}
//                   onClick={() => setActiveTab('steps')}
//                 >
//                   <ListOrdered size={16} />
//                   Steps
//                 </button>
//                 <button
//                   className={`pb-1 border-b-2 text-sm font-medium flex items-center gap-1 ${
//                     activeTab === 'results' ? 'border-black text-black' : 'border-transparent text-slate-500'
//                   }`}
//                   onClick={() => setActiveTab('results')}
//                 >
//                   <Briefcase size={16} />
//                   Job Results
//                 </button>
//               </div>
//             </div>

//             {/* Steps */}
//             {activeTab === 'steps' && (
//               <div className="relative flex">
//                 <div className="w-6 relative" ref={progressRef}>
//                   <div
//                     className="ml-2 absolute top-0 left-[7px] w-[2px] bg-green-500 transition-all duration-700 ease-out"
//                     style={{ height: `${progressHeight}px` }}
//                   />
//                 </div>
//                 <div className="flex-1 space-y-6 pl-4">
//                   {steps.slice(0, stepIndex + 1).map((step, i) => (
//                     <div
//                       key={i}
//                       ref={i === stepIndex ? lastStepRef : null}
//                       className="mb-6 relative flex items-start gap-2"
//                     >
//                       {i === steps.length - 1 && stepIndex === steps.length - 1 && (
//                         <CheckCircle className="text-green-500 mt-[2px] animate-ping-slow" size={18} />
//                       )}
//                       <div>
//                         <div className="text-sm font-medium mb-1">{step.title}</div>
//                         {step.subtitle && <div className="text-xs text-slate-500">{step.subtitle}</div>}
//                         {step.thinkText && (
//                           <div className="mt-2 border border-slate-200 bg-white rounded-xl p-6 text-sm text-slate-700 shadow-sm max-h-[300px] min-h-[200px] w-full overflow-y-auto whitespace-pre-line leading-relaxed">
//                             {step.thinkText}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Job Results */}
//             {activeTab === 'results' && (
//               <div className="text-sm text-slate-800 space-y-6 leading-relaxed">
//                 {jobResults.map((job, idx) => (
//                   <div key={idx}>
//                     <p className="font-semibold mb-1">
//                       🧾 {idx + 1}. {job.title}
//                     </p>
//                     <p className="mb-1">
//                       <span className="font-medium text-blue-700">Match Score:</span> {job.score}%
//                     </p>
//                     <p className="font-medium mt-2">Why it's a good fit:</p>
//                     <ul className="list-disc pl-6">
//                       {job.fit.map((point, i) => (
//                         <li key={i}>{point}</li>
//                       ))}
//                     </ul>
//                     <p className="font-medium mt-2">Potential difficulties/mismatches:</p>
//                     <ul className="list-disc pl-6">
//                       {job.mismatch.map((point, i) => (
//                         <li key={i}>{point}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </main>

//         {/* Fixed Bottom Search */}
//         {activeTab === 'results' && (
//           <div className="fixed bottom-0 left-16 right-0 bg-gradient-to-t from-slate-50 via-slate-50/90 to-transparent px-6 py-4">
//             <div className="max-w-2xl mx-auto flex items-center gap-2">
//               <input
//                 type="text"
//                 value={searchInput}
//                 onChange={(e) => setSearchInput(e.target.value)}
//                 placeholder="Ask Profeshare something..."
//                 className="flex-1 px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
//               />
//               <button
//                 onClick={handleNewSearch}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition"
//               >
//                 Search
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




import { useState, useEffect, useRef } from 'react';
import {
  ListOrdered,
  Briefcase,
  Home,
  Search,
  User,
  ArrowLeft,
  CheckCircle,
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ResultsPage() {
  const [activeTab, setActiveTab] = useState<'steps' | 'results'>('steps');
  const [stepIndex, setStepIndex] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const lastStepRef = useRef<HTMLDivElement>(null);
  const [progressHeight, setProgressHeight] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState(location.state?.prompt || 'Your Search Prompt');

  const [searchInput, setSearchInput] = useState('');

  const sidebarItems = [
    { id: 'home', icon: Home, label: 'Home', route: '/' },
    { id: 'search', icon: Search, label: 'Search Jobs', route: '/' },
  ];

  const [sidebarTab, setSidebarTab] = useState('search');

  const handleNavigation = (id: string, route?: string) => {
    setSidebarTab(id);
    if (id === 'profile') {
      navigate('/profile');
    } else if (route) {
      navigate(route);
    }
  };

  const handleNewSearch = () => {
  if (searchInput.trim()) {
    setPrompt(searchInput);           // update prompt display at top
    setActiveTab('steps');            // switch to steps tab
    setStepIndex(0);                  // restart steps animation
    window.scrollTo({ top: 0, behavior: 'smooth' }); // optional: scroll to top
  }
};


  const steps = [
    { title: 'Student data loaded and interests set!', subtitle: 'Searching...' },
    {
      title: 'Loading and Indexing Jobs...',
      thinkText: `Alright, so I've got this query from a user who wants me to act as a career advisor and job matcher. They provided a JSON array of job postings and a student profile. My task is to analyze each job against the student's background and preferences, assign a match score, and present the results in a structured way.
First, I need to understand the student's profile. Rohan Kapoor has skills in JavaScript, React.js, Node.js, Express.js, MongoDB, Redux, HTML, CSS, REST APIs, and Tailwind CSS. His projects include a Task Manager Web App and an E-Commerce Website, both using the MERN stack. He also has an internship experience as a Frontend Developer at Webverse Labs. His certifications include a Full-Stack Web Development with MERN from freeCodeCamp and Modern React with Redux from Udemy.

Now, looking at the job postings, I need to match each one based on Rohan's skills, experience, and preferences. The job preferences mention he's looking for intern roles, both full-stack and frontend, preferably remote or in Bangalore, Pune, or Delhi NCR.

I'll start by analyzing each job:

Kreativstorm - Frontend Developer - Intern: This is a remote internship. Rohan's skills in React, Node, and frontend technologies are a good fit. His experience and projects align well, so this should have a high match score.

Quinstreet Software India - PHP Developer - Intern: This role requires PHP, which Rohan doesn't have. His skills are more in JavaScript and MERN stack, so this might be a lower match.

Edorbit - Backend Developer Intern: Focuses on backend with Java/Spring/Hibernate. Again, Rohan's experience is more frontend and full-stack with Node and Express, so not a perfect fit.

DR Enterprises - Java Developer Intern: Another backend Java role, which doesn't align with Rohan's skills.

Complyance - Full Stack Developer Intern: This is in Chennai, which isn't Rohan's preferred location. Plus, he prefers remote, so this might be a lower match.

EMO Energy - Full Stack Developer- Intern: 6-month internship with possible extension. Rohan's full-stack experience makes this a good fit.

Hubnex - Blockchain Developer Intern: Requires blockchain experience, which Rohan doesn't have, so this is a mismatch.

Tutar By Infusory - Full Stack (MERN) Developer Intern: Perfect fit as it's MERN stack, which Rohan specializes in.

Wijungle - Full - Stack Developer Intern: Mentions Linux programming, which isn't Rohan's strength, so lower match.

Kreativstorm - Software Engineer - Intern: Same company as the first job but in New Delhi. Rohan's location preference includes Delhi NCR, so this is a good fit.

After analyzing each job, I'll assign match scores based on how well Rohan's skills, experience, and preferences align. The highest scores will be for the MERN stack and frontend roles, especially those that are remote or in his preferred locations.

I need to ensure the output is structured with each job having a detailed breakdown of why it's a good fit and potential issues. The final list should be sorted from highest to lowest match score.

Finally, I'll present the findings in a clean, bullet-pointed format with emojis and bold headers for clarity.`
    },
    { title: 'Loaded and indexed jobs' },
  ];

  const jobResults = [
    {
      title: 'Kreativstorm – Frontend Developer - Intern',
      score: 94,
      fit: ['Frontend skills match', 'Remote preference met'],
      mismatch: ['Duration not specified'],
    },
    {
      title: 'Tutar – Full Stack (MERN) Developer Intern',
      score: 93,
      fit: ['MERN stack experience', 'Project alignment'],
      mismatch: ['Remote not mentioned'],
    },
    // Add more jobs if needed
    
      {
        title: 'InnovateX – React Frontend Developer Intern',
        score: 91,
        fit: ['Strong React skills', 'Frontend-focused projects', 'Remote option available'],
        mismatch: ['No backend exposure in this role'],
      },
      {
        title: 'CodeCatalyst – Full Stack Developer Intern',
        score: 90,
        fit: ['MERN experience', 'Previous full-stack projects', 'Startup environment'],
        mismatch: ['No mention of remote/hybrid flexibility'],
      },
      {
        title: 'AlphaTech – Frontend Intern (Tailwind + Redux)',
        score: 88,
        fit: ['Tailwind and Redux experience', 'Frontend focus', 'Good UI sense'],
        mismatch: ['Short 2-month duration'],
      },
      {
        title: 'ByteBridge – Software Engineer Intern (MERN)',
        score: 89,
        fit: ['MERN stack aligned', 'Built similar apps', 'Paid internship'],
        mismatch: ['No clear location preference match'],
      },
      {
        title: 'UrbanPixel – UI Developer Intern',
        score: 86,
        fit: ['UI/UX knowledge', 'Tailwind CSS expertise', 'Frontend profile'],
        mismatch: ['Minimal backend involvement'],
      },
      {
        title: 'StackHive – Full Stack Web Developer Intern',
        score: 92,
        fit: ['MERN + real-time experience (Socket.io)', 'Good match with Task Manager project'],
        mismatch: ['Requires familiarity with CI/CD tools'],
      },
      {
        title: 'DevSprint – Frontend Engineer Intern',
        score: 87,
        fit: ['Strong React base', 'Redux usage', 'Good UI work'],
        mismatch: ['In-office only (Delhi)'],
      },
      {
        title: 'BrightCode – Web Dev Intern (E-commerce)',
        score: 89,
        fit: ['E-commerce project match', 'Stripe API experience', 'Full stack exposure'],
        mismatch: ['3-month unpaid internship'],
      },
      {
        title: 'TechnoVerse – Junior Full Stack Intern',
        score: 90,
        fit: ['Node + MongoDB skills', 'REST API knowledge', 'Long-term internship'],
        mismatch: ['Requires familiarity with testing frameworks'],
      },
      {
        title: 'FusionLogics – Frontend Dev Intern',
        score: 85,
        fit: ['Frontend-heavy role', 'React and HTML/CSS usage', 'Focus on performance optimization'],
        mismatch: ['Location: Chennai (not preferred)'],
      },
      {
        title: 'LambdaStack – MERN Developer Intern',
        score: 93,
        fit: ['Perfect MERN alignment', 'Projects closely match job tasks', 'Remote-friendly'],
        mismatch: ['None'],
      }
    ]
    
  ;

  useEffect(() => {
    if (stepIndex < steps.length - 1) {
      const timeout = setTimeout(() => setStepIndex((prev) => prev + 1), 2000);
      return () => clearTimeout(timeout);
    }
  }, [stepIndex]);

  useEffect(() => {
    if (progressRef.current && lastStepRef.current) {
      const top = progressRef.current.getBoundingClientRect().top;
      const bottom = lastStepRef.current.getBoundingClientRect().bottom;
      setProgressHeight(bottom - top);
    }
  }, [stepIndex]);

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex w-full overflow-hidden">
      {/* Sidebar */}
      <div className="w-16 bg-white/80 backdrop-blur-sm border-r border-slate-200/60 flex flex-col items-center py-6 fixed top-0 bottom-0 left-0 z-40">
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
      <div className="ml-16 flex flex-col flex-1 relative">
        {/* Top Navbar */}
        <header className="h-16 bg-white/60 backdrop-blur-sm border-b border-slate-200/60 flex items-center justify-end px-6 fixed left-16 right-0 top-0 z-30">
          <div
            className="w-8 h-8 bg-gradient-to-br from-slate-300 to-slate-400 rounded-full flex items-center justify-center cursor-pointer hover:shadow-md transition-shadow duration-200"
            onClick={() => navigate('/profile')}
          >
            <User size={16} className="text-slate-600" />
          </div>
        </header>

        {/* Scrollable Inner Main Section */}
        <main className="pt-16 flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto px-6 pt-10 pb-32 w-full max-w-2xl mx-auto">
            {/* Go Back */}
            <button
              onClick={() => navigate('/', { state: { prompt } })}
              className="flex items-center text-slate-600 hover:text-blue-600 transition mb-6"
            >
              <ArrowLeft size={20} className="mr-1" />
              <span className="text-sm font-medium">Back to Edit Prompt</span>
            </button>

            {/* Tabs */}
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
                  Steps
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

            {/* Steps */}
            {activeTab === 'steps' && (
              <div className="relative flex">
                <div className="w-6 relative" ref={progressRef}>
                  <div
                    className="ml-2 absolute top-0 left-[7px] w-[2px] bg-green-500 transition-all duration-700 ease-out"
                    style={{ height: `${progressHeight}px` }}
                  />
                </div>
                <div className="flex-1 space-y-6 pl-4">
                  {steps.slice(0, stepIndex + 1).map((step, i) => (
                    <div
                      key={i}
                      ref={i === stepIndex ? lastStepRef : null}
                      className="mb-6 relative flex items-start gap-2"
                    >
                      {i === steps.length - 1 && stepIndex === steps.length - 1 && (
                        <CheckCircle className="text-green-500 mt-[2px] animate-ping-slow" size={18} />
                      )}
                      <div>
                        <div className="text-sm font-medium mb-1">{step.title}</div>
                        {step.subtitle && <div className="text-xs text-slate-500">{step.subtitle}</div>}
                        {step.thinkText && (
                          <div className="mt-2 border border-slate-200 bg-white rounded-xl p-6 text-sm text-slate-700 shadow-sm max-h-[300px] min-h-[200px] w-full overflow-y-auto whitespace-pre-line leading-relaxed">
                            {step.thinkText}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Job Results */}
            {activeTab === 'results' && (
              <div className="text-sm text-slate-800 space-y-6 leading-relaxed">
                {jobResults.map((job, idx) => (
                  <div key={idx}>
                    <p className="font-semibold mb-1">
                      🧾 {idx + 1}. {job.title}
                    </p>
                    <p className="mb-1">
                      <span className="font-medium text-blue-700">Match Score:</span> {job.score}%
                    </p>
                    <p className="font-medium mt-2">Why it's a good fit:</p>
                    <ul className="list-disc pl-6">
                      {job.fit.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                    <p className="font-medium mt-2">Potential difficulties/mismatches:</p>
                    <ul className="list-disc pl-6">
                      {job.mismatch.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>

        {/* Fixed Bottom Search */}
        {activeTab === 'results' && (
          <div className="fixed bottom-0 left-16 right-0 bg-gradient-to-t from-slate-50 via-slate-50/90 to-transparent px-6 py-4">
            <div className="max-w-2xl mx-auto flex items-center gap-2">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Ask Profeshare something..."
                className="flex-1 px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
              />
              <button
                onClick={handleNewSearch}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition"
              >
                Search
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


