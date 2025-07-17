import { useState, useEffect, useRef } from 'react';
import { ListOrdered, Briefcase, ArrowLeft, CheckCircle, ExternalLink, MapPin, Building2, Star, Loader2, AlertTriangle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ApiResponse, JobResult } from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useStudent } from '@/contexts/StudentContext';
import { ApiService } from '@/services/api';
import { AppSidebar } from '@/components/ui/sidebar';

export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const prompt = location.state?.prompt || 'Your Search Prompt';
  const mode = location.state?.mode || 'deep';
  const { studentData } = useStudent();

  const [activeTab, setActiveTab] = useState<'steps' | 'results'>(mode === 'deep' ? 'steps' : 'results');
  const [stepIndex, setStepIndex] = useState(0);
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [apiDone, setApiDone] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [progressHeight, setProgressHeight] = useState(0);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  // Track expanded state for each job card by index
  const [expandedCards, setExpandedCards] = useState<{ [index: number]: boolean }>({});

  const handleExpand = (index: number) => {
    setExpandedCards((prev) => ({ ...prev, [index]: true }));
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
          interests: prompt,
          mode: mode
        };
        let res;
        if (mode === 'classical') {
          // Classical search: only MongoDB results
          const response = await fetch('https://v0001-google-production.up.railway.app/mongo-only', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request),
          });
          res = await response.json();
        } else {
          // Deep search: LLM analysis and MongoDB results
          res = await ApiService.searchJobs(request);
        }
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
  }, [prompt, studentData, mode]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (stepIndex < steps.length - 1) {
      timeout = setTimeout(() => setStepIndex((prev) => prev + 1), stepDuration);
    } else if (stepIndex === steps.length - 1 && apiDone) {
      // After API is done, show results first, then switch to steps tab
      timeout = setTimeout(() => {
        setActiveTab('results');
        setTimeout(() => setActiveTab('steps'), 1000);
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

  useEffect(() => {
    if (apiResponse && apiResponse.analysis) {
      // eslint-disable-next-line no-console
      console.log('LLM Analysis (raw):', apiResponse.analysis);
    }
  }, [apiResponse]);

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
    const expanded = !!expandedCards[index];

    // Strip HTML tags for word count, but keep HTML for rendering
    const plainText = job.jobDescription.replace(/<[^>]+>/g, '');
    const words = plainText.split(/\s+/);
    const wordLimit = 40;
    const isLong = words.length > wordLimit;
    const shortText = words.slice(0, wordLimit).join(' ') + (isLong ? '...' : '');

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
              className="relative text-sm text-slate-700 prose prose-sm max-w-none overflow-hidden"
              style={{ minHeight: '120px', maxHeight: expanded || !isLong ? 'none' : '120px' }}
            >
              <div
                dangerouslySetInnerHTML={{ __html: expanded || !isLong ? job.jobDescription : shortText }}
              />
              {isLong && !expanded && (
                <button
                  className="absolute bottom-2 right-2 text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                  onClick={() => handleExpand(index)}
                >
                  Read more
                </button>
              )}
              {isLong && expanded && (
                <button
                  className="absolute bottom-2 right-2 text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                  onClick={() => setExpandedCards((prev) => ({ ...prev, [index]: false }))}
                >
                  Collapse
                </button>
              )}
            </div>
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
      <AppSidebar activeTab="search" />
      {/* Main Content - Add margin to account for fixed sidebar */}
      <div className="flex-1 flex flex-col ml-16">
        <header className="h-16 bg-white/60 backdrop-blur-sm border-b border-slate-200/60 flex items-center justify-end px-6">
          {/* Removed profile icon */}
        </header>

        <main className="flex-1 px-6 pt-10 pb-16 w-full max-w-4xl mx-auto overflow-y-auto">
          <button
            onClick={() => navigate('/', { state: { prompt } })}
            className="flex items-center text-slate-600 hover:text-blue-600 transition mb-6"
          >
            <ArrowLeft size={20} className="mr-1" />
            <span className="text-sm font-medium">Back to Search</span>
          </button>

          <div className="text-left mb-6 pl-4">
            <div className="text-3xl font-light text-slate-800 mb-8 -mt-2">{prompt}</div>
            {mode === 'deep' && (
              <div className="flex space-x-6 border-b border-slate-200">
                {apiResponse && (
                  <button
                    className={`pb-1 border-b-2 text-sm font-medium flex items-center gap-1 ${
                      activeTab === 'results' ? 'border-black text-black' : 'border-transparent text-slate-500'
                    }`}
                    onClick={() => setActiveTab('results')}
                  >
                    <Briefcase size={16} />
                    Job Results
                  </button>
                )}
                <button
                  className={`pb-1 border-b-2 text-sm font-medium flex items-center gap-1 ${
                    activeTab === 'steps' ? 'border-black text-black' : 'border-transparent text-slate-500'
                  }`}
                  onClick={() => setActiveTab('steps')}
                >
                  <ListOrdered size={16} />
                  Thinking
                </button>
              </div>
            )}
          </div>

          {/* Loader for classical search */}
          {mode === 'classical' && !apiDone && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="animate-spin text-blue-500 mb-4" size={48} />
              <div className="text-lg font-medium text-slate-700">Fetching jobs...</div>
            </div>
          )}
          {/* Show results for classical search */}
          {mode === 'classical' && apiDone && apiResponse && apiResponse.mongodb_result && apiResponse.mongodb_result.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-slate-800 mb-6">
                Job Matches Found
              </h2>
              {apiResponse.mongodb_result.map((job, index) => renderJobCard(job, index))}
            </div>
          )}
          {/* Deep search: show tabs and stepper/results as before */}
          {mode === 'deep' && apiResponse && activeTab === 'results' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-slate-800 mb-6">
                Job Matches Found
              </h2>
              {/* LLM Analysis Cards (only for deep search) */}
              {(() => {
                let analysisArr: any[] = [];
                let error: string | null = null;
                let rawAnalysis: any = null;
                try {
                  let analysis = apiResponse.analysis;
                  rawAnalysis = analysis; // Store raw analysis for fallback
                  if (typeof analysis === 'string') {
                    try {
                      analysis = JSON.parse(analysis);
                    } catch {
                      analysis = JSON.parse(JSON.parse(analysis));
                    }
                  }
                  if (Array.isArray(analysis)) {
                    analysisArr = analysis;
                  } else {
                    error = 'Analysis is not an array.';
                  }
                } catch (e: any) {
                  error = 'Failed to parse LLM analysis: ' + (e.message || e);
                }
                if (error) {
                  return (
                    <div className="mb-6">
                      <div className="bg-red-100 text-red-700 rounded-lg p-4 border border-red-300 font-semibold mb-4">
                        {error}
                      </div>
                      <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 border border-slate-300 dark:border-slate-600">
                        <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Raw LLM Output:</h3>
                        <pre className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap overflow-x-auto">
                          {typeof rawAnalysis === 'string' ? rawAnalysis : JSON.stringify(rawAnalysis, null, 2)}
                        </pre>
                      </div>
                    </div>
                  );
                }
                if (!analysisArr.length) {
                  return (
                    <div className="mb-6">
                      <div className="bg-yellow-100 text-yellow-700 rounded-lg p-4 border border-yellow-300 font-semibold mb-4">
                        No LLM analysis results found.
                      </div>
                      <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 border border-slate-300 dark:border-slate-600">
                        <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Raw LLM Output:</h3>
                        <pre className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap overflow-x-auto">
                          {typeof rawAnalysis === 'string' ? rawAnalysis : JSON.stringify(rawAnalysis, null, 2)}
                        </pre>
                      </div>
                    </div>
                  );
                }
                return (
                  <div className="mb-6 flex flex-col gap-8">
                    {analysisArr.map((item, idx) => (
                      <Card
                        key={idx}
                        className="shadow-2xl border-2 border-blue-400/80 bg-white/95 dark:bg-[#232328] dark:border-blue-500/80 rounded-2xl px-8 py-8 transition-transform hover:scale-[1.02] hover:shadow-blue-200 dark:hover:shadow-blue-900"
                      >
                        <CardHeader className="mb-2">
                          <div className="flex items-center gap-4 mb-4">
                            <Building2 className="text-blue-700 dark:text-blue-400" size={32} />
                            <span className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">{item.company_name}</span>
                          </div>
                          <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300 mb-4">
                            <Briefcase size={22} />
                            <span className="text-xl font-semibold">{item.job_role}</span>
                          </div>
                          <div className="flex items-center gap-3 mb-4">
                            <Star size={28} className="text-yellow-400" fill="#facc15" />
                            <span className="font-semibold text-xl text-slate-800 dark:text-slate-200">Match Score:</span>
                            <span className="text-2xl font-extrabold text-blue-700 dark:text-blue-400">{item.match_score}</span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="mb-6">
                            <div className="font-bold text-green-700 dark:text-green-400 flex items-center gap-3 mb-2 text-lg">
                              <CheckCircle size={20} /> Strengths
                            </div>
                            <ul className="list-disc pl-8 space-y-2">
                              {item.strengths && item.strengths.length > 0 ? item.strengths.map((s: string, i: number) => (
                                <li key={i} className="text-slate-800 dark:text-slate-200 text-base flex items-start gap-2">
                                  <span className="mt-0.5"><CheckCircle size={16} className="text-green-500 dark:text-green-400" /></span> {s}
                                </li>
                              )) : <li className="text-slate-400 italic">None listed</li>}
                            </ul>
                          </div>
                          <div>
                            <div className="font-bold text-red-700 dark:text-red-400 flex items-center gap-3 mb-2 text-lg">
                              <AlertTriangle size={20} /> Weaknesses
                            </div>
                            <ul className="list-disc pl-8 space-y-2">
                              {item.weakness && item.weakness.length > 0 ? item.weakness.map((w: string, i: number) => (
                                <li key={i} className="text-slate-800 dark:text-slate-200 text-base flex items-start gap-2">
                                  <span className="mt-0.5"><AlertTriangle size={16} className="text-red-500 dark:text-red-400" /></span> {w}
                                </li>
                              )) : <li className="text-slate-400 italic">None listed</li>}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                );
              })()}
            </div>
          )}
          {/* Thinking steps (only for deep search) */}
          {mode === 'deep' && activeTab === 'steps' && (
            <div className="relative flex max-h-[70vh] overflow-y-auto pr-2">
              {/* Vertical thread line */}
              <div className="w-6 relative" ref={progressRef}>
                <div
                  className="absolute top-2 left-1/2 -translate-x-1/2 w-[2px] bg-green-500 transition-all duration-700 ease-out"
                  style={{ height: `${progressHeight}px` }}
                />
              </div>
              {/* Steps with aligned dots */}
              <div className="flex-1 space-y-6 pl-4">
                {steps.map((step, i) => (
                  // Only render steps up to and including the current step
                  i <= stepIndex ? (
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
                  ) : null
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
