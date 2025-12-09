// Pose Analysis Library for Dance Challenge
// This analyzes joint angles and positions from reference images

interface JointPosition {
  x: number;
  y: number;
  score?: number;
  name?: string;
}

interface PoseSignature {
  keyAngles: {
    leftKneeAngle?: number;
    rightKneeAngle?: number;
    leftHipAngle?: number;
    rightHipAngle?: number;
    leftElbowAngle?: number;
    rightElbowAngle?: number;
    leftShoulderAngle?: number;
    rightShoulderAngle?: number;
    leftAnkleHeight?: number; // relative to hip
    rightAnkleHeight?: number; // relative to hip
    leftWristHeight?: number; // relative to shoulder
    rightWristHeight?: number; // relative to shoulder
    stanceWidth?: number; // distance between feet
    torsoAngle?: number; // lean forward/back
  };
  tolerances: {
    angleTolerance: number; // degrees
    heightTolerance: number; // pixels
    stanceTolerance: number; // pixels
  };
}

interface PoseReferenceData {
  [poseName: string]: PoseSignature;
}

// Default pose reference data - stored locally for immediate functionality
// UPDATED FOR DANCE MOVES
const defaultPoseReferences: PoseReferenceData = {
  high_v: {
    keyAngles: {
      leftElbowAngle: 170, // Straight arm
      rightElbowAngle: 170, // Straight arm
      leftWristHeight: -100, // Above shoulder
      rightWristHeight: -100, // Above shoulder
      // Arms should be somewhat wide, not straight up like '11'
    },
    tolerances: {
      angleTolerance: 30,
      heightTolerance: 50,
      stanceTolerance: 30
    }
  },
  low_v: {
    keyAngles: {
      leftElbowAngle: 170,
      rightElbowAngle: 170,
      leftWristHeight: 100, // Below shoulder
      rightWristHeight: 100, // Below shoulder
    },
    tolerances: {
      angleTolerance: 30,
      heightTolerance: 50,
      stanceTolerance: 30
    }
  },
  t_pose: {
    keyAngles: {
      leftElbowAngle: 170,
      rightElbowAngle: 170,
      leftWristHeight: 0, // Level with shoulder
      rightWristHeight: 0, // Level with shoulder
    },
    tolerances: {
      angleTolerance: 25,
      heightTolerance: 30,
      stanceTolerance: 30
    }
  },
  left_l: {
    keyAngles: {
      leftElbowAngle: 170,
      leftWristHeight: -100, // Left arm Up
      rightElbowAngle: 170,
      rightWristHeight: 0, // Right arm Side
    },
    tolerances: {
      angleTolerance: 30,
      heightTolerance: 40,
      stanceTolerance: 30
    }
  },
  right_l: {
    keyAngles: {
      rightElbowAngle: 170,
      rightWristHeight: -100, // Right arm Up
      leftElbowAngle: 170,
      leftWristHeight: 0, // Left arm Side
    },
    tolerances: {
      angleTolerance: 30,
      heightTolerance: 40,
      stanceTolerance: 30
    }
  },
  // Rebranded 'punches' to 'reaches' for the Beat Striker challenge
  left_reach: {
    keyAngles: {
      leftElbowAngle: 160,
      leftWristHeight: -20, // Slightly above/at shoulder
      // right arm can be anywhere (guard or resting)
    },
    tolerances: {
      angleTolerance: 30,
      heightTolerance: 50,
      stanceTolerance: 40
    }
  },
  right_reach: {
    keyAngles: {
      rightElbowAngle: 160,
      rightWristHeight: -20,
    },
    tolerances: {
      angleTolerance: 30,
      heightTolerance: 50,
      stanceTolerance: 40
    }
  },
  disco_point_left: {
      keyAngles: {
          leftElbowAngle: 160,
          leftWristHeight: -100, // Up and across usually, but let's just say Up for now
          rightElbowAngle: 90, // Hand on hip/bent
      },
      tolerances: {
          angleTolerance: 40,
          heightTolerance: 60,
          stanceTolerance: 40
      }
  }
};

// Global reference store - now starts with default data
let poseReferences: PoseReferenceData = { ...defaultPoseReferences };

/**
 * Calculate angle between three points
 */
function calculateAngle(point1: JointPosition, point2: JointPosition, point3: JointPosition): number {
  const vector1 = { x: point1.x - point2.x, y: point1.y - point2.y };
  const vector2 = { x: point3.x - point2.x, y: point3.y - point2.y };
  
  const dot = vector1.x * vector2.x + vector1.y * vector2.y;
  const mag1 = Math.sqrt(vector1.x * vector1.x + vector1.y * vector1.y);
  const mag2 = Math.sqrt(vector2.x * vector2.x + vector2.y * vector2.y);
  
  const cosAngle = dot / (mag1 * mag2);
  const angle = Math.acos(Math.max(-1, Math.min(1, cosAngle))); // Clamp to avoid NaN
  
  return angle * (180 / Math.PI); // Convert to degrees
}

/**
 * Analyze keypoints from an image and extract pose signature
 */
export function analyzePoseFromKeypoints(keypoints: JointPosition[]): {
  angles: Record<string, number>;
  heights: Record<string, number>;
  measurements: Record<string, number>;
} {
  const angles: Record<string, number> = {};
  const heights: Record<string, number> = {};
  const measurements: Record<string, number> = {};

  // Find keypoints
  const getKeypoint = (name: string) => keypoints.find(kp => kp.name === name);
  
  const leftHip = getKeypoint('left_hip');
  const rightHip = getKeypoint('right_hip');
  const leftKnee = getKeypoint('left_knee');
  const rightKnee = getKeypoint('right_knee');
  const leftAnkle = getKeypoint('left_ankle');
  const rightAnkle = getKeypoint('right_ankle');
  const leftShoulder = getKeypoint('left_shoulder');
  const rightShoulder = getKeypoint('right_shoulder');
  const leftElbow = getKeypoint('left_elbow');
  const rightElbow = getKeypoint('right_elbow');
  const leftWrist = getKeypoint('left_wrist');
  const rightWrist = getKeypoint('right_wrist');

  // Calculate angles
  if (leftHip && leftKnee && leftAnkle) {
    angles.leftKneeAngle = calculateAngle(leftHip, leftKnee, leftAnkle);
  }
  if (rightHip && rightKnee && rightAnkle) {
    angles.rightKneeAngle = calculateAngle(rightHip, rightKnee, rightAnkle);
  }
  if (leftShoulder && leftElbow && leftWrist) {
    angles.leftElbowAngle = calculateAngle(leftShoulder, leftElbow, leftWrist);
  }
  if (rightShoulder && rightElbow && rightWrist) {
    angles.rightElbowAngle = calculateAngle(rightShoulder, rightElbow, rightWrist);
  }

  // Calculate heights (relative to hip level)
  const hipLevel = leftHip && rightHip ? (leftHip.y + rightHip.y) / 2 : 0;
  const shoulderLevel = leftShoulder && rightShoulder ? (leftShoulder.y + rightShoulder.y) / 2 : 0;

  if (leftAnkle && hipLevel) {
    heights.leftAnkleHeight = hipLevel - leftAnkle.y; // Negative = above hip
  }
  if (rightAnkle && hipLevel) {
    heights.rightAnkleHeight = hipLevel - rightAnkle.y; // Negative = above hip
  }
  if (leftWrist && shoulderLevel) {
    heights.leftWristHeight = shoulderLevel - leftWrist.y; // Negative = above shoulder
  }
  if (rightWrist && shoulderLevel) {
    heights.rightWristHeight = shoulderLevel - rightWrist.y; // Negative = above shoulder
  }

  // Calculate measurements
  if (leftAnkle && rightAnkle) {
    measurements.stanceWidth = Math.abs(leftAnkle.x - rightAnkle.x);
  }

  return { angles, heights, measurements };
}

/**
 * Compare user pose with reference pose signature
 */
export function comparePoseWithReference(
  userKeypoints: JointPosition[], 
  referencePoseName: string
): {
  match: boolean;
  confidence: number;
  details: Record<string, { expected: number; actual: number; withinTolerance: boolean }>;
} {
  const reference = poseReferences[referencePoseName];
  if (!reference) {
    return { match: false, confidence: 0, details: {} };
  }

  // Check if keypoints have sufficient confidence (default minimum 0.6)
  const minConfidence = 0.6;
  const availableKeypoints = userKeypoints.filter(kp => (kp.score || 0) >= minConfidence);
  
  if (availableKeypoints.length < 3) {
    console.log(`Insufficient keypoints with confidence >= ${minConfidence} for ${referencePoseName}`);
    return { match: false, confidence: 0, details: {} };
  }

  // Analyze user pose
  const userAnalysis = analyzePoseFromKeypoints(userKeypoints);
  const details: Record<string, { expected: number; actual: number; withinTolerance: boolean }> = {};
  
  let totalChecks = 0;
  let passedChecks = 0;

  // Check angles
  Object.entries(reference.keyAngles).forEach(([angleName, expectedValue]) => {
    if (expectedValue !== undefined) {
      totalChecks++;
      
      let actualValue: number | undefined;
      
      if (angleName.endsWith('Angle')) {
        actualValue = userAnalysis.angles[angleName];
      } else if (angleName.endsWith('Height')) {
        actualValue = userAnalysis.heights[angleName];
      } else if (angleName.endsWith('Width')) {
        actualValue = userAnalysis.measurements[angleName];
      }

      if (actualValue !== undefined) {
        const tolerance = angleName.endsWith('Angle') ? reference.tolerances.angleTolerance :
                         angleName.endsWith('Height') ? reference.tolerances.heightTolerance :
                         reference.tolerances.stanceTolerance;
        
        const difference = Math.abs(actualValue - expectedValue);
        const withinTolerance = difference <= tolerance;
        
        details[angleName] = {
          expected: expectedValue,
          actual: actualValue,
          withinTolerance
        };

        if (withinTolerance) {
          passedChecks++;
        }
      } else {
        details[angleName] = {
          expected: expectedValue,
          actual: 0,
          withinTolerance: false
        };
      }
    }
  });

  const confidence = totalChecks > 0 ? passedChecks / totalChecks : 0;
  const match = confidence >= 0.7; // 70% of measurements must be within tolerance

  return { match, confidence, details };
}

/**
 * Detect dance pose from user keypoints
 */
export function detectDancePoseAdvanced(keypoints: JointPosition[]): {
  pose: string | null;
  confidence: number;
  allResults: Array<{ pose: string; confidence: number }>;
} {
  const results: Array<{ pose: string; confidence: number }> = [];

  // Test against all reference poses
  Object.keys(poseReferences).forEach(poseName => {
    const comparison = comparePoseWithReference(keypoints, poseName);
    results.push({
      pose: poseName,
      confidence: comparison.confidence
    });
  });

  // Sort by confidence
  results.sort((a, b) => b.confidence - a.confidence);
  
  const bestMatch = results[0];
  const detectedPose = bestMatch && bestMatch.confidence >= 0.7 ? bestMatch.pose : null;

  return {
    pose: detectedPose,
    confidence: bestMatch ? bestMatch.confidence : 0,
    allResults: results
  };
}

/**
 * Update reference pose from analyzed image data
 */
export function updateReferencePose(poseName: string, analyzedData: {
  angles: Record<string, number>;
  heights: Record<string, number>;
  measurements: Record<string, number>;
}) {
  if (poseReferences[poseName]) {
    // Update the reference with analyzed data
    const updatedAngles: any = {};
    
    Object.entries(analyzedData.angles).forEach(([key, value]) => {
      updatedAngles[key] = value;
    });
    Object.entries(analyzedData.heights).forEach(([key, value]) => {
      updatedAngles[key] = value;
    });
    Object.entries(analyzedData.measurements).forEach(([key, value]) => {
      updatedAngles[key] = value;
    });

    poseReferences[poseName].keyAngles = { ...poseReferences[poseName].keyAngles, ...updatedAngles };
    
    console.log(`Updated reference pose ${poseName}:`, poseReferences[poseName]);
  }
}

/**
 * Get all available reference poses
 */
export function getAvailablePoses(): string[] {
  return Object.keys(poseReferences);
}

/**
 * Get reference pose details
 */
export function getReferencePose(poseName: string): PoseSignature | null {
  return poseReferences[poseName] || null;
}

/**
 * Generate English feedback based on pose analysis
 */
export function getFeedbackForPose(
  poseName: string, 
  analysis: { 
    match: boolean; 
    confidence: number; 
    details: Record<string, { expected: number; actual: number; withinTolerance: boolean }> 
  }
): string[] {
  const feedback: string[] = [];
  const details = analysis.details;

  if (analysis.match) {
    feedback.push("Excellent form!");
    return feedback;
  }

  // Generate specific feedback based on the biggest deviations
  Object.entries(details).forEach(([key, detail]) => {
    if (!detail.withinTolerance) {
      const diff = detail.actual - detail.expected;
      const absDiff = Math.abs(diff);

      if (key.includes('ElbowAngle')) {
        const arm = key.includes('left') ? 'Left' : 'Right';
        if (detail.expected > 150) { // Expecting straight arm
           if (detail.actual < detail.expected) {
             feedback.push(`Straighten your ${arm} arm more.`);
           }
        } else if (detail.expected < 100) { // Expecting bent arm
           if (detail.actual > detail.expected) {
             feedback.push(`Bend your ${arm} elbow more.`);
           }
        }
      } else if (key.includes('KneeAngle')) {
        const leg = key.includes('left') ? 'Left' : 'Right';
        if (detail.expected > 150) { // Expecting straight leg
           if (detail.actual < detail.expected) {
             feedback.push(`Straighten your ${leg} leg.`);
           }
        } else if (detail.expected < 100) { // Expecting bent leg
           if (detail.actual > detail.expected) {
             feedback.push(`Bend your ${leg} knee deeper.`);
           }
        }
      } else if (key.includes('WristHeight')) {
        const arm = key.includes('left') ? 'Left' : 'Right';
        // Height is relative to shoulder (negative is above)
        if (diff > 0) { // Actual is higher number (lower visually) than expected
          feedback.push(`Raise your ${arm} hand higher.`);
        } else {
          feedback.push(`Lower your ${arm} hand slightly.`);
        }
      } else if (key.includes('stanceWidth')) {
        if (diff < 0) { // Actual < Expected
          feedback.push("Widen your stance.");
        } else {
          feedback.push("Bring your feet closer.");
        }
      }
    }
  });

  // Limit feedback to top 2 most important corrections to avoid overwhelming
  return feedback.slice(0, 2);
}
 