import { useState } from 'react';
import { Send, Home, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useStudent } from '@/contexts/StudentContext';
import { ApiService } from '@/services/api';

export default function Index() {
  const [input, setInput] = useState('');
  const [sidebarTab, setSidebarTab] = useState('home');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { studentData } = useStudent();

  const suggestions = [
    "I want a fulltime backend role in Bangalore",
    "Looking for a remote frontend job in React",
    "I want a fullstack developer job in Delhi",
    "Searching for a UI/UX design role in Mumbai",
    "I'm interested in a data scientist position in Hyderabad",
    "Find me a machine learning job in Pune",
    "I want a part-time product manager role in Gurgaon",
    "Looking for a remote software engineering opportunity",
    "I want a fulltime DevOps engineer job in Noida",
    "Seeking an AI/ML role in Bangalore with 2+ years experience",
    "Find me a remote MERN stack job",
    "Searching for a junior backend developer role in Chennai",
    "I want a software engineering internship in India",
    "Looking for a fullstack internship in a startup",
    "Searching for remote Python backend jobs",
    "Show me jobs for a Java developer in Pune",
    "I'm interested in cloud engineering roles in Bangalore",
    "I want a system design-heavy backend role",
    "Find me a senior frontend job in a product-based company",
    "I want a remote job as a Next.js developer"
  ];

  const filteredSuggestions = suggestions.filter(
    (suggestion) =>
      input.length > 0 &&
      suggestion.toLowerCase().includes(input.toLowerCase())
  );

  const navigate = useNavigate();

  const sidebarItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'search', icon: Search, label: 'Search Jobs' },
    { id: 'student-profile', icon: User, label: 'Student Profile' },
  ];

  const handleNavigation = (id: string) => {
    setSidebarTab(id);
    if (id === 'profile') {
      navigate('/profile');
    } else if (id === 'student-profile') {
      navigate('/student-profile');
    }
  };

  const handleSubmit = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    try {
      // Only navigate with prompt, do not pass apiPromise
      navigate('/results', {
        state: {
          prompt: input
        }
      });
    } catch (error) {
      console.error('Search failed:', error);
      alert('Failed to search for jobs. Please try again.');
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = async (suggestion: string) => {
    setInput(suggestion);
    setShowSuggestions(false);

    setIsLoading(true);
    try {
      navigate('/results', {
        state: {
          prompt: suggestion
        }
      });
    } catch (error) {
      console.error('Search failed:', error);
      alert('Failed to search for jobs. Please try again.');
      setIsLoading(false);
    }
  };

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
              onClick={() => handleNavigation(item.id)}
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

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white/60 backdrop-blur-sm border-b border-slate-200/60 flex items-center justify-end px-6">
          <div
            className="w-8 h-8 bg-gradient-to-br from-slate-300 to-slate-400 rounded-full flex items-center justify-center cursor-pointer hover:shadow-md transition-shadow duration-200"
            onClick={() => navigate('/profile')}
          >
            <User size={16} className="text-slate-600" />
          </div>
        </header>

        {/* Centered Hero Section */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 pb-16 mt-[-120px]">
          <div className="flex flex-col items-center text-center w-full max-w-3xl">
            <h1 className="text-[56px] font-light text-slate-800 mb-3 tracking-tight">profeshare</h1>
            <p className="text-slate-600 mb-10 text-lg">Find your perfect job match with AI-powered precision</p>

            {/* Search Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-xl p-6 w-full relative">
              <label className="block text-left text-sm font-medium text-slate-700 mb-2">
                Describe your skills and preferences
              </label>

              {/* Search input and send button */}
              <div className="relative">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Find your desired Jobs"
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm font-mono focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSubmit}
                    size="icon"
                    className="bg-blue-600 hover:bg-blue-700 rounded-full text-white"
                    disabled={isLoading || !input.trim()}
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Send size={18} />
                    )}
                  </Button>
                </div>

                {/* Suggestions dropdown */}
                {showSuggestions && filteredSuggestions.length > 0 && !isLoading && (
                  <ul
                    className="absolute left-0 top-full mt-2 w-full bg-white border border-slate-200 rounded-md shadow-md max-h-56 overflow-auto z-10"
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {filteredSuggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 cursor-pointer text-left"
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
