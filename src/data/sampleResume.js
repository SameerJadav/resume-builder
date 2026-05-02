export const sampleResume = {
  sectionOrder: [
    'personalInfo',
    'summary',
    'experience',
    'education',
    'skills',
    'projects',
    'certifications',
  ],
  personalInfo: {
    fullName: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexjohnson',
    website: 'alexjohnson.dev',
  },
  summary: {
    text: 'Full-stack software engineer with 5+ years of experience building scalable web applications. Passionate about clean code, user experience, and mentoring junior developers. Proven track record of delivering high-impact features across the entire stack.',
  },
  experience: [
    {
      id: 'exp-1',
      company: 'TechCorp Inc.',
      title: 'Senior Software Engineer',
      startDate: 'Jan 2022',
      endDate: '',
      current: true,
      bullets: [
        'Led migration of monolithic application to microservices architecture, reducing deploy times by 60%',
        'Mentored team of 4 junior developers through code reviews and pair programming sessions',
        'Designed and implemented real-time notification system serving 100K+ daily active users',
      ],
    },
    {
      id: 'exp-2',
      company: 'StartupXYZ',
      title: 'Software Engineer',
      startDate: 'Jun 2019',
      endDate: 'Dec 2021',
      current: false,
      bullets: [
        'Built customer-facing dashboard with React and D3.js, increasing user engagement by 40%',
        'Implemented CI/CD pipeline with GitHub Actions, reducing release cycle from 2 weeks to 2 days',
        'Optimized database queries resulting in 3x improvement in API response times',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      school: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2015',
      endDate: '2019',
      gpa: '3.8',
    },
  ],
  skills: [
    {
      id: 'skill-1',
      category: 'Languages',
      items: 'JavaScript, TypeScript, Python, Go, SQL',
    },
    {
      id: 'skill-2',
      category: 'Frameworks',
      items: 'React, Node.js, Express, Next.js, Django',
    },
    {
      id: 'skill-3',
      category: 'Tools',
      items: 'Git, Docker, AWS, PostgreSQL, Redis, GitHub Actions',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'OpenSource CLI Tool',
      description: 'A command-line tool for automating development workflows with 500+ GitHub stars',
      technologies: 'Go, Cobra, GitHub API',
      link: 'github.com/alexj/cli-tool',
    },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Solutions Architect Associate',
      issuer: 'Amazon Web Services',
      date: 'Mar 2023',
    },
  ],
};
