import { Officer, ClubEvent, ProjectItem } from './types';

export const OFFICERS: Officer[] = [
  {
    id: 'anirudh-chinthagunta',
    name: 'Anirudh Chinthagunta',
    role: 'President',
    major: 'Computer Science & Engineering',
    year: '3th Year',
    initials: 'AC',
    bio: 'Alex leads the club\'s strategic direction and coordinates between all officer teams. Passionate about reinforcement learning and autonomous systems. Previously interned at DeepMind.',
    photoUrl: 'https://media.licdn.com/dms/image/v2/D4E03AQHT7NV2FXNTfg/profile-displayphoto-crop_800_800/B4EZtM8UdLGkAI-/0/1766522439965?e=1782345600&v=beta&t=9SeBeSZBDnh0n3WBsmQGReMtc-p0ckOVffqQiu5FR0s',
    socials: {
      linkedin: 'https://www.linkedin.com/in/anirudh-chinthagunta/',
    }
  },
  {
    id: 'maya-patel',
    name: 'Maya Patel',
    role: 'Vice President',
    major: 'Data Analytics',
    minor: 'Cognitive Science',
    year: '3rd Year',
    initials: 'MP',
    bio: 'Maya oversees member onboarding and workshop programming. Her research focuses on fairness in ML systems. She loves hackathons and terrible puns.',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop',
    socials: {
      linkedin: 'https://linkedin.com/in/mayapatel',
      github: 'https://github.com/mayapatel'
    }
  },
  {
    id: 'jordan-kim',
    name: 'Jordan Kim',
    role: 'Treasurer / Director of Projects',
    major: 'CSE + Math',
    year: '3rd Year',
    initials: 'JK',
    bio: 'Jordan organizes project teams each semester and mentors members through their first AI builds. Working on a graph neural network research project with OSU\'s NLP lab.',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
    socials: {
      linkedin: 'https://linkedin.com/in/jordankim',
      github: 'https://github.com/jordankim'
    }
  },
  {
    id: 'evan-menges',
    name: 'Evan Menges',
    role: 'Chief Technical Officer',
    major: 'Electrical Engineering + Economics',
    minor: 'Nuclear Engineering',
    year: '4th Year',
    initials: 'EM',
    bio: 'Sam runs all logistics for HackAI, OSU\'s largest student AI hackathon. They are obsessed with LLM fine-tuning and making AI education more accessible.',
    photoUrl: 'https://media.licdn.com/dms/image/v2/D5603AQFmH207C0whTQ/profile-displayphoto-crop_800_800/B56ZwBLPSOGYAI-/0/1769546249987?e=1782345600&v=beta&t=L0dsphXq7hoCRIehob3zKl0dLQkhbgRuIyft_9ArSVs',
    socials: {
      linkedin: 'https://linkedin.com/in/samtorres',
      github: 'https://github.com/samtorres'
    }
  },
  {
    id: 'riley-zhang',
    name: 'Riley Zhang',
    role: 'Outreach Chair',
    major: 'Electrical & Computer Engineering',
    minor: 'Robotics & Autonomous Systems',
    year: '2nd Year',
    initials: 'RZ',
    bio: 'Riley manages industry partnerships, sponsorships, and speaker invitations. Interested in computer vision for medical imaging.',
    photoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop',
    socials: {
      linkedin: 'https://www.linkedin.com/in/evan-menges/',
      github: 'https://github.com/3venthatguy'
    }
  },
  {
    id: 'morgan-lee',
    name: 'Morgan Lee',
    role: 'Treasurer',
    major: 'Information Systems',
    minor: 'Economics',
    year: '3rd Year',
    initials: 'ML',
    bio: 'Morgan handles the club\'s budget and manages sponsor relationships. Also runs a personal ML blog and is learning JAX.',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop',
    socials: {
      linkedin: 'https://linkedin.com/in/morganlee',
      github: 'https://github.com/morganlee'
    }
  }
];

export const EVENTS: ClubEvent[] = [
  {
    id: 'pytorch-intro',
    category: 'Workshop',
    title: 'Intro to PyTorch & Neural Networks',
    description: 'Learn the fundamentals of deep learning libraries. We will build, train, and test our first simple multi-layer perceptron from scratch.',
    dateString: 'Oct 8, 2026',
    day: '08',
    month: 'OCT',
    time: '6:00 PM',
    location: 'Dreese Lab 260',
    rsvpUrl: 'https://example.com/rsvp-pytorch',
    isPast: false
  },
  {
    id: 'google-industry-night',
    category: 'Speaker',
    title: 'AI Industry Night: Google Researchers',
    description: 'Join us for a fireside chat with ML research engineers from Google DeepMind and Google Cloud to discuss agentic setups and TPU computing.',
    dateString: 'Oct 15, 2026',
    day: '15',
    month: 'OCT',
    time: '6:30 PM',
    location: 'Dreese Lab Auditorium',
    rsvpUrl: 'https://example.com/rsvp-google',
    isPast: false
  },
  {
    id: 'hackai-opens',
    category: 'HackAI',
    title: 'HackAI 2026 Registration Kickoff',
    description: 'Learn everything about the HackAI prompt challenges, developer themes, and $12K team prizes. Grab early tickets and find team partners!',
    dateString: 'Nov 2, 2026',
    day: '02',
    month: 'NOV',
    time: '5:30 PM',
    location: 'Dreese Lab 260',
    rsvpUrl: 'https://example.com/rsvp-hackai-registration',
    isPast: false
  },
  {
    id: 'llm-tuning',
    category: 'Workshop',
    title: 'Fine-Tuning LLMs on Custom Data',
    description: 'Practical guide to LoRA, QLoRA, and parameter-efficient fine-tuning (PEFT). Bring your laptop for a step-by-step Google Colab walk.',
    dateString: 'Nov 12, 2026',
    day: '12',
    month: 'NOV',
    time: '6:00 PM',
    location: 'Dreese Lab 260',
    rsvpUrl: 'https://example.com/rsvp-llmtuning',
    isPast: false
  },
  {
    id: 'semester-mixer',
    category: 'Social',
    title: 'End of Semester Mixer & Showcase',
    description: 'Hang out, eat free pizza, talk shop, and watch live demonstrations of the project team prototypes developed during this academic period.',
    dateString: 'Dec 4, 2026',
    day: '04',
    month: 'DEC',
    time: '7:00 PM',
    location: 'Hitchcock Hall Lobby',
    rsvpUrl: 'https://example.com/rsvp-mixer',
    isPast: false
  },
  // Past events
  {
    id: 'past-transformer-hack',
    category: 'HackAI',
    title: 'HackAI 2025: Generative Frontiers',
    description: 'Our annual 36-hour hackathon bringing together over 300 designers and developers to create novel Generative AI systems.',
    dateString: 'Feb 15, 2025',
    day: '15',
    month: 'FEB',
    time: 'Weekend-long',
    location: 'Ohio Union Ballroom',
    rsvpUrl: '#',
    recapUrl: 'https://example.com/recap-hackai-2025',
    isPast: true
  },
  {
    id: 'past-mlops',
    category: 'Workshop',
    title: 'MLOps: Deploying Models to Cloud Run',
    description: 'How to containerize PyTorch runtimes with Docker and deploy them onto scalable serverless clusters with automatic API scaling.',
    dateString: 'Mar 12, 2025',
    day: '12',
    month: 'MAR',
    time: '6:30 PM',
    location: 'Dreese Lab 260',
    rsvpUrl: '#',
    recapUrl: 'https://example.com/recap-mlops',
    isPast: true
  },
  {
    id: 'past-rl-gaming',
    category: 'Workshop',
    title: 'Reinforcement Learning in Gamified Environments',
    description: 'Deep diving into Q-learning and Policy Gradient methods as applied to simulated Atari and custom Gym visual playgrounds.',
    dateString: 'Apr 2, 2025',
    day: '02',
    month: 'APR',
    time: '6:00 PM',
    location: 'Dreese Lab 260',
    rsvpUrl: '#',
    recapUrl: 'https://example.com/recap-rl',
    isPast: true
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'buckeye-chatbot',
    title: 'O-S-U NavBot NLP Engine',
    category: 'Natural Language Processing',
    description: 'A customized, retrieval-augmented generation (RAG) assistant indexing Ohio State course schedules, building layout directories, and advising options.',
    tags: ['LLM', 'RAG', 'VectorDB', 'TypeScript'],
    stats: '500+ Daily Searches',
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd50a?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'traffic-analysis',
    title: 'Buckeye Vision Traffic AI',
    category: 'Computer Vision',
    description: 'An edge-deployed real-time neural analyzer assessing vehicle counts, safety bottlenecks, and pedestrian lanes around Lane Avenue.',
    tags: ['PyTorch', 'YOLOnas', 'OpenCV', 'Docker'],
    stats: '94.2% Real-time Precision',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'rl-quadcopter',
    title: 'Self-Stabilizing Quadcopter Agent',
    category: 'Robotics & Control',
    description: 'Developing reinforcement learning guidance equations in Pybullet to achieve high-tolerance flight resilience under severe sudden wind gusts.',
    tags: ['Reinforcement Learning', 'PyBullet', 'JAX'],
    stats: '2.4x Recovery Stabilization',
    image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'bio-dna',
    title: 'BioBuckeye DNA Sequence Aligning',
    category: 'Bioinformatics Research',
    description: 'Applying generative sequence models to inspect micro-evolution patterns and classify transcription binding spots with state-of-the-art accuracy.',
    tags: ['DNA-seq', 'Keras', 'Transformers', 'BioPython'],
    stats: 'SOTA Validation Bounds',
    image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=600&auto=format&fit=crop'
  }
];

export const FAQS = [
  {
    q: "Who is eligible to join the club?",
    a: "Any student enrolled at The Ohio State University (undergraduate, graduate, or PhD) is welcome to join immediately! There are no GPA hurdles or application filters for base membership."
  },
  {
    q: "What if I have zero coding or AI database experience?",
    a: "No problem at all! Most of our members started right where you are. We offer structured, beginner-friendly workshops (starting with Python basics and Intro to PyTorch) designed specifically to get you up to speed."
  },
  {
    q: "Does it cost anything to be a member?",
    a: "No, general membership is entirely free of charge. Thanks to our corporate sponsors and engineering department funding, all workshops, resources, events, and pizzas are fully covered!"
  },
  {
    q: "How do I join a semester project team?",
    a: "Project teams form at the start of each semester (typically by week 2). Attend the Projects Kickoff, hear project pitches from team leads, or pitch your own idea, and sign up directly."
  },
  {
    q: "How can I participate in HackAI?",
    a: "HackAI is open to all university students. Registration typically opens 2 months before the event (Feb/March). Check out our `/hackai` page for up-to-the-minute updates and prize structures."
  }
];
