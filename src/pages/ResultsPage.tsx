import { useState, useEffect, useRef } from 'react';
import { ListOrdered, Briefcase, Home, Search, User, ArrowLeft, CheckCircle, ExternalLink, MapPin, Building2, Star, Loader2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ApiResponse, JobResult } from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useStudent } from '@/contexts/StudentContext';
import { ApiService } from '@/services/api';

export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const prompt = location.state?.prompt || 'Your Search Prompt';
  const { studentData } = useStudent();

  const [activeTab, setActiveTab] = useState<'steps' | 'results'>('steps');
  const [stepIndex, setStepIndex] = useState(0);
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [apiDone, setApiDone] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [progressHeight, setProgressHeight] = useState(0);

  const sidebarItems = [
    { id: 'home', icon: Home, label: 'Home', route: '/' },
    { id: 'search', icon: Search, label: 'Search Jobs', route: '/' },
    { id: 'student-profile', icon: User, label: 'Student Profile', route: '/student-profile' },
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

  // Step durations: 25s for first 4, last step waits for API
  const stepDuration = 25000; // ms

  // Start API call on mount
  useEffect(() => {
    let cancelled = false;
    async function fetchJobs() {
      try {
        const request = {
          intern_name: `${studentData.first_name} ${studentData.last_name}`,
          students: [studentData],
          interests: prompt
        };
        const res = await ApiService.searchJobs(request);
        if (!cancelled) {
          setApiResponse(res);
          setApiDone(true);
        }
      } catch (e) {
        if (!cancelled) setApiDone(true);
      }
    }
    fetchJobs();
    return () => { cancelled = true; };
  }, [prompt, studentData]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (stepIndex < steps.length - 1) {
      timeout = setTimeout(() => setStepIndex((prev) => prev + 1), stepDuration);
    } else if (stepIndex === steps.length - 1 && apiDone) {
      // After API is done, pop the last step and show results
      timeout = setTimeout(() => {
        setActiveTab('results');
      }, 1000);
    }
    return () => clearTimeout(timeout);
  }, [stepIndex, apiDone]);

  useEffect(() => {
    if (progressRef.current && stepRefs.current[stepIndex]) {
      const top = progressRef.current.getBoundingClientRect().top;
      const bottom = stepRefs.current[stepIndex]!.getBoundingClientRect().top + 6;
      setProgressHeight(bottom - top);
    }
  }, [stepIndex]);

  const formatScore = (score: number) => {
    return Math.round(score);
  };

  const getMatchStrength = (score: number) => {
    if (score >= 30) return { stars: 5, color: 'text-green-600', label: 'Excellent Match' };
    if (score >= 25) return { stars: 4, color: 'text-blue-600', label: 'Very Good Match' };
    if (score >= 20) return { stars: 3, color: 'text-yellow-600', label: 'Good Match' };
    if (score >= 15) return { stars: 2, color: 'text-orange-600', label: 'Fair Match' };
    return { stars: 1, color: 'text-red-600', label: 'Basic Match' };
  };

  const renderJobCard = (job: JobResult, index: number) => {
    const matchInfo = getMatchStrength(job.score);
    
    return (
      <Card key={index} className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
              <div className="flex items-center gap-2 text-slate-600 mb-2">
                <Building2 size={16} />
                <span className="font-medium">{job.companyName}</span>
                <span>•</span>
                <MapPin size={16} />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${i < matchInfo.stars ? matchInfo.color : 'text-slate-300'}`}
                      fill={i < matchInfo.stars ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
                <Badge variant="secondary" className={matchInfo.color}>
                  {matchInfo.label} ({formatScore(job.score)}%)
                </Badge>
              </div>
            </div>
            <a
              href={job.jdURL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              <ExternalLink size={20} />
            </a>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h4 className="font-semibold text-slate-800 mb-2">Job Description</h4>
            <div 
              className="text-sm text-slate-700 prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: job.jobDescription }}
            />
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-800 mb-2">Skills & Tags</h4>
            <div className="flex flex-wrap gap-2">
              {job.tagsAndSkills && job.tagsAndSkills.trim() ? (
                job.tagsAndSkills.split(',').map((skill, skillIndex) => (
                  <Badge key={skillIndex} variant="outline" className="text-xs">
                    {skill.trim()}
                  </Badge>
                ))
              ) : (
                <span className="text-xs text-slate-400 italic">Field missing</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
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

        <main className="flex-1 px-6 pt-10 pb-16 w-full max-w-4xl mx-auto overflow-y-auto">
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
                {steps.map((step, i) => (
                  <div
                    key={i}
                    ref={(el) => (stepRefs.current[i] = el)}
                    className="mb-6 relative flex items-start gap-3"
                  >
                    {/* Dot aligned on the line */}
                    <div
                      className="absolute left-[-35px] top-[6px] w-3 h-3 rounded-full z-10"
                      style={{ background: i < stepIndex || (i === steps.length - 1 && apiDone) ? '#22c55e' : '#ccc' }}
                    />
                    <div>
                      <div className={`text-sm font-medium mb-1 flex items-center gap-2 ${i === steps.length - 1 ? 'ml-4' : ''}`}>{step.title}
                        {/* Icon logic: show only one at a time, now at the end of the text */}
                        {((i === stepIndex && i < steps.length - 1) || (i === steps.length - 1 && stepIndex === steps.length - 1 && !apiDone)) ? (
                          <Loader2 className="ml-2 animate-spin text-blue-500 z-20" size={18} />
                        ) : (i < stepIndex || (i === steps.length - 1 && apiDone)) ? (
                          <CheckCircle className="ml-2 text-green-500 z-20" size={18} />
                        ) : null}
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
            <div className="space-y-6">
              {apiResponse ? (
                <>
                  {/* AI Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Briefcase size={20} />
                        AI Analysis & Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose prose-sm max-w-none text-slate-700">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{apiResponse.analysis}</ReactMarkdown>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Job Results */}
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-800 mb-6">
                      Job Matches ({apiResponse.mongodb_result.length} results)
                    </h2>
                    {apiResponse.mongodb_result.map((job, index) => renderJobCard(job, index))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-slate-600">No job results available. Please try searching again.</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
