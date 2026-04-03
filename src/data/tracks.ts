export interface Track {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  difficulty: string;
  color: string;
  whatYouLearn: string[];
  roadmap: { step: string; desc: string }[];
  resources: { title: string; url: string; type: 'video' | 'docs' | 'practice' }[];
  projects: { name: string; difficulty: string }[];
  jobs: { role: string; bdSalary: string; intSalary: string }[];
}

export const tracks: Record<string, Track> = {
  webdev: {
    id: 'webdev', name: 'Web Development', icon: 'Code2', tagline: 'Build the modern web from frontend to backend', difficulty: 'Beginner → Advanced', color: '#3b82f6',
    whatYouLearn: ['HTML5 & CSS3', 'JavaScript ES6+', 'React.js', 'Node.js & Express', 'REST APIs', 'Databases (SQL & NoSQL)', 'Git & Deployment', 'TypeScript'],
    roadmap: [
      { step: 'HTML & CSS Fundamentals', desc: 'Learn semantic HTML, Flexbox, Grid, responsive design' },
      { step: 'JavaScript Basics', desc: 'Variables, functions, arrays, objects, DOM manipulation' },
      { step: 'React.js', desc: 'Components, hooks, state management, routing' },
      { step: 'Node.js & Express', desc: 'Server-side JavaScript, APIs, middleware' },
      { step: 'Database & SQL', desc: 'PostgreSQL, MongoDB, ORMs, data modeling' },
      { step: 'Deploy & DevOps', desc: 'Vercel, Netlify, Docker basics, CI/CD' },
    ],
    resources: [
      { title: 'MDN Web Docs', url: 'https://developer.mozilla.org/en-US/docs/Learn', type: 'docs' },
      { title: 'freeCodeCamp', url: 'https://www.freecodecamp.org/learn/responsive-web-design', type: 'practice' },
      { title: 'Web Dev Bangla Tutorial', url: 'https://www.youtube.com/results?search_query=web+development+bangla+2024', type: 'video' },
      { title: 'React Official Docs', url: 'https://react.dev', type: 'docs' },
      { title: 'Full Stack Open', url: 'https://fullstackopen.com/en', type: 'docs' },
      { title: 'W3Schools', url: 'https://www.w3schools.com', type: 'docs' },
    ],
    projects: [
      { name: 'Personal Portfolio Website', difficulty: 'Beginner' },
      { name: 'Todo App with React', difficulty: 'Beginner' },
      { name: 'E-commerce Store', difficulty: 'Intermediate' },
      { name: 'Social Media Dashboard', difficulty: 'Advanced' },
    ],
    jobs: [
      { role: 'Junior Frontend Developer', bdSalary: '25-45k BDT/mo', intSalary: '$40-70k/yr' },
      { role: 'Full-Stack Developer', bdSalary: '45-80k BDT/mo', intSalary: '$70-120k/yr' },
      { role: 'React Developer', bdSalary: '40-70k BDT/mo', intSalary: '$60-120k/yr' },
    ],
  },
  uiux: {
    id: 'uiux', name: 'UI/UX Design', icon: 'Palette', tagline: 'Design beautiful, user-centered digital experiences', difficulty: 'Beginner → Advanced', color: '#8b5cf6',
    whatYouLearn: ['Design Principles', 'Color Theory & Typography', 'Wireframing', 'Figma', 'Prototyping', 'User Research', 'Design Systems', 'Accessibility'],
    roadmap: [
      { step: 'Design Fundamentals', desc: 'Layout, hierarchy, contrast, alignment' },
      { step: 'Color & Typography', desc: 'Color theory, font pairing, visual rhythm' },
      { step: 'Figma Mastery', desc: 'Components, auto-layout, variants, plugins' },
      { step: 'Wireframing & Prototyping', desc: 'Low-fi to high-fi, interactive prototypes' },
      { step: 'User Research', desc: 'Interviews, usability testing, personas' },
      { step: 'Design Systems', desc: 'Tokens, component libraries, documentation' },
    ],
    resources: [
      { title: 'Figma Community', url: 'https://www.figma.com/community', type: 'practice' },
      { title: 'Nielsen Norman Group', url: 'https://www.nngroup.com/articles', type: 'docs' },
      { title: 'UI/UX Bangla Tutorial', url: 'https://www.youtube.com/results?search_query=ui+ux+design+bangla+2024', type: 'video' },
      { title: 'Interaction Design Foundation', url: 'https://www.interaction-design.org/literature', type: 'docs' },
      { title: 'Refactoring UI', url: 'https://www.refactoringui.com', type: 'docs' },
    ],
    projects: [
      { name: 'Redesign a Popular App', difficulty: 'Beginner' },
      { name: 'Design System from Scratch', difficulty: 'Intermediate' },
      { name: 'Complete SaaS Dashboard Design', difficulty: 'Advanced' },
    ],
    jobs: [
      { role: 'UI Designer', bdSalary: '20-40k BDT/mo', intSalary: '$50-90k/yr' },
      { role: 'UX Researcher', bdSalary: '35-60k BDT/mo', intSalary: '$70-120k/yr' },
      { role: 'Product Designer', bdSalary: '50-80k BDT/mo', intSalary: '$80-140k/yr' },
    ],
  },
  sqa: {
    id: 'sqa', name: 'SQA & Testing', icon: 'TestTube', tagline: 'Ensure software quality with modern testing practices', difficulty: 'Beginner → Intermediate', color: '#f59e0b',
    whatYouLearn: ['Testing Fundamentals', 'Test Case Writing', 'Manual Testing', 'Selenium WebDriver', 'API Testing (Postman)', 'Jira & Agile', 'Performance Testing', 'CI/CD Testing'],
    roadmap: [
      { step: 'Testing Basics', desc: 'Types of testing, SDLC, STLC, bug lifecycle' },
      { step: 'Test Case Writing', desc: 'Positive/negative cases, boundary values, equivalence' },
      { step: 'Manual Testing', desc: 'Functional, regression, smoke, sanity testing' },
      { step: 'Selenium WebDriver', desc: 'Browser automation, locators, waits, frameworks' },
      { step: 'API Testing', desc: 'Postman, REST APIs, status codes, assertions' },
      { step: 'Agile & CI/CD', desc: 'Scrum, sprint testing, Jenkins integration' },
    ],
    resources: [
      { title: 'Guru99 Testing', url: 'https://www.guru99.com/software-testing.html', type: 'docs' },
      { title: 'Selenium Docs', url: 'https://www.selenium.dev/documentation', type: 'docs' },
      { title: 'Postman Learning', url: 'https://learning.postman.com', type: 'docs' },
      { title: 'SQA Bangla Tutorial', url: 'https://www.youtube.com/results?search_query=sqa+software+testing+career+bangla', type: 'video' },
      { title: 'ISTQB Foundation', url: 'https://www.istqb.org', type: 'docs' },
    ],
    projects: [
      { name: 'Write Test Cases for E-commerce Site', difficulty: 'Beginner' },
      { name: 'Selenium Automation Framework', difficulty: 'Intermediate' },
      { name: 'Full Test Plan & Strategy Document', difficulty: 'Advanced' },
    ],
    jobs: [
      { role: 'SQA Engineer', bdSalary: '25-45k BDT/mo', intSalary: '$50-80k/yr' },
      { role: 'Automation Tester', bdSalary: '40-70k BDT/mo', intSalary: '$70-110k/yr' },
      { role: 'QA Lead', bdSalary: '60-100k BDT/mo', intSalary: '$90-140k/yr' },
    ],
  },
  web3: {
    id: 'web3', name: 'Web3 & Blockchain', icon: 'Link2', tagline: 'Build decentralized applications on blockchain', difficulty: 'Intermediate → Advanced', color: '#06b6d4',
    whatYouLearn: ['Blockchain Fundamentals', 'Ethereum & EVM', 'Solidity', 'Smart Contracts', 'Hardhat/Foundry', 'DeFi Concepts', 'NFTs', 'dApp Development'],
    roadmap: [
      { step: 'Blockchain Basics', desc: 'Distributed ledger, consensus, cryptography' },
      { step: 'Ethereum & EVM', desc: 'Accounts, transactions, gas, state machine' },
      { step: 'Solidity Programming', desc: 'Data types, functions, modifiers, inheritance' },
      { step: 'Smart Contract Development', desc: 'Testing, deployment, security patterns' },
      { step: 'DeFi & NFTs', desc: 'AMM, lending protocols, ERC-721, marketplaces' },
      { step: 'Build a dApp', desc: 'Frontend + smart contract integration, web3.js/ethers.js' },
    ],
    resources: [
      { title: 'Ethereum Docs', url: 'https://ethereum.org/en/developers/docs', type: 'docs' },
      { title: 'Solidity Docs', url: 'https://docs.soliditylang.org', type: 'docs' },
      { title: 'CryptoZombies', url: 'https://cryptozombies.io', type: 'practice' },
      { title: 'Web3 Bangla Tutorial', url: 'https://www.youtube.com/results?search_query=web3+blockchain+bangla', type: 'video' },
      { title: 'Alchemy University', url: 'https://www.alchemy.com/university', type: 'practice' },
    ],
    projects: [
      { name: 'Simple Token (ERC-20)', difficulty: 'Beginner' },
      { name: 'NFT Marketplace', difficulty: 'Intermediate' },
      { name: 'DeFi Lending Protocol', difficulty: 'Advanced' },
    ],
    jobs: [
      { role: 'Blockchain Developer', bdSalary: '50-90k BDT/mo', intSalary: '$80-150k/yr' },
      { role: 'Smart Contract Auditor', bdSalary: '60-100k BDT/mo', intSalary: '$100-180k/yr' },
    ],
  },
  aiml: {
    id: 'aiml', name: 'AI & Machine Learning', icon: 'Brain', tagline: 'Build intelligent systems with data and algorithms', difficulty: 'Intermediate → Advanced', color: '#10b981',
    whatYouLearn: ['Python for Data Science', 'NumPy & Pandas', 'Data Visualization', 'Scikit-learn', 'Neural Networks', 'TensorFlow/PyTorch', 'NLP', 'Computer Vision'],
    roadmap: [
      { step: 'Python Mastery', desc: 'Data types, OOP, file I/O, libraries' },
      { step: 'Data Analysis', desc: 'NumPy, Pandas, data cleaning, EDA' },
      { step: 'Visualization', desc: 'Matplotlib, Seaborn, Plotly' },
      { step: 'ML Algorithms', desc: 'Regression, classification, clustering, SVM' },
      { step: 'Deep Learning', desc: 'Neural networks, CNN, RNN, transformers' },
      { step: 'Specialization', desc: 'NLP, computer vision, reinforcement learning, LLMs' },
    ],
    resources: [
      { title: 'Kaggle Learn', url: 'https://www.kaggle.com/learn', type: 'practice' },
      { title: 'Fast.ai', url: 'https://www.fast.ai', type: 'docs' },
      { title: 'TensorFlow Tutorials', url: 'https://www.tensorflow.org/tutorials', type: 'docs' },
      { title: 'ML Bangla Tutorial', url: 'https://www.youtube.com/results?search_query=machine+learning+python+bangla+2024', type: 'video' },
      { title: 'PyTorch Tutorials', url: 'https://pytorch.org/tutorials', type: 'docs' },
    ],
    projects: [
      { name: 'House Price Prediction', difficulty: 'Beginner' },
      { name: 'Image Classifier (CNN)', difficulty: 'Intermediate' },
      { name: 'Chatbot with NLP', difficulty: 'Advanced' },
    ],
    jobs: [
      { role: 'ML Engineer', bdSalary: '50-80k BDT/mo', intSalary: '$100-160k/yr' },
      { role: 'Data Scientist', bdSalary: '45-75k BDT/mo', intSalary: '$90-150k/yr' },
      { role: 'AI Researcher', bdSalary: '60-100k BDT/mo', intSalary: '$120-200k/yr' },
    ],
  },
  cyber: {
    id: 'cyber', name: 'Cybersecurity', icon: 'Shield', tagline: 'Protect systems and networks from digital threats', difficulty: 'Intermediate → Advanced', color: '#ef4444',
    whatYouLearn: ['Networking Fundamentals', 'Linux Administration', 'Python Scripting', 'OWASP Top 10', 'Ethical Hacking', 'CTF Competitions', 'Bug Bounty', 'Penetration Testing'],
    roadmap: [
      { step: 'Networking & Linux', desc: 'TCP/IP, ports, Linux CLI, file permissions' },
      { step: 'Python Scripting', desc: 'Automation, socket programming, web scraping' },
      { step: 'Web Security', desc: 'OWASP Top 10, XSS, SQL injection, CSRF' },
      { step: 'TryHackMe Labs', desc: 'Hands-on CTF challenges, learning paths' },
      { step: 'Penetration Testing', desc: 'Reconnaissance, exploitation, reporting' },
      { step: 'Bug Bounty', desc: 'HackerOne, Bugcrowd, responsible disclosure' },
    ],
    resources: [
      { title: 'TryHackMe', url: 'https://tryhackme.com', type: 'practice' },
      { title: 'HackTheBox', url: 'https://www.hackthebox.com', type: 'practice' },
      { title: 'OWASP', url: 'https://owasp.org', type: 'docs' },
      { title: 'Cybersecurity Bangla', url: 'https://www.youtube.com/results?search_query=ethical+hacking+cybersecurity+bangla', type: 'video' },
      { title: 'Cybrary', url: 'https://www.cybrary.it', type: 'docs' },
    ],
    projects: [
      { name: 'Network Scanner in Python', difficulty: 'Beginner' },
      { name: 'Web Vulnerability Scanner', difficulty: 'Intermediate' },
      { name: 'Complete Penetration Test Report', difficulty: 'Advanced' },
    ],
    jobs: [
      { role: 'Security Analyst', bdSalary: '40-70k BDT/mo', intSalary: '$80-130k/yr' },
      { role: 'Penetration Tester', bdSalary: '50-90k BDT/mo', intSalary: '$90-160k/yr' },
    ],
  },
  cloud: {
    id: 'cloud', name: 'Cloud & DevOps', icon: 'Cloud', tagline: 'Deploy, scale, and manage infrastructure in the cloud', difficulty: 'Intermediate → Advanced', color: '#f97316',
    whatYouLearn: ['Linux Administration', 'Git & GitHub', 'Docker', 'CI/CD Pipelines', 'Kubernetes', 'AWS/GCP/Azure', 'Terraform', 'Monitoring & Logging'],
    roadmap: [
      { step: 'Linux & Shell Scripting', desc: 'Commands, permissions, bash scripting' },
      { step: 'Git & GitHub', desc: 'Branching, merging, pull requests, collaboration' },
      { step: 'Docker', desc: 'Containers, images, Dockerfile, docker-compose' },
      { step: 'CI/CD', desc: 'GitHub Actions, Jenkins, automated testing' },
      { step: 'Cloud (AWS)', desc: 'EC2, S3, Lambda, RDS, IAM' },
      { step: 'Kubernetes & IaC', desc: 'K8s orchestration, Terraform, monitoring' },
    ],
    resources: [
      { title: 'AWS Free Training', url: 'https://aws.amazon.com/training/free', type: 'practice' },
      { title: 'Docker Getting Started', url: 'https://www.docker.com/get-started', type: 'docs' },
      { title: 'Google Cloud Training', url: 'https://cloud.google.com/training/free-tier', type: 'practice' },
      { title: 'Cloud DevOps Bangla', url: 'https://www.youtube.com/results?search_query=aws+cloud+devops+bangla', type: 'video' },
      { title: 'Kubernetes Docs', url: 'https://kubernetes.io/docs/tutorials', type: 'docs' },
    ],
    projects: [
      { name: 'Dockerize a Web App', difficulty: 'Beginner' },
      { name: 'CI/CD Pipeline with GitHub Actions', difficulty: 'Intermediate' },
      { name: 'Deploy Microservices on Kubernetes', difficulty: 'Advanced' },
    ],
    jobs: [
      { role: 'DevOps Engineer', bdSalary: '50-90k BDT/mo', intSalary: '$100-160k/yr' },
      { role: 'Cloud Architect', bdSalary: '70-120k BDT/mo', intSalary: '$120-200k/yr' },
    ],
  },
  mobile: {
    id: 'mobile', name: 'Mobile Development', icon: 'Smartphone', tagline: 'Build native and cross-platform mobile apps', difficulty: 'Beginner → Advanced', color: '#a855f7',
    whatYouLearn: ['Dart & Flutter', 'React Native', 'UI Components', 'Navigation', 'State Management', 'REST APIs', 'Firebase', 'App Store Publishing'],
    roadmap: [
      { step: 'Dart Language', desc: 'Syntax, OOP, async/await, collections' },
      { step: 'Flutter Widgets', desc: 'Stateless, stateful, layout, styling' },
      { step: 'Navigation & Routing', desc: 'Named routes, deep linking, tabs' },
      { step: 'State Management', desc: 'Provider, Riverpod, BLoC pattern' },
      { step: 'Backend Integration', desc: 'REST APIs, Firebase, authentication' },
      { step: 'Publish App', desc: 'Google Play Store, Apple App Store' },
    ],
    resources: [
      { title: 'Flutter Docs', url: 'https://flutter.dev/docs', type: 'docs' },
      { title: 'Flutter Bangla Tutorial', url: 'https://www.youtube.com/results?search_query=flutter+bangla+tutorial+2024', type: 'video' },
      { title: 'React Native Docs', url: 'https://reactnative.dev/docs/getting-started', type: 'docs' },
      { title: 'Dart Tour', url: 'https://dart.dev/guides', type: 'docs' },
    ],
    projects: [
      { name: 'Weather App', difficulty: 'Beginner' },
      { name: 'Chat Application', difficulty: 'Intermediate' },
      { name: 'E-commerce Mobile App', difficulty: 'Advanced' },
    ],
    jobs: [
      { role: 'Flutter Developer', bdSalary: '35-65k BDT/mo', intSalary: '$60-110k/yr' },
      { role: 'Mobile Developer', bdSalary: '40-75k BDT/mo', intSalary: '$70-130k/yr' },
    ],
  },
  cp: {
    id: 'cp', name: 'Competitive Programming', icon: 'Trophy', tagline: 'Sharpen problem-solving skills for contests & interviews', difficulty: 'Beginner → Expert', color: '#eab308',
    whatYouLearn: ['C++ STL', 'Time Complexity', 'Mathematics', 'Greedy Algorithms', 'Binary Search', 'Dynamic Programming', 'Graph Theory', 'Segment Trees'],
    roadmap: [
      { step: 'C++ & STL', desc: 'Vectors, maps, sets, sorting, pairs' },
      { step: 'Complexity Analysis', desc: 'Big-O notation, time/space tradeoffs' },
      { step: 'Codeforces Div.3', desc: 'A & B problems, contest participation' },
      { step: 'Math & Greedy', desc: 'Number theory, modular arithmetic, greedy strategies' },
      { step: 'DP & Graph', desc: 'Knapsack, LIS, BFS, DFS, shortest path' },
      { step: 'Advanced Topics', desc: 'Segment tree, lazy propagation, FFT' },
    ],
    resources: [
      { title: 'Codeforces', url: 'https://codeforces.com', type: 'practice' },
      { title: 'CSES Problem Set', url: 'https://cses.fi/problemset', type: 'practice' },
      { title: 'USACO Guide', url: 'https://usaco.guide', type: 'docs' },
      { title: 'CP-Algorithms', url: 'https://cp-algorithms.com', type: 'docs' },
      { title: 'CP Bangla Tutorial', url: 'https://www.youtube.com/results?search_query=competitive+programming+codeforces+bangla', type: 'video' },
    ],
    projects: [
      { name: 'Solve 100 Codeforces Problems', difficulty: 'Beginner' },
      { name: 'Reach Specialist on Codeforces', difficulty: 'Intermediate' },
      { name: 'Build Algorithm Visualizer', difficulty: 'Advanced' },
    ],
    jobs: [
      { role: 'Software Engineer (FAANG)', bdSalary: 'N/A', intSalary: '$120-250k/yr' },
      { role: 'Algorithm Engineer', bdSalary: '60-100k BDT/mo', intSalary: '$100-180k/yr' },
    ],
  },
};
