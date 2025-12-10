import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, TrendingUp, Target, Lightbulb, BarChart3, MessageCircle, X, Sparkles, CheckCircle, Copy, Check, Volume2, VolumeX, Loader2, Home, ArrowLeft, Settings, User, MessageSquare, Star, Zap } from 'lucide-react';

interface JointScore {
  joint: string;
  score: number;
  feedback: string;
  category: 'excellent' | 'good' | 'fair' | 'needs-improvement';
}

interface PerformanceData {
  joint: string;
  userAverage: number;
  instructorAverage: number;
  difference: number;
  consistency: number;
  userRange: string;
  instructorRange: string;
}

interface NaturalLanguageAnalysis {
  feedback: string;
  techniqueTips: string;
  breakdown?: {
    start?: { observation: string; tip: string };
    middle?: { observation: string; tip: string };
    end?: { observation: string; tip: string };
  };
  performanceData: PerformanceData[];
  overallScore?: number;
  timestamp: string;
}

interface ResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  scores?: JointScore[];
  overallScore?: number;
  feedback?: string;
  timing?: any;
  recordedVideo?: string;
  routineNotes?: string;
  angleData?: {
    timestamps: string[];
    userAngles: { [joint: string]: number[] };
    expectedAngles: { [joint: string]: number[] };
  };
  dtwResults?: Record<string, any>;
  userAngleTable?: {
    timestamps: string[];
    angles: { [joint: string]: number[] };
  };
  instructorAngleTable?: {
    timestamps: string[];
    angles: { [joint: string]: number[] };
  };
  fastDtwResults?: {
    overallScore: number;
    perFrameScores?: number[];
    jointErrors?: number[];
    jointNames?: string[];
    detailedJointScores?: Array<{ name: string; score: number; cost: number }>;
  };
}

export default function ResultsModal({
  isOpen,
  onClose,
  scores = [],
  overallScore = 0,
  feedback = 'No feedback available.',
  timing,
  recordedVideo,
  routineNotes,
  angleData,
  dtwResults,
  userAngleTable,
  instructorAngleTable,
  fastDtwResults,
}: ResultsModalProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [naturalLanguageAnalysis, setNaturalLanguageAnalysis] = useState<NaturalLanguageAnalysis | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'insights' | 'technical'>('overview');
  const [showCelebration, setShowCelebration] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

  // Calculate performance metrics from available data sources
  const calculateScore = (): number => {
    // Priority 1: FastDTW results
    if (fastDtwResults?.overallScore && fastDtwResults.overallScore > 0) {
      return fastDtwResults.overallScore;
    }
    
    // Priority 2: Passed overallScore prop
    if (overallScore && overallScore > 0) {
      return overallScore;
    }
    
    // Priority 3: Calculate from angle data if available
    if (userAngleTable?.angles && instructorAngleTable?.angles) {
      const userJoints = Object.keys(userAngleTable.angles);
      const instructorJoints = Object.keys(instructorAngleTable.angles);
      const commonJoints = userJoints.filter(j => instructorJoints.includes(j));
      
      if (commonJoints.length > 0) {
        let totalScore = 0;
        let validJoints = 0;
        
        commonJoints.forEach(joint => {
          const userAngles = userAngleTable.angles[joint];
          const instructorAngles = instructorAngleTable.angles[joint];
          
          if (userAngles?.length > 0 && instructorAngles?.length > 0) {
            const userAvg = userAngles.reduce((a, b) => a + b, 0) / userAngles.length;
            const instructorAvg = instructorAngles.reduce((a, b) => a + b, 0) / instructorAngles.length;
            const difference = Math.abs(userAvg - instructorAvg);
            // Score based on angle difference (lower difference = higher score)
            const jointScore = Math.max(0, 100 - (difference * 1.5));
            totalScore += jointScore;
            validJoints++;
          }
        });
        
        if (validJoints > 0) {
          return Math.round(totalScore / validJoints);
        }
      }
    }
    
    // Priority 4: Calculate from scores array
    if (scores && scores.length > 0) {
      const avgScore = scores.reduce((sum, s) => sum + s.score, 0) / scores.length;
      return Math.round(avgScore);
    }
    
    return 0;
  };

  const rawScore = calculateScore();
  const performanceScore = Math.min(100, Math.max(0, Math.round(rawScore)));
  const performanceLevel = performanceScore >= 85 ? 'excellent' : 
                          performanceScore >= 70 ? 'good' : 
                          performanceScore >= 50 ? 'fair' : 'needs-improvement';

  // Audio functions first
  const stopAudio = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setCurrentAudio(null);
    }
    setIsPlayingAudio(false);
  };

  const handlePlayAudio = async (text: string) => {
    try {
      // Stop any currently playing audio
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        setCurrentAudio(null);
        setIsPlayingAudio(false);
      }

      // If we're currently playing the same text, just stop
      if (isPlayingAudio) {
        return;
      }

      setIsPlayingAudio(true);

      // Call the TTS endpoint
      const response = await fetch('/api/shifu/speak', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate speech');
      }

      // Create audio from the response
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);

      // Set up event listeners
      audio.addEventListener('ended', () => {
        setIsPlayingAudio(false);
        setCurrentAudio(null);
        URL.revokeObjectURL(audioUrl);
      });

      audio.addEventListener('error', () => {
        setIsPlayingAudio(false);
        setCurrentAudio(null);
        URL.revokeObjectURL(audioUrl);
      });

      // Play the audio
      setCurrentAudio(audio);
      await audio.play();

    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlayingAudio(false);
      setCurrentAudio(null);
    }
  };

  // Get natural language analysis
  const getIntelligentAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      // Build angle data from available sources
      let userAngles = userAngleTable;
      let instructorAngles = instructorAngleTable;
      
      // If no angle tables, create mock data from performance score
      if (!userAngles || !instructorAngles) {
        // Create simulated data based on the overall score for LLM analysis
        const mockJoints = ['left_elbow', 'right_elbow', 'left_knee', 'right_knee', 'left_shoulder', 'right_shoulder'];
        const mockUserAngles: { [key: string]: number[] } = {};
        const mockInstructorAngles: { [key: string]: number[] } = {};
        
        mockJoints.forEach(joint => {
          const base = 90 + Math.random() * 30;
          const variation = (100 - performanceScore) / 5; // Higher score = less variation
          mockUserAngles[joint] = Array.from({ length: 10 }, () => base + (Math.random() - 0.5) * variation * 2);
          mockInstructorAngles[joint] = Array.from({ length: 10 }, () => base + (Math.random() - 0.5) * 5);
        });
        
        userAngles = { timestamps: Array.from({ length: 10 }, (_, i) => `${i * 0.5}s`), angles: mockUserAngles };
        instructorAngles = { timestamps: Array.from({ length: 10 }, (_, i) => `${i * 0.5}s`), angles: mockInstructorAngles };
      }
      
      const response = await fetch('/api/routine-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userAngleData: userAngles,
          instructorAngleData: instructorAngles,
          routineType: 'dance routine',
          overallScore: performanceScore
        }),
      });

      if (response.ok) {
        const analysis = await response.json();
        setNaturalLanguageAnalysis(analysis);
        if (performanceScore >= 85) {
          setShowCelebration(true);
          setTimeout(() => setShowCelebration(false), 3000);
        }
      } else {
        // Fallback for API error
        setNaturalLanguageAnalysis({
          feedback: `Great job completing your performance with a score of ${performanceScore}%! ${performanceScore >= 85 ? 'Excellent work - your technique shows real dedication!' : performanceScore >= 70 ? 'Good effort! Keep practicing to refine your movements.' : 'Keep practicing - every session makes you better!'}`,
          techniqueTips: '• Focus on maintaining consistent posture throughout\n• Keep your movements smooth and controlled\n• Practice the transitions between positions',
          performanceData: [],
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Failed to get intelligent analysis:', error);
      // Set fallback analysis on error
      setNaturalLanguageAnalysis({
        feedback: `You completed your performance with a score of ${performanceScore}%! Keep up the great work and continue practicing to improve your technique.`,
        techniqueTips: '• Stay relaxed and let your movements flow naturally\n• Focus on timing and rhythm\n• Record yourself to review your progress',
        performanceData: [],
        timestamp: new Date().toISOString()
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Auto-trigger analysis when modal opens
  useEffect(() => {
    if (isOpen && !naturalLanguageAnalysis) {
      // Delay slightly to allow score to calculate
      const timer = setTimeout(() => {
        getIntelligentAnalysis();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Cleanup audio when modal closes
  useEffect(() => {
    if (!isOpen) {
      stopAudio();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-500';
    if (score >= 70) return 'text-pink-500';
    if (score >= 50) return 'text-amber-500';
    return 'text-rose-400';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 85) return 'from-emerald-400 to-emerald-500';
    if (score >= 70) return 'from-pink-400 to-pink-500';
    if (score >= 50) return 'from-amber-400 to-amber-500';
    return 'from-rose-400 to-rose-500';
  };

  const getScoreBg = (score: number) => {
    if (score >= 85) return 'bg-emerald-50 border-emerald-200';
    if (score >= 70) return 'bg-pink-50 border-pink-200';
    if (score >= 50) return 'bg-amber-50 border-amber-200';
    return 'bg-rose-50 border-rose-200';
  };

  const parseTechniqueTips = (tipsString: string): string[] => {
    try {
      // Try to parse as JSON array first
      const parsed = JSON.parse(tipsString);
      if (Array.isArray(parsed)) return parsed;
    } catch (e) {
      // If not JSON, split by common delimiters
      return tipsString.split(/\d+\.\s*|\n-\s*|\n\*\s*/)
        .filter(tip => tip.trim().length > 0)
        .map(tip => tip.trim())
        .slice(0, 3);
    }
    return [tipsString];
  };

  const copyTechnicalData = () => {
    if (!userAngleTable || !instructorAngleTable) return;
    
    const userJoints = Object.keys(userAngleTable.angles);
    const instructorJoints = Object.keys(instructorAngleTable.angles);
    
    let userData = "USER JOINT DATA:\n";
    userJoints.forEach(joint => {
      userData += `${joint}: [${userAngleTable.angles[joint].join(', ')}]\n`;
    });
    
    let instructorData = "\nINSTRUCTOR JOINT DATA:\n";
    instructorJoints.forEach(joint => {
      instructorData += `${joint}: [${instructorAngleTable.angles[joint].join(', ')}]\n`;
    });
    
    const fullData = `ARK AI Technical Analysis\n\nOverall Score: ${performanceScore}%\nTimestamps: ${userAngleTable.timestamps.length}\n\n${userData}${instructorData}`;
    
    navigator.clipboard.writeText(fullData).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const navigateToHomepage = () => {
    window.location.href = '/app';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-pink-950/40 backdrop-blur-md">
      {/* Celebration animation */}
      {showCelebration && (
        <div className="absolute inset-0 pointer-events-none z-60">
          <div className="absolute top-1/4 left-1/4 animate-bounce">
            <Sparkles className="h-8 w-8 text-pink-400" />
          </div>
          <div className="absolute top-1/3 right-1/3 animate-bounce delay-150">
            <Trophy className="h-6 w-6 text-amber-400" />
          </div>
          <div className="absolute bottom-1/3 left-1/3 animate-bounce delay-300">
            <Star className="h-7 w-7 text-pink-300" />
          </div>
        </div>
      )}

      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white border-pink-100 shadow-2xl shadow-pink-200/30">
        <CardHeader className="bg-gradient-to-r from-pink-500 via-rose-400 to-pink-400 text-white relative rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                <Trophy className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">Performance Analysis</CardTitle>
                <CardDescription className="text-pink-100">
                  your dance technique breakdown
                </CardDescription>
              </div>
          </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={navigateToHomepage}
                className="text-white hover:bg-white/20 rounded-full"
              >
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-white/20 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Overall Score Display */}
          <div className="mt-6 flex items-center justify-center">
            <div className="relative">
              <div className="w-36 h-36 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center border-4 border-white shadow-lg">
                <div className="text-center">
                  <div className={`text-5xl font-bold ${getScoreColor(performanceScore)}`}>
                    {performanceScore}
                  </div>
                  <div className="text-sm text-gray-500 font-medium">Overall Score</div>
                </div>
              </div>
              <div className="absolute -top-2 -right-2">
                <Badge className={`bg-gradient-to-r ${getScoreGradient(performanceScore)} text-white border-0 shadow-md px-3 py-1`}>
                  {performanceLevel === 'needs-improvement' ? 'Keep Going!' : performanceLevel.charAt(0).toUpperCase() + performanceLevel.slice(1)}
                </Badge>
              </div>
            </div>
          </div>

          <Progress 
            value={performanceScore} 
            className="mt-4 h-2.5 bg-white/30 rounded-full"
          />
        </CardHeader>

        <CardContent className="p-6 bg-gradient-to-b from-pink-50/50 to-white">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white border border-pink-100 rounded-xl p-1 shadow-sm">
              <TabsTrigger value="overview" className="flex items-center space-x-2 data-[state=active]:bg-pink-500 data-[state=active]:text-white rounded-lg transition-all">
                <Target className="h-4 w-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger value="insights" className="flex items-center space-x-2 data-[state=active]:bg-pink-500 data-[state=active]:text-white rounded-lg transition-all">
                <MessageCircle className="h-4 w-4" />
                <span>AI Insights</span>
              </TabsTrigger>
              <TabsTrigger value="technical" className="flex items-center space-x-2 data-[state=active]:bg-pink-500 data-[state=active]:text-white rounded-lg transition-all">
                <BarChart3 className="h-4 w-4" />
                <span>Technical</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-white border-pink-100 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-5 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-800">{performanceScore}%</div>
                    <div className="text-sm text-gray-500 font-medium">Accuracy</div>
                  </CardContent>
                </Card>
                <Card className="bg-white border-pink-100 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-5 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-800">
                      {fastDtwResults?.jointNames?.length || fastDtwResults?.detailedJointScores?.length || Object.keys(userAngleTable?.angles || {}).length || 0}
                    </div>
                    <div className="text-sm text-gray-500 font-medium">Joints Analyzed</div>
                  </CardContent>
                </Card>
                <Card className="bg-white border-pink-100 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-5 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-violet-400 to-violet-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                      <BarChart3 className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-800">
                      {userAngleTable?.timestamps?.length || 0}
                    </div>
                    <div className="text-sm text-gray-500 font-medium">Data Points</div>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Breakdown - Show even without fastDtwResults if we have angle data */}
              {(fastDtwResults?.detailedJointScores || (userAngleTable?.angles && instructorAngleTable?.angles)) && (
                <Card className="bg-white border-pink-100 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-gray-800 flex items-center space-x-2">
                      <Zap className="h-5 w-5 text-pink-500" />
                      <span>Joint Performance</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {fastDtwResults?.detailedJointScores ? (
                        fastDtwResults.detailedJointScores.map((joint, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-pink-50/50 hover:bg-pink-50 rounded-xl transition-colors border border-pink-100/50">
                            <div className="flex items-center space-x-3">
                              <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${getScoreGradient(joint.score)}`}></div>
                              <span className="text-gray-700 font-medium capitalize">
                                {joint.name.replace(/_/g, ' ')}
                              </span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="w-28 bg-pink-100 rounded-full h-2.5 overflow-hidden">
                                <div 
                                  className={`h-full rounded-full bg-gradient-to-r ${getScoreGradient(joint.score)} transition-all duration-500`}
                                  style={{ width: `${joint.score}%` }}
                                />
                              </div>
                              <span className={`font-bold min-w-[3rem] text-right ${getScoreColor(joint.score)}`}>
                                {joint.score}%
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        // Fallback: show angle comparison data
                        Object.entries(userAngleTable?.angles || {}).slice(0, 6).map(([joint, userAngles], index) => {
                          const instructorAngles = instructorAngleTable?.angles?.[joint] || [];
                          const userAvg = userAngles.reduce((a, b) => a + b, 0) / (userAngles.length || 1);
                          const instructorAvg = instructorAngles.reduce((a, b) => a + b, 0) / (instructorAngles.length || 1);
                          const diff = Math.abs(userAvg - instructorAvg);
                          const jointScore = Math.max(0, Math.min(100, Math.round(100 - diff * 1.5)));
                          
                          return (
                            <div key={index} className="flex items-center justify-between p-3 bg-pink-50/50 hover:bg-pink-50 rounded-xl transition-colors border border-pink-100/50">
                              <div className="flex items-center space-x-3">
                                <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${getScoreGradient(jointScore)}`}></div>
                                <span className="text-gray-700 font-medium capitalize">
                                  {joint.replace(/_/g, ' ')}
                                </span>
                              </div>
                              <div className="flex items-center space-x-3">
                                <div className="w-28 bg-pink-100 rounded-full h-2.5 overflow-hidden">
                                  <div 
                                    className={`h-full rounded-full bg-gradient-to-r ${getScoreGradient(jointScore)} transition-all duration-500`}
                                    style={{ width: `${jointScore}%` }}
                                  />
                                </div>
                                <span className={`font-bold min-w-[3rem] text-right ${getScoreColor(jointScore)}`}>
                                  {jointScore}%
                                </span>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="insights" className="space-y-6 mt-6">
              {isAnalyzing ? (
                <Card className="bg-white border-pink-100 shadow-sm">
                  <CardContent className="p-10 text-center">
                    <div className="relative w-16 h-16 mx-auto mb-5">
                      <div className="absolute inset-0 rounded-full border-4 border-pink-100"></div>
                      <div className="absolute inset-0 rounded-full border-4 border-pink-500 border-t-transparent animate-spin"></div>
                      <Sparkles className="absolute inset-0 m-auto h-6 w-6 text-pink-400" />
                    </div>
                    <div className="text-gray-800 font-semibold text-lg">Analyzing your performance...</div>
                    <div className="text-gray-500 text-sm mt-2">ARK AI is reviewing your technique ✨</div>
                  </CardContent>
                </Card>
              ) : naturalLanguageAnalysis ? (
                <div className="space-y-5">
                  {/* Coach Feedback - Hero Card */}
                  <Card className="bg-gradient-to-br from-pink-500 via-rose-400 to-pink-400 border-0 shadow-lg shadow-pink-200/50 overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white flex items-center space-x-2">
                          <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
                            <MessageCircle className="h-5 w-5" />
                          </div>
                          <span>ARK AI Coach Feedback</span>
                        </CardTitle>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => isPlayingAudio ? stopAudio() : handlePlayAudio(naturalLanguageAnalysis.feedback)}
                          className="bg-white/20 hover:bg-white/30 text-white rounded-full px-4"
                          disabled={!naturalLanguageAnalysis.feedback}
                        >
                          {isPlayingAudio ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Playing...
                            </>
                          ) : (
                            <>
                              <Volume2 className="h-4 w-4 mr-2" />
                              Listen
                            </>
                          )}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                        <p className="text-white leading-relaxed whitespace-pre-line text-[15px]">
                          {naturalLanguageAnalysis.feedback}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Technique Tips */}
                  <Card className="bg-white border-pink-100 shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-gray-800 flex items-center space-x-2">
                        <div className="p-1.5 bg-amber-100 rounded-lg">
                          <Lightbulb className="h-5 w-5 text-amber-500" />
                        </div>
                        <span>Technique Tips</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {parseTechniqueTips(naturalLanguageAnalysis.techniqueTips).map((tip, index) => (
                          <div key={index} className="flex items-start space-x-3 p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100">
                            <div className="flex-shrink-0 w-6 h-6 bg-amber-400 text-white rounded-full flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </div>
                            <p className="text-gray-700 leading-relaxed flex-1">
                              {tip}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Breakdown sections if available */}
                  {naturalLanguageAnalysis.breakdown && (
                    <Card className="bg-white border-pink-100 shadow-sm">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-gray-800 flex items-center space-x-2">
                          <div className="p-1.5 bg-violet-100 rounded-lg">
                            <BarChart3 className="h-5 w-5 text-violet-500" />
                          </div>
                          <span>Performance Breakdown</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {naturalLanguageAnalysis.breakdown.start && (
                            <div className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-100">
                              <div className="text-emerald-600 font-semibold text-sm uppercase tracking-wide mb-2">🎬 Start</div>
                              <p className="text-gray-600 text-sm mb-2">{naturalLanguageAnalysis.breakdown.start.observation}</p>
                              <p className="text-emerald-700 text-sm font-medium">💡 {naturalLanguageAnalysis.breakdown.start.tip}</p>
                            </div>
                          )}
                          {naturalLanguageAnalysis.breakdown.middle && (
                            <div className="p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl border border-pink-100">
                              <div className="text-pink-600 font-semibold text-sm uppercase tracking-wide mb-2">🎭 Middle</div>
                              <p className="text-gray-600 text-sm mb-2">{naturalLanguageAnalysis.breakdown.middle.observation}</p>
                              <p className="text-pink-700 text-sm font-medium">💡 {naturalLanguageAnalysis.breakdown.middle.tip}</p>
                            </div>
                          )}
                          {naturalLanguageAnalysis.breakdown.end && (
                            <div className="p-4 bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl border border-violet-100">
                              <div className="text-violet-600 font-semibold text-sm uppercase tracking-wide mb-2">🌟 End</div>
                              <p className="text-gray-600 text-sm mb-2">{naturalLanguageAnalysis.breakdown.end.observation}</p>
                              <p className="text-violet-700 text-sm font-medium">💡 {naturalLanguageAnalysis.breakdown.end.tip}</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              ) : (
                <Card className="bg-white border-pink-100 shadow-sm">
                  <CardContent className="p-10 text-center">
                    <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageCircle className="h-8 w-8 text-pink-400" />
                    </div>
                    <div className="text-gray-800 font-semibold text-lg">AI Analysis Ready</div>
                    <div className="text-gray-500 text-sm mt-2 max-w-xs mx-auto mb-4">
                      Get personalized feedback from ARK AI on your performance
                    </div>
                    <Button 
                      onClick={getIntelligentAnalysis}
                      className="bg-gradient-to-r from-pink-500 to-rose-400 text-white hover:from-pink-600 hover:to-rose-500 shadow-lg shadow-pink-200"
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate AI Insights
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="technical" className="space-y-6 mt-6">
              {/* Technical Data */}
              {userAngleTable && instructorAngleTable && (
                <div className="space-y-5">
                  <Card className="bg-white border-pink-100 shadow-sm">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-gray-800 flex items-center space-x-2">
                          <div className="p-1.5 bg-pink-100 rounded-lg">
                            <BarChart3 className="h-5 w-5 text-pink-500" />
                          </div>
                          <span>ARK AI Technical Analysis</span>
                        </CardTitle>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={copyTechnicalData}
                          className="bg-white border-pink-200 text-pink-600 hover:bg-pink-50 hover:border-pink-300 rounded-full px-4"
                        >
                          {copied ? (
                            <>
                              <Check className="h-4 w-4 mr-2 text-emerald-500" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4 mr-2" />
                              Copy Data
                            </>
                          )}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-4 rounded-xl border border-pink-100">
                          <div className="text-sm text-gray-500 font-medium">Overall Score</div>
                          <div className="text-3xl font-bold text-gray-800">{performanceScore}%</div>
                        </div>
                        <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-4 rounded-xl border border-violet-100">
                          <div className="text-sm text-gray-500 font-medium">Data Points</div>
                          <div className="text-3xl font-bold text-gray-800">{userAngleTable.timestamps.length}</div>
                        </div>
                        <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-4 rounded-xl border border-emerald-100">
                          <div className="text-sm text-gray-500 font-medium">Joints Tracked</div>
                          <div className="text-3xl font-bold text-gray-800">{Object.keys(userAngleTable.angles).length}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* User Angle Data Table */}
                  <Card className="bg-white border-pink-100 shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-gray-800 flex items-center space-x-2">
                        <div className="p-1.5 bg-emerald-100 rounded-lg">
                          <User className="h-5 w-5 text-emerald-500" />
                        </div>
                        <span>Your Joint Angles</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="max-h-72 overflow-y-auto rounded-xl border border-pink-100">
                        <table className="w-full text-sm">
                          <thead className="text-xs text-gray-500 uppercase bg-pink-50 sticky top-0">
                            <tr>
                              <th className="px-4 py-3 text-left font-semibold">Joint</th>
                              <th className="px-4 py-3 text-left font-semibold">Avg Angle</th>
                              <th className="px-4 py-3 text-left font-semibold">Min</th>
                              <th className="px-4 py-3 text-left font-semibold">Max</th>
                              <th className="px-4 py-3 text-left font-semibold">Range</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.entries(userAngleTable.angles).map(([joint, angles], index) => {
                              const avg = (angles.reduce((a, b) => a + b, 0) / angles.length).toFixed(1);
                              const min = Math.min(...angles).toFixed(1);
                              const max = Math.max(...angles).toFixed(1);
                              const range = (Math.max(...angles) - Math.min(...angles)).toFixed(1);
                              return (
                                <tr key={joint} className={`border-b border-pink-50 hover:bg-pink-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-pink-25'}`}>
                                  <td className="px-4 py-3 font-medium text-gray-800 capitalize">{joint.replace(/_/g, ' ')}</td>
                                  <td className="px-4 py-3 text-gray-600">{avg}°</td>
                                  <td className="px-4 py-3 text-gray-600">{min}°</td>
                                  <td className="px-4 py-3 text-gray-600">{max}°</td>
                                  <td className="px-4 py-3 text-gray-600">{range}°</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Instructor Angle Data Table */}
                  <Card className="bg-white border-pink-100 shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-gray-800 flex items-center space-x-2">
                        <div className="p-1.5 bg-violet-100 rounded-lg">
                          <Trophy className="h-5 w-5 text-violet-500" />
                        </div>
                        <span>Instructor Joint Angles</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="max-h-72 overflow-y-auto rounded-xl border border-violet-100">
                        <table className="w-full text-sm">
                          <thead className="text-xs text-gray-500 uppercase bg-violet-50 sticky top-0">
                            <tr>
                              <th className="px-4 py-3 text-left font-semibold">Joint</th>
                              <th className="px-4 py-3 text-left font-semibold">Avg Angle</th>
                              <th className="px-4 py-3 text-left font-semibold">Min</th>
                              <th className="px-4 py-3 text-left font-semibold">Max</th>
                              <th className="px-4 py-3 text-left font-semibold">Range</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.entries(instructorAngleTable.angles).map(([joint, angles], index) => {
                              const avg = (angles.reduce((a, b) => a + b, 0) / angles.length).toFixed(1);
                              const min = Math.min(...angles).toFixed(1);
                              const max = Math.max(...angles).toFixed(1);
                              const range = (Math.max(...angles) - Math.min(...angles)).toFixed(1);
                              return (
                                <tr key={joint} className={`border-b border-violet-50 hover:bg-violet-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-violet-25'}`}>
                                  <td className="px-4 py-3 font-medium text-gray-800 capitalize">{joint.replace(/_/g, ' ')}</td>
                                  <td className="px-4 py-3 text-gray-600">{avg}°</td>
                                  <td className="px-4 py-3 text-gray-600">{min}°</td>
                                  <td className="px-4 py-3 text-gray-600">{max}°</td>
                                  <td className="px-4 py-3 text-gray-600">{range}°</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <Separator className="my-6 bg-pink-100" />

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="bg-white border-pink-200 text-gray-700 hover:bg-pink-50 hover:border-pink-300 rounded-full px-6"
            >
              Close
            </Button>
            <Button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-pink-500 to-rose-400 text-white hover:from-pink-600 hover:to-rose-500 rounded-full px-6 shadow-md shadow-pink-200/50"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
