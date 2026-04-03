export interface Platform {
  id: string;
  name: string;
  tagline: string;
  description: string;
  bestFor: string[];
  difficulty: string;
  url: string;
  color: string;
  features: string[];
  tips: string[];
}

export const platforms: Record<string, Platform> = {
  w3schools: {
    id: 'w3schools', name: 'W3Schools', tagline: 'The world\'s largest web developer reference', color: '#04AA6D',
    description: 'W3Schools offers free tutorials and references for all web technologies. The "Try it Yourself" editor lets you practice code directly in the browser.',
    bestFor: ['HTML', 'CSS', 'JavaScript', 'SQL', 'Python', 'Quick syntax reference'],
    difficulty: 'Beginner',
    url: 'https://www.w3schools.com',
    features: ['Try it Yourself editor', 'Certification exams', 'Comprehensive references', 'W3Schools Spaces hosting'],
    tips: ['Use for quick syntax lookup, not deep learning', 'Do ALL exercises — they reinforce concepts', 'Use "Try it Yourself" for every concept', 'Great for HSTU exam revision'],
  },
  hackerrank: {
    id: 'hackerrank', name: 'HackerRank', tagline: 'Practice coding, prepare for interviews, earn certificates', color: '#00EA64',
    description: 'HackerRank is a platform for competitive programming challenges and skill certifications valued by companies worldwide.',
    bestFor: ['Interview prep', 'Skill certificates', 'Problem solving', 'Language practice'],
    difficulty: 'Beginner → Intermediate',
    url: 'https://www.hackerrank.com',
    features: ['Skill verification certificates', 'Company-specific tests', 'Multi-language support', 'Discussion forums'],
    tips: ['Complete Python Basic and SQL Basic certificates first', 'Certificates are valuable for your resume', 'Use for interview preparation tracks', 'Submit certificates to job applications'],
  },
  leetcode: {
    id: 'leetcode', name: 'LeetCode', tagline: 'The #1 platform for coding interview preparation', color: '#FFA116',
    description: 'LeetCode provides 3000+ problems used by top companies in technical interviews. Organized by patterns and difficulty.',
    bestFor: ['FAANG interview prep', 'DSA practice', 'Pattern-based learning', 'Company-specific problems'],
    difficulty: 'Intermediate → Advanced',
    url: 'https://leetcode.com',
    features: ['Company-tagged problems', 'Mock interviews', 'Contest system', 'Discussion & editorial'],
    tips: ['Start with Easy problems — build confidence', 'Do 2-3 problems daily consistently', 'Study patterns, not individual solutions', 'Blind 75 list is a must for interviews'],
  },
  codeforces: {
    id: 'codeforces', name: 'Codeforces', tagline: 'The world\'s premier competitive programming platform', color: '#1F8ACB',
    description: 'Codeforces hosts weekly rated contests and has the largest competitive programming community globally.',
    bestFor: ['Competitive programming', 'Global ranking', 'Weekly contests', 'Problem archive'],
    difficulty: 'Beginner → Expert',
    url: 'https://codeforces.com',
    features: ['Rated contests (Div 1-4)', 'Global ranking system', 'Problem archive with tags', 'Gym & virtual contests'],
    tips: ['Start with Div.3 A and B problems', 'Read editorials after every attempt', 'Join virtual contests for practice', 'Participate in EVERY Div.3 contest weekly'],
  },
  gfg: {
    id: 'gfg', name: 'GeeksforGeeks', tagline: 'Complete computer science study portal', color: '#2F8D46',
    description: 'GeeksforGeeks covers every CS subject in depth with articles, practice problems, and interview preparation material.',
    bestFor: ['CS theory', 'Interview questions', 'HSTU exam prep', 'Subject-wise articles'],
    difficulty: 'Beginner → Advanced',
    url: 'https://www.geeksforgeeks.org',
    features: ['Subject-wise articles', 'DSA practice track', 'Company interview experiences', 'CS core subjects'],
    tips: ['Use for HSTU exam prep — every subject covered', 'Read articles before class for better understanding', 'Practice DSA section for placements', 'Company interview archives are gold'],
  },
  freecodecamp: {
    id: 'freecodecamp', name: 'freeCodeCamp', tagline: 'Learn to code for free with project-based certifications', color: '#0A0A23',
    description: 'freeCodeCamp provides 3000+ hours of free learning with verified certifications. Completely free, forever.',
    bestFor: ['Web development', 'Free certifications', 'Project-based learning', 'Full-stack skills'],
    difficulty: 'Beginner → Intermediate',
    url: 'https://www.freecodecamp.org',
    features: ['6 verified certifications', 'Project-based curriculum', '100% free forever', 'YouTube channel with courses'],
    tips: ['Complete Responsive Web Design first', 'JS Algorithms certification is excellent for interviews', 'Build ALL certification projects', 'Add certifications to LinkedIn profile'],
  },
  coursera: {
    id: 'coursera', name: 'Coursera', tagline: 'University-level courses from Google, Meta, IBM, Stanford', color: '#0056D2',
    description: 'Coursera partners with 200+ top universities and companies to offer professional certificates and degrees.',
    bestFor: ['University courses', 'Google/Meta/IBM certificates', 'Financial aid available', 'Specializations'],
    difficulty: 'Beginner → Advanced',
    url: 'https://www.coursera.org',
    features: ['Financial aid (free access)', 'Professional certificates', 'University credits', 'Peer-graded assignments'],
    tips: ['Apply for financial aid — get any course FREE', 'Google Data Analytics certificate is highly valued', 'Meta Front-End Developer certificate is excellent', 'Financial aid approval takes ~15 days'],
  },
  kaggle: {
    id: 'kaggle', name: 'Kaggle', tagline: 'The world\'s largest data science & ML community', color: '#20BEFF',
    description: 'Kaggle offers free courses, competitions, datasets, and free GPU notebooks for data science and machine learning.',
    bestFor: ['Data Science', 'ML competitions', 'Free GPU notebooks', 'Datasets'],
    difficulty: 'Beginner → Advanced',
    url: 'https://www.kaggle.com',
    features: ['Kaggle Learn (free courses)', 'ML competitions', 'Free GPU/TPU notebooks', '200K+ datasets'],
    tips: ['Complete Intro to ML course first', 'Join beginner competitions (Titanic, House Prices)', 'Notebooks are great for portfolio', 'Kaggle Expert badge looks great on resume'],
  },
  cs50: {
    id: 'cs50', name: 'CS50 Harvard', tagline: 'Harvard\'s legendary introduction to computer science', color: '#A51C30',
    description: 'CS50 is the most popular CS course in the world. It covers C, Python, SQL, HTML, JS with incredible production quality.',
    bestFor: ['CS fundamentals', 'Best first CS course', 'Free certificate', 'World-class teaching'],
    difficulty: 'Beginner → Intermediate',
    url: 'https://cs50.harvard.edu/x',
    features: ['Free certificate from Harvard', 'Problem sets with auto-grading', 'CS50 IDE (cloud coding)', 'Active community'],
    tips: ['CS50x covers C, Python, SQL, HTML, JS — best foundation', 'Do ALL problem sets — they are challenging but worth it', 'The certificate is respected worldwide', 'Watch lectures at 1.5x speed'],
  },
};
