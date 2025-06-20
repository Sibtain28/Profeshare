// import { Search, Home, User, Send } from 'lucide-react';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Textarea } from '@/components/ui/textarea';

// const Index = () => {
//   const [jsonInput, setJsonInput] = useState('');
//   const [activeTab, setActiveTab] = useState('home');
//   const navigate = useNavigate();

//   const handleSearch = () => {
//     try {
//       JSON.parse(jsonInput);
//       console.log('Valid JSON input:', jsonInput);
//       // Handle search logic here
//     } catch (error) {
//       console.error('Invalid JSON format');
//     }
//   };

//   const handleNavigation = (itemId: string) => {
//     setActiveTab(itemId);
//     if (itemId === 'profile') {
//       navigate('/profile');
//     }
//   };

//   const sidebarItems = [
//     { id: 'home', icon: Home, label: 'Home' },
//     { id: 'search', icon: Search, label: 'Search Jobs' },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex w-full">
//       {/* Left Sidebar */}
//       <div className="w-16 bg-white/80 backdrop-blur-sm border-r border-slate-200/60 flex flex-col items-center py-6">
//         {/* Logo */}
//         <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center mb-6">
//           <div className="w-4 h-4 bg-white rounded-sm"></div>
//         </div>

//         {/* Navigation Items */}
//         <nav className="flex flex-col space-y-4 flex-1">
//           {sidebarItems.map((item) => (
//             <button
//               key={item.id}
//               onClick={() => handleNavigation(item.id)}
//               className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
//                 activeTab === item.id
//                   ? 'bg-blue-100 text-blue-600 shadow-sm'
//                   : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
//               }`}
//               title={item.label}
//             >
//               <item.icon size={20} />
//             </button>
//           ))}
//         </nav>

//         {/* Profile Icon at Bottom */}
//         <button
//           onClick={() => handleNavigation('profile')}
//           className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
//             activeTab === 'profile'
//               ? 'bg-blue-100 text-blue-600 shadow-sm'
//               : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
//           }`}
//           title="Profile"
//         >
//           <User size={20} />
//         </button>
//       </div>

//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col">
//         {/* Top Bar */}
//         <header className="h-16 bg-white/60 backdrop-blur-sm border-b border-slate-200/60 flex items-center justify-end px-6">
//           <div
//             className="w-8 h-8 bg-gradient-to-br from-slate-300 to-slate-400 rounded-full flex items-center justify-center cursor-pointer hover:shadow-md transition-shadow duration-200"
//             onClick={() => navigate('/profile')}
//           >
//             <User size={16} className="text-slate-600" />
//           </div>
//         </header>

//         {/* Main Content */}
//         <main className="flex-1 flex items-center justify-center px-6">
//           <div className="w-full max-w-2xl">
//             {/* Logo and Title */}
//             <div className="text-center mb-12">
//               <h1 className="text-6xl font-light text-slate-800 mb-4 tracking-tight">
//                 profeshare
//               </h1>
//               <p className="text-slate-600 text-lg font-light">
//                 Find your perfect job match with AI-powered precision
//               </p>
//             </div>

//             {/* Search Box */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-xl p-6">
//               <label className="block text-sm font-medium text-slate-700 mb-2">
//                 Describe your skills and preferences
//               </label>

//               <div className="flex items-center space-x-2">
//                 <Textarea
//                   value={jsonInput}
//                   onChange={(e) => setJsonInput(e.target.value)}
//                   placeholder={`Find your desired Jobs`}
//                   className="min-h-[40px] max-h-[40px] font-mono text-sm resize-none border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100  transition-all duration-200 flex-1"
//                 />

//                 <Button
//                   size="icon"
//                   onClick={handleSearch}
//                   className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl  transition-all duration-200"
//                 >
//                   <Send size={18} />
//                 </Button>
//               </div>
//             </div>

//             {/* Sample JSON Examples */}
//             <div className="mt-8 text-center">
//               <p className="text-sm text-slate-500 mb-4">Try these examples:</p>
//               <div className="flex flex-wrap gap-2 justify-center">
//                 {['Software Engineer', 'Data Scientist', 'Product Manager', 'UX Designer'].map((role) => (
//                   <button
//                     key={role}
//                     onClick={() =>
//                       setJsonInput(`{
//   "role": "${role}",
//   "experience": "2-4 years",
//   "location": "Remote"
// }`)}
//                     className="px-4 py-2 bg-white/60 backdrop-blur-sm border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-white hover:shadow-md transition-all duration-200"
//                   >
//                     {role}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Index;


import { Search, Home, User, Send } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const Index = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [status, setStatus] = useState<'idle' | 'processing' | 'loaded'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const navigate = useNavigate();

  const handleSearch = () => {
    try {
      JSON.parse(jsonInput);
      setStatus('processing');
      setStatusMessage('✅ Student data loaded and interests set!');

      setTimeout(() => {
        setStatusMessage('🚀 Loading and Indexing Jobs...');
        setTimeout(() => {
          setStatusMessage('✅ Loaded and indexed jobs');
          setTimeout(() => {
            setResults([
              {
                title: 'Frontend Developer - Intern',
                company: 'Kreativstorm',
                match: 94,
                goodFit: [
                  'Strong frontend skills (React.js, JavaScript, HTML, CSS, Tailwind CSS)',
                  'Experience at Webverse Labs and UI component projects',
                  'Remote internship matches preference',
                ],
                mismatches: ['Job posting does not specify internship duration'],
              },
              {
                title: 'Full Stack (MERN) Developer Intern',
                company: 'Tutar By Infusory',
                match: 93,
                goodFit: [
                  'Expertise in the MERN stack',
                  'Projects in E-Commerce & Task Manager',
                  'Mentioned MERN stack experience explicitly',
                ],
                mismatches: ['No clear mention of remote work'],
              },
              {
                title: 'Backend Developer Intern',
                company: 'Edorbit',
                match: 25,
                goodFit: [
                  'Backend experience (Node.js, Express.js, MongoDB)',
                  'Certificate of internship offered',
                ],
                mismatches: [
                  'Doesn’t clearly match frontend or full-stack preference',
                ],
              },
            ]);
            setStatus('loaded');
          }, 1000);
        }, 1500);
      }, 1500);
    } catch (error) {
      console.error('Invalid JSON format');
      setStatusMessage('❌ Invalid JSON format!');
      setStatus('idle');
    }
  };

  const handleNavigation = (itemId: string) => {
    setActiveTab(itemId);
    if (itemId === 'profile') {
      navigate('/profile');
    }
  };

  const sidebarItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'search', icon: Search, label: 'Search Jobs' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex w-full">
      {/* Sidebar */}
      <div className="w-16 bg-white/80 backdrop-blur-sm border-r border-slate-200/60 flex flex-col items-center py-6">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center mb-6">
          <div className="w-4 h-4 bg-white rounded-sm"></div>
        </div>

        <nav className="flex flex-col space-y-4 flex-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                activeTab === item.id
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
            activeTab === 'profile'
              ? 'bg-blue-100 text-blue-600 shadow-sm'
              : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
          }`}
          title="Profile"
        >
          <User size={20} />
        </button>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white/60 backdrop-blur-sm border-b border-slate-200/60 flex items-center justify-end px-6">
          <div
            className="w-8 h-8 bg-gradient-to-br from-slate-300 to-slate-400 rounded-full flex items-center justify-center cursor-pointer hover:shadow-md transition-shadow duration-200"
            onClick={() => navigate('/profile')}
          >
            <User size={16} className="text-slate-600" />
          </div>
        </header>

        <main className="flex-1 px-6">
  {/* Centered Hero Section */}
  <div className="w-full max-w-2xl mx-auto flex flex-col justify-center items-center min-h-[60vh] space-y-8">
    <div className="text-center">
      <h1 className="text-6xl font-light text-slate-800 mb-4 tracking-tight">
        profeshare
      </h1>
      <p className="text-slate-600 text-lg font-light">
        Find your perfect job match with AI-powered precision
      </p>
    </div>

    {/* Search Input Box */}
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-xl p-6 w-full">
      <label className="block text-sm font-medium text-slate-700 mb-2">
        Describe your skills and preferences
      </label>

      <div className="flex items-center space-x-2">
        <Textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder={`Find your desired Jobs`}
          className="min-h-[40px] max-h-[40px] font-mono text-sm resize-none border-slate-200 focus:border-blue-400 focus:ring-0 transition-all duration-200 flex-1"
        />

        <Button
          size="icon"
          onClick={handleSearch}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Send size={18} />
        </Button>
      </div>
    </div>

    {/* Status Message */}
    {status !== 'idle' && (
      <div className="text-sm text-slate-700 bg-white/60 px-4 py-2 rounded-lg shadow border border-slate-200">
        {statusMessage}
      </div>
    )}
  </div>

  {/* Results Section */}
  {status === 'loaded' && (
    <div className="w-full max-w-2xl mx-auto space-y-6 pb-16">
      <h2 className="text-xl font-semibold text-slate-800 mt-8">
        🎯 Match Scores and Job Breakdown
      </h2>
      {results.map((job, i) => (
        <div
          key={i}
          className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-slate-200 shadow"
        >
          <h3 className="font-medium text-slate-800 mb-1">
            🧾 {job.company} – {job.title}
          </h3>
          <p className="text-sm text-blue-600 font-medium mb-2">
            Match Score: {job.match}%
          </p>
          <div className="text-sm text-slate-700 mb-2">
            <p className="font-semibold">Why it's a good fit:</p>
            <ul className="list-disc list-inside space-y-1">
              {job.goodFit.map((point: string, idx: number) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>
          {job.mismatches?.length > 0 && (
            <div className="text-sm text-slate-600 mt-2">
              <p className="font-semibold">Potential difficulties/mismatches:</p>
              <ul className="list-disc list-inside space-y-1">
                {job.mismatches.map((point: string, idx: number) => (
                  <li key={idx}>{point}</li>
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
};

export default Index;

