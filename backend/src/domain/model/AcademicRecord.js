class AcademicRecord {
  constructor({ recordId, enrollmentId, assessmentType, scoreObtained, maximumScore = 100, weightagePercentage = 0, feedbackRemarks = '' }) {
    this.recordId = recordId;
    this.enrollmentId = enrollmentId;
    this.assessmentType = assessmentType;
    this.maximumScore = Number(maximumScore);
    this.scoreObtained = Number(scoreObtained);
    this.weightagePercentage = Number(weightagePercentage);
    this.feedbackRemarks = feedbackRemarks;
    this.validateScores();
  }

  validateScores() {
    if (this.maximumScore <= 0) {
      throw new Error('Maximum score must be greater than zero.');
    }
    if (this.scoreObtained < 0 || this.scoreObtained > this.maximumScore) {
      throw new Error(`Score obtained (${this.scoreObtained}) must be between 0 and maximum score (${this.maximumScore}).`);
    }
  }

  updateScore(newScore) {
    this.scoreObtained = Number(newScore);
    this.validateScores();
  }

  calculatePercentage() {
    return (this.scoreObtained / this.maximumScore) * 100;
  }

  toJSON() {
    return {
      recordId: this.recordId,
      enrollmentId: this.enrollmentId,
      assessmentType: this.assessmentType,
      scoreObtained: this.scoreObtained,
      maximumScore: this.maximumScore,
      percentage: Number(this.calculatePercentage().toFixed(1)),
      weightagePercentage: this.weightagePercentage,
      feedbackRemarks: this.feedbackRemarks
    };
  }
}

module.exports = AcademicRecord;
