export type DanceStyle = 'foundations' | 'contemporary' | 'hip-hop' | 'latin' | 'fusion' | 'ballet';
export type DanceEnergy = 'slow flow' | 'groove' | 'precision' | 'performance';

export interface DanceRoutine {
  id: string;
  name: string;
  description: string;
  style: DanceStyle;
  energy: DanceEnergy;
  duration: string;
  videoUrl: string;
  thumbnailUrl: string;
  isLocalFile?: boolean;
}

export const danceRoutines: DanceRoutine[] = [
  {
    id: 'foundation-wave',
    name: 'foundation wave',
    description: 'gentle body rolls and reach patterns to wake up every joint before class.',
    style: 'foundations',
    energy: 'slow flow',
    duration: '2:30',
    videoUrl: '/videos/taekwondo/Taegeuk 1 Il Jang.mp4',
    thumbnailUrl: '/videos/taekwondo/Taegeuk 1 Il Jang.jpg',
    isLocalFile: true
  },
  {
    id: 'groove-lines',
    name: 'groove lines',
    description: 'hip-hop inspired groove lines with clean angles and playful footwork.',
    style: 'hip-hop',
    energy: 'groove',
    duration: '2:03',
    videoUrl: '/videos/taekwondo/Taegeuk 2 Ee Jang June 16 2025.mp4',
    thumbnailUrl: '/videos/taekwondo/Taegeuk 2 Ee Jang.jpg',
    isLocalFile: true
  },
  {
    id: 'floor-melt',
    name: 'floor melt',
    description: 'contemporary floorwork that drills fluid transitions and breath-led pace.',
    style: 'contemporary',
    energy: 'slow flow',
    duration: '2:12',
    videoUrl: '/videos/taekwondo/Taegeuk 3 Sam Jang June 16 2025.mp4',
    thumbnailUrl: '/videos/taekwondo/Taegeuk 3 Sam Jang.jpg',
    isLocalFile: true
  },
  {
    id: 'sharp-hits',
    name: 'sharp hits',
    description: 'crispy musicality drills that alternate fast pops with controlled pauses.',
    style: 'hip-hop',
    energy: 'performance',
    duration: '2:05',
    videoUrl: '/videos/taekwondo/Taegeuk 4 Sa Jang June 16 2025.mp4',
    thumbnailUrl: '/videos/taekwondo/Taegeuk 4 Sa Jang.jpg',
    isLocalFile: true
  },
  {
    id: 'latin-bloom',
    name: 'latin bloom',
    description: 'latin fusion combo built around traveling walks and grounded spirals.',
    style: 'latin',
    energy: 'groove',
    duration: '2:18',
    videoUrl: '/videos/taekwondo/Taegeuk 5 Oh Jang June 16 2025.mp4',
    thumbnailUrl: '/videos/taekwondo/Taegeuk 5 Oh Jang.jpg',
    isLocalFile: true
  },
  {
    id: 'ballet-stride',
    name: 'ballet stride',
    description: 'clean ballet-inspired lines with focus on balance, turnout, and control.',
    style: 'ballet',
    energy: 'precision',
    duration: '2:14',
    videoUrl: '/videos/taekwondo/Taegeuk 6 Yook Jang June 16 2025.mp4',
    thumbnailUrl: '/videos/taekwondo/Taegeuk 6 Yook Jang.jpg',
    isLocalFile: true
  },
  {
    id: 'fusion-drive',
    name: 'fusion drive',
    description: 'full-body routine that blends contemporary reach with commercial power.',
    style: 'fusion',
    energy: 'performance',
    duration: '2:45',
    videoUrl: '/videos/taekwondo/Taegeuk 7 Chil Jang June 16 2025.mp4',
    thumbnailUrl: '/videos/taekwondo/Taegeuk 7 Chil Jang.jpg',
    isLocalFile: true
  },
  {
    id: 'story-arc',
    name: 'story arc',
    description: 'expressive contemporary piece focused on storytelling and stamina.',
    style: 'contemporary',
    energy: 'precision',
    duration: '2:29',
    videoUrl: '/videos/taekwondo/Taegeuk 8 Pal Jang June 17 2025.mp4',
    thumbnailUrl: '/videos/taekwondo/Taegeuk 8 Pal Jang.jpg',
    isLocalFile: true
  },
  {
    id: 'arcade-footwork',
    name: 'arcade footwork',
    description: 'playful foot switches, slides, and level changes to sharpen timing.',
    style: 'fusion',
    energy: 'groove',
    duration: '2:28',
    videoUrl: '/videos/karate/Heian Shodan June 17 2025.mp4',
    thumbnailUrl: '/videos/karate/Heian Shodan.jpg',
    isLocalFile: true
  },
  {
    id: 'breath-hold',
    name: 'breath hold',
    description: 'slow contemporary sequence that trains control, balance, and focus.',
    style: 'contemporary',
    energy: 'slow flow',
    duration: '2:42',
    videoUrl: '/videos/karate/Heian Nidan June 18 2025.mp4',
    thumbnailUrl: '/videos/karate/Heian Nidan.jpg',
    isLocalFile: true
  },
  {
    id: 'edge-lines',
    name: 'edge lines',
    description: 'angular shapes, broken lines, and direction changes for stage energy.',
    style: 'hip-hop',
    energy: 'precision',
    duration: '2:32',
    videoUrl: '/videos/karate/Heian Sandan June 18 2025.mp4',
    thumbnailUrl: '/videos/karate/Heian Sandan.jpg',
    isLocalFile: true
  }
];

export const getRoutinesByStyle = () => {
  return danceRoutines.reduce((acc, routine) => {
    if (!acc[routine.style]) {
      acc[routine.style] = [];
    }
    acc[routine.style].push(routine);
    return acc;
  }, {} as Record<DanceStyle, DanceRoutine[]>);
};

export const getRoutineById = (id: string): DanceRoutine | undefined => {
  return danceRoutines.find(routine => routine.id === id);
};
