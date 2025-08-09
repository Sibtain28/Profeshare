// API Response Types
export interface JobResult {
  title: string;
  companyName: string;
  jobDescription: string;
  tagsAndSkills: string;
  location: string;
  jobType: string | null;
  jdURL: string;
  score: number;
}

export interface ApiResponse {
  analysis: string;
  mongodb_result: JobResult[];
}

// API Request Types
export interface ApiRequest {
  intern_name: string;
  students: any[];
  interests: string;
  mode: 'deep' | 'classical';
}

// API Service
const API_BASE_URL = 'https://v0001-google-new-production.up.railway.app';

export class ApiService {
  static async searchJobs(request: ApiRequest): Promise<ApiResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/search-mdb`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  }
} 