// EcoSync AI Shared State Manager
// Uses localStorage to persist state across refreshes, perfect for human judges to see live updates.

export interface LogEntry {
  name: string;
  emissions: number;
}

export interface Post {
  id: string;
  author: string;
  avatar: string;
  role: string;
  content: string;
  emissionsSaved: number;
  likes: number;
  liked: boolean;
  comments: string[];
  timestamp: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  points: number;
  joined: boolean;
  completed: boolean;
  progress: number;
  total: number;
}

export interface Device {
  id: string;
  name: string;
  category: string;
  status: boolean;
  consumption: number; // Watts
  saving: number; // Watts saved when active
}

const DEFAULT_LOGS: LogEntry[] = [
  { name: 'Mon', emissions: 12 },
  { name: 'Tue', emissions: 19 },
  { name: 'Wed', emissions: 15 },
  { name: 'Thu', emissions: 8 },
  { name: 'Fri', emissions: 22 },
  { name: 'Sat', emissions: 30 },
  { name: 'Sun', emissions: 14 },
];

const DEFAULT_CHALLENGES: Challenge[] = [
  { id: '1', title: 'Car-Free Commute', description: 'Use public transit, cycle, or walk for all your trips today.', category: 'Transport', points: 150, joined: false, completed: false, progress: 0, total: 1 },
  { id: '2', title: 'Plastic-Free Week', description: 'Avoid single-use plastics and bring your own reusable bags/bottles.', category: 'Waste', points: 300, joined: false, completed: false, progress: 3, total: 7 },
  { id: '3', title: 'Meatless Monday', description: 'Replace all meat meals with plant-based alternatives.', category: 'Food', points: 100, joined: false, completed: false, progress: 0, total: 1 },
  { id: '4', title: 'Tree Planter Extraordinaire', description: 'Plant virtual or physical trees to offset carbon.', category: 'Offset', points: 500, joined: false, completed: false, progress: 0, total: 5 },
];

const DEFAULT_POSTS: Post[] = [
  {
    id: 'p1',
    author: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    role: 'Student, Green Activist',
    content: 'Just completed my first 7-day streak of public commuting! Commuting by bus saved me about 12.5 kg of CO2 this week. Highly recommend the travel comparisons in the EcoSync App!',
    emissionsSaved: 12.5,
    likes: 24,
    liked: false,
    comments: ['Awesome achievement Sarah!', 'Inspiring! I am going to try it too.'],
    timestamp: '2 hours ago',
  },
  {
    id: 'p2',
    author: 'David Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    role: 'Product Designer',
    content: 'Toggled my entire living room setup onto EcoSync Smart Home. It auto-switches my monitor and printer off when I am away. Savings are already ticking up!',
    emissionsSaved: 3.2,
    likes: 18,
    liked: false,
    comments: ['Which smart switches did you use?'],
    timestamp: '5 hours ago',
  }
];

const DEFAULT_DEVICES: Device[] = [
  { id: 'd1', name: 'Smart Thermostat (Eco Mode)', category: 'HVAC', status: false, consumption: 150, saving: 60 },
  { id: 'd2', name: 'Living Room Smart Lights (LED)', category: 'Lighting', status: true, consumption: 20, saving: 15 },
  { id: 'd3', name: 'Workstation Auto-Off Switch', category: 'Appliances', status: false, consumption: 120, saving: 80 },
  { id: 'd4', name: 'Solar panel array inverter', category: 'Energy', status: true, consumption: 0, saving: 450 },
];

export const getPoints = (): number => {
  const pts = localStorage.getItem('eco_points');
  if (!pts) {
    localStorage.setItem('eco_points', '2450');
    return 2450;
  }
  return parseInt(pts);
};

export const setPoints = (points: number): void => {
  localStorage.setItem('eco_points', points.toString());
  window.dispatchEvent(new Event('storage_update'));
};

export const getCarbonScore = (): number => {
  const score = localStorage.getItem('eco_carbon_score');
  if (!score) {
    localStorage.setItem('eco_carbon_score', '785');
    return 785;
  }
  return parseInt(score);
};

export const setCarbonScore = (score: number): void => {
  localStorage.setItem('eco_carbon_score', score.toString());
  window.dispatchEvent(new Event('storage_update'));
};

export const getStreak = (): number => {
  const streak = localStorage.getItem('eco_streak');
  if (!streak) {
    localStorage.setItem('eco_streak', '12');
    return 12;
  }
  return parseInt(streak);
};

export const setStreak = (streak: number): void => {
  localStorage.setItem('eco_streak', streak.toString());
  window.dispatchEvent(new Event('storage_update'));
};

export const getLogs = (): LogEntry[] => {
  const logs = localStorage.getItem('eco_logs');
  if (!logs) {
    localStorage.setItem('eco_logs', JSON.stringify(DEFAULT_LOGS));
    return DEFAULT_LOGS;
  }
  return JSON.parse(logs);
};

export const addLog = (name: string, emissions: number): void => {
  const logs = getLogs();
  // Find if day already exists
  const existing = logs.find(l => l.name === name);
  if (existing) {
    existing.emissions = parseFloat((existing.emissions + emissions).toFixed(1));
  } else {
    logs.push({ name, emissions });
    if (logs.length > 7) logs.shift();
  }
  localStorage.setItem('eco_logs', JSON.stringify(logs));
  window.dispatchEvent(new Event('storage_update'));
};

export const getChallenges = (): Challenge[] => {
  const ch = localStorage.getItem('eco_challenges');
  if (!ch) {
    localStorage.setItem('eco_challenges', JSON.stringify(DEFAULT_CHALLENGES));
    return DEFAULT_CHALLENGES;
  }
  return JSON.parse(ch);
};

export const updateChallenges = (challenges: Challenge[]): void => {
  localStorage.setItem('eco_challenges', JSON.stringify(challenges));
  window.dispatchEvent(new Event('storage_update'));
};

export const getPosts = (): Post[] => {
  const posts = localStorage.getItem('eco_posts');
  if (!posts) {
    localStorage.setItem('eco_posts', JSON.stringify(DEFAULT_POSTS));
    return DEFAULT_POSTS;
  }
  return JSON.parse(posts);
};

export const updatePosts = (posts: Post[]): void => {
  localStorage.setItem('eco_posts', JSON.stringify(posts));
  window.dispatchEvent(new Event('storage_update'));
};

export const getTreesPlanted = (): number => {
  const trees = localStorage.getItem('eco_trees');
  if (!trees) {
    localStorage.setItem('eco_trees', '3');
    return 3;
  }
  return parseInt(trees);
};

export const setTreesPlanted = (trees: number): void => {
  localStorage.setItem('eco_trees', trees.toString());
  window.dispatchEvent(new Event('storage_update'));
};

export const getDevices = (): Device[] => {
  const devices = localStorage.getItem('eco_devices');
  if (!devices) {
    localStorage.setItem('eco_devices', JSON.stringify(DEFAULT_DEVICES));
    return DEFAULT_DEVICES;
  }
  return JSON.parse(devices);
};

export const updateDevices = (devices: Device[]): void => {
  localStorage.setItem('eco_devices', JSON.stringify(devices));
  window.dispatchEvent(new Event('storage_update'));
};
