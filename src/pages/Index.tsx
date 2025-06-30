import { useState } from 'react';
import { Send, Sparkles, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useNavigate } from 'react-router-dom';
import { useStudent } from '@/contexts/StudentContext';
import { ApiService } from '@/services/api';
import { AppSidebar } from '@/components/ui/sidebar';

export default function Index() {
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeepResearch, setIsDeepResearch] = useState(true);
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

  const handleSubmit = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    try {
      navigate('/results', {
        state: {
          prompt: input,
          mode: isDeepResearch ? 'deep' : 'classical'
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
          prompt: suggestion,
          mode: isDeepResearch ? 'deep' : 'classical'
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
      <AppSidebar activeTab="home" />
      {/* Main content */}
      <div className="flex-1 flex flex-col ml-16">
        {/* Header */}
        <header className="h-16 bg-white/60 backdrop-blur-sm border-b border-slate-200/60 flex items-center justify-end px-6">
          {/* Removed profile icon */}
        </header>

        {/* Centered Hero Section */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 pb-16 mt-[-120px]">
          <div className="flex flex-col items-center text-center w-full max-w-3xl">
            <h1 className="text-[56px] font-light text-slate-800 mb-3 tracking-tight">profeshare</h1>
            <p className="text-slate-600 mb-10 text-lg">Find your perfect job match with AI-powered precision</p>

            {/* Search Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-xl p-6 w-full relative">
              {/* Search Mode Toggle */}
              <div className="flex justify-end mb-4">
                <div className="flex items-center gap-3 bg-slate-100/80 rounded-lg p-2">
                  <div className="flex items-center gap-2">
                    <Database className={`${!isDeepResearch ? 'text-blue-600' : 'text-slate-500'}`} size={16} />
                    <span className={`text-sm font-medium ${!isDeepResearch ? 'text-blue-600' : 'text-slate-500'}`}>Classical Search</span>
                  </div>
                  <Switch
                    checked={isDeepResearch}
                    onCheckedChange={setIsDeepResearch}
                    className="data-[state=checked]:bg-blue-600 mx-2"
                  />
                  <div className="flex items-center gap-2">
                    <Sparkles className={`${isDeepResearch ? 'text-blue-600' : 'text-slate-500'}`} size={16} />
                    <span className={`text-sm font-medium ${isDeepResearch ? 'text-blue-600' : 'text-slate-500'}`}>Deep Search</span>
                  </div>
                </div>
              </div>

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
