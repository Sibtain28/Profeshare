import { MapPin, Calendar, Building2, GraduationCap, Mail, ArrowLeft, ExternalLink, Code, Award } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useStudent } from '@/contexts/StudentContext';

const Profile = () => {
  const navigate = useNavigate();
  const { studentData } = useStudent();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-slate-600 hover:text-blue-600 transition mb-6"
        >
          <ArrowLeft size={20} className="mr-1" />
          <span className="text-sm font-medium">Back</span>
        </button>

        {/* Header Card */}
        <Card className="mb-6 overflow-hidden">
          <div className="h-22 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
          <CardContent className="pt-6 pb-6">
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Avatar at top-left */}
              <div className="flex-shrink-0">
                <Avatar className="w-32 h-32 border-4 border-white shadow-md">
                  <AvatarImage
                    src={studentData.profile_image}
                    alt={`${studentData.first_name} ${studentData.last_name}`}
                  />
                  <AvatarFallback className="text-2xl">
                    {studentData.first_name[0]}{studentData.last_name[0]}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Profile Info */}
              <div className="flex-1 min-w-0">
                <h1 className="text-3xl font-semibold text-slate-800 mb-1">
                  {studentData.first_name} {studentData.last_name}
                </h1>
                <p className="text-base text-slate-600 mb-2">Student ID: {studentData.student_id}</p>

                <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-2">
                  <div className="flex items-center gap-1">
                    <GraduationCap size={14} />
                    <span>Student</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span>{studentData.job_preferences.preferred_locations.join(', ')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-blue-600 text-sm">
                  <Mail size={14} />
                  <span>{studentData.email}</span>
                </div>

                <p className="mt-4 text-slate-700 text-sm leading-relaxed">
                  Passionate student with expertise in {studentData.skills.slice(0, 3).join(', ')} and more. 
                  Seeking opportunities in {studentData.job_preferences.desired_roles.join(', ')} roles.
                </p>

                {/* Skills Preview */}
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {studentData.skills.slice(0, 6).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                        {skill}
                      </Badge>
                    ))}
                    {studentData.skills.length > 6 && (
                      <Badge variant="outline" className="text-slate-600">
                        +{studentData.skills.length - 6} more
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Experience Section */}
        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
              <Building2 size={20} />
              Experience
            </h2>
          </CardHeader>
          <CardContent className="divide-y divide-slate-200">
            {studentData.experience.map((item, i) => (
              <div key={i} className="flex gap-4 py-6">
                <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
                  <Building2 size={20} />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-800 mb-0.5">{item.role}</h3>
                  <p className="text-slate-600 text-sm mb-1">{item.company}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-2">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>{formatDate(item.start_date)} - {formatDate(item.end_date)}</span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-700 mb-2">{item.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Projects Section */}
        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
              <Code size={20} />
              Projects
            </h2>
          </CardHeader>
          <CardContent className="divide-y divide-slate-200">
            {studentData.projects.map((project, i) => (
              <div key={i} className="flex gap-4 py-6">
                <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
                  <Code size={20} />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-slate-800">{project.title}</h3>
                    <a
                      href={project.project_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>

                  <p className="text-sm text-slate-700 mb-3">{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech_stack.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Certifications Section */}
        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
              <Award size={20} />
              Certifications & Licenses
            </h2>
          </CardHeader>
          <CardContent className="divide-y divide-slate-200">
            {studentData.certifications_and_licenses.map((cert, i) => (
              <div key={i} className="flex gap-4 py-6">
                <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
                  <Award size={20} />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-slate-800">{cert.title}</h3>
                    <a
                      href={cert.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                  <p className="text-slate-600 text-sm mb-1">{cert.issuing_organization}</p>
                  <p className="text-xs text-slate-500 mb-2">ID: {cert.credential_id}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>Issued: {formatDate(cert.issue_date)}</span>
                    </div>
                    {cert.expiration_date && (
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>Expires: {formatDate(cert.expiration_date)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Job Preferences Section */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
              <MapPin size={20} />
              Job Preferences
            </h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-slate-800 mb-3">Desired Roles</h3>
                <div className="flex flex-wrap gap-2">
                  {studentData.job_preferences.desired_roles.map((role, index) => (
                    <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-slate-800 mb-3">Preferred Locations</h3>
                <div className="flex flex-wrap gap-2">
                  {studentData.job_preferences.preferred_locations.map((location, index) => (
                    <Badge key={index} variant="outline" className="bg-slate-50">
                      <MapPin size={12} className="mr-1" />
                      {location}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-slate-800 mb-3">Employment Type</h3>
                <div className="flex flex-wrap gap-2">
                  {studentData.job_preferences.employment_type.map((type, index) => (
                    <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-800">
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-slate-800 mb-3">Remote Work</h3>
                <Badge variant={studentData.job_preferences.remote ? "default" : "secondary"}>
                  {studentData.job_preferences.remote ? "Available" : "Not Available"}
                </Badge>
              </div>

              <div className="md:col-span-2">
                <h3 className="font-medium text-slate-800 mb-3">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {studentData.job_preferences.interests.map((interest, index) => (
                    <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
                      {interest}
                    </Badge>
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
