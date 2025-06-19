
import { Search, Home, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const Index = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const navigate = useNavigate();

  const handleSearch = () => {
    try {
      JSON.parse(jsonInput);
      console.log('Valid JSON input:', jsonInput);
      // Handle search logic here
    } catch (error) {
      console.error('Invalid JSON format');
    }
  };

  const handleNavigation = (itemId: string) => {
    setActiveTab(itemId);
    if (itemId === 'profile') {
      navigate('/profile');
    }
    // Only navigate to profile when explicitly clicking profile in sidebar
    // Remove automatic navigation, let users stay on homepage
  };

  const sidebarItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'search', icon: Search, label: 'Search Jobs' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex w-full">
      {/* Left Sidebar */}
      <div className="w-16 bg-white/80 backdrop-blur-sm border-r border-slate-200/60 flex flex-col items-center py-6">
        {/* Logo */}
        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center mb-6">
          <div className="w-4 h-4 bg-white rounded-sm"></div>
        </div>
        
        {/* Navigation Items */}
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

        {/* Profile Icon at Bottom */}
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

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-16 bg-white/60 backdrop-blur-sm border-b border-slate-200/60 flex items-center justify-end px-6">
          <div 
            className="w-8 h-8 bg-gradient-to-br from-slate-300 to-slate-400 rounded-full flex items-center justify-center cursor-pointer hover:shadow-md transition-shadow duration-200"
            onClick={() => navigate('/profile')}
          >
            <User size={16} className="text-slate-600" />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="w-full max-w-2xl">
            {/* Logo and Title */}
            <div className="text-center mb-12">
              <h1 className="text-6xl font-light text-slate-800 mb-4 tracking-tight">
                profeshare
              </h1>
              <p className="text-slate-600 text-lg font-light">
                Find your perfect job match with AI-powered precision
              </p>
            </div>

            {/* Search Box */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-xl p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Describe your skills and preferences
                </label>
                <Textarea
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  placeholder={`Find your desired Jobs`}
                  className="min-h-[10px] font-mono text-sm resize-none border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm text-slate-600">Ready to search</span>
                </div>
                
                <Button 
                  onClick={handleSearch}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  <Search size={18} className="mr-2" />
                  Find Jobs
                </Button>
              </div>
            </div>

            {/* Sample JSON Examples */}
            <div className="mt-8 text-center">
              <p className="text-sm text-slate-500 mb-4">Try these examples:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  'Software Engineer',
                  'Data Scientist', 
                  'Product Manager',
                  'UX Designer'
                ].map((role) => (
                  <button
                    key={role}
                    onClick={() => setJsonInput(`{
  "role": "${role}",
  "experience": "2-4 years",
  "location": "Remote"
}`)}
                    className="px-4 py-2 bg-white/60 backdrop-blur-sm border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-white hover:shadow-md transition-all duration-200"
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;