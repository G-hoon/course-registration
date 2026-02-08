export interface EnrollmentResult {
  success: {
    enrollmentId: number;
    courseId: number;
    courseTitle: string;
  }[];
  failed: {
    courseId: number;
    reason: string;
  }[];
}
