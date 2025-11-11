import React from 'react';
import { useLocation } from "wouter";
import { ArrowLeft } from 'lucide-react';

const Challenges: React.FC = () => {
  const [, navigate] = useLocation();

  const challenges = [
    {
      id: 1,
      title: "challenge one",
      description: "test your skills with this challenge",
      difficulty: "easy"
    },
    {
      id: 2,
      title: "challenge two",
      description: "a more difficult challenge",
      difficulty: "medium"
    },
    {
      id: 3,
      title: "challenge three",
      description: "for advanced users",
      difficulty: "hard"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4 flex items-center">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-900 hover:text-gray-600 font-medium"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> back
        </button>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            challenges
          </h1>
          <p className="text-gray-600 text-lg mb-12">
            push yourself with these fun challenges
          </p>

          {/* Challenges Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {challenges.map((challenge) => (
              <div
                key={challenge.id}
                className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors cursor-pointer"
              >
                <h3 className="text-xl font-medium mb-2 text-gray-900">
                  {challenge.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {challenge.description}
                </p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                  challenge.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                  challenge.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {challenge.difficulty}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenges;
