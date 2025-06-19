
import { MapPin, Calendar, Building2, GraduationCap, Mail, Edit } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header Card */}
        <Card className="mb-6 overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
          <CardContent className="relative pt-0 pb-6">
            {/* Profile Picture */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 -mt-16">
              <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face" alt="Profile" />
                <AvatarFallback className="text-2xl">SA</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">
                      Sarah Anderson
                    </h1>
                    <p className="text-xl text-slate-600 mb-3">
                      Senior UI/UX Designer & Product Manager
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Building2 size={16} />
                        <span>TechCorp Solutions</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GraduationCap size={16} />
                        <span>Stanford University</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={16} />
                        <span>San Francisco, CA</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-blue-600 mb-4">
                      <Mail size={16} />
                      <span className="text-sm">sarah.anderson@email.com</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="gap-2">
                    <Edit size={16} />
                    Edit Profile
                  </Button>
                </div>
                
                <div className="text-slate-700 leading-relaxed">
                  <p>
                    Passionate UI/UX Designer with 6+ years of experience creating user-centered digital experiences. 
                    Specialized in design systems, mobile interfaces, and cross-functional collaboration.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Experience Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-slate-800">Experience</h2>
              <Button variant="ghost" size="sm" className="gap-2">
                <Edit size={16} />
                Edit
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Experience Item 1 */}
            <div className="flex gap-4 pb-6 border-b border-slate-200 last:border-b-0">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building2 size={20} className="text-white" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-semibold text-slate-800 mb-1">
                  Senior UI/UX Designer & Product Manager
                </h3>
                <p className="text-slate-600 font-medium mb-2">
                  TechCorp Solutions
                </p>
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>Jan 2022 - Present • 2 yrs 11 mos</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span>San Francisco, CA • Remote</span>
                  </div>
                </div>
                
                <div className="text-slate-700 leading-relaxed">
                  <p className="mb-3">
                    Leading design initiatives for enterprise SaaS products, managing a team of 4 designers and collaborating 
                    closely with product and engineering teams to deliver user-centered solutions.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Redesigned core dashboard resulting in 40% increase in user engagement</li>
                    <li>Established design system adopted across 5 product teams</li>
                    <li>Led user research initiatives with 200+ participants</li>
                    <li>Mentored junior designers and interns</li>
                  </ul>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {['Figma', 'Design Systems', 'User Research', 'Product Management', 'Team Leadership'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Experience Item 2 */}
            <div className="flex gap-4 pb-6 border-b border-slate-200 last:border-b-0">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building2 size={20} className="text-white" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-semibold text-slate-800 mb-1">
                  UI/UX Designer
                </h3>
                <p className="text-slate-600 font-medium mb-2">
                  DesignStudio Inc.
                </p>
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>Jun 2020 - Dec 2021 • 1 yr 7 mos</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span>New York, NY</span>
                  </div>
                </div>
                
                <div className="text-slate-700 leading-relaxed">
                  <p className="mb-3">
                    Designed mobile and web interfaces for fintech and e-commerce clients, focusing on conversion 
                    optimization and user experience improvements.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Increased client app conversion rates by 25% through UX optimization</li>
                    <li>Created wireframes and prototypes for 15+ client projects</li>
                    <li>Collaborated with developers to ensure pixel-perfect implementation</li>
                  </ul>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {['Sketch', 'Figma', 'Prototyping', 'Mobile Design', 'Web Design'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-green-50 text-green-700 text-xs rounded-full border border-green-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Experience Item 3 */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building2 size={20} className="text-white" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-semibold text-slate-800 mb-1">
                  Junior UI Designer
                </h3>
                <p className="text-slate-600 font-medium mb-2">
                  Creative Agency
                </p>
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>Aug 2018 - May 2020 • 1 yr 10 mos</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span>Los Angeles, CA</span>
                  </div>
                </div>
                
                <div className="text-slate-700 leading-relaxed">
                  <p className="mb-3">
                    Started my design career creating visual designs for digital marketing campaigns and brand identities 
                    for various clients in entertainment and lifestyle sectors.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Designed marketing materials for 20+ client campaigns</li>
                    <li>Created brand guidelines and visual identity systems</li>
                    <li>Collaborated with senior designers on large-scale projects</li>
                  </ul>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {['Adobe Creative Suite', 'Brand Design', 'Marketing Design', 'Visual Design'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-purple-50 text-purple-700 text-xs rounded-full border border-purple-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
