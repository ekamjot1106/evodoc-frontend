export type Gender = "Female" | "Male" | "Non-binary";

export type BloodGroup =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "AB+"
  | "AB-"
  | "O+"
  | "O-";

export type AppointmentStatus = "Scheduled" | "Completed" | "Cancelled";

export type AppointmentType =
  | "General Consultation"
  | "Follow-up"
  | "Cardiac Review"
  | "Dermatology Check"
  | "Lab Discussion"
  | "Teleconsultation";

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  yearsExperience: number;
  email: string;
  phone: string;
  avatarColor: string;
}

export interface EmergencyContact {
  name: string;
  phone: string;
}

export interface Patient {
  id: string;
  fullName: string;
  dob: string;
  gender: Gender;
  phone: string;
  email: string;
  address: string;
  emergencyContact: EmergencyContact;
  bloodGroup: BloodGroup;
  allergies: string[];
  chronicConditions: string[];
  currentMedications: string[];
  medicalHistory: string[];
  visitNotes: string[];
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  startsAt: string;
  status: AppointmentStatus;
  type: AppointmentType;
  notes: string;
  fee: number;
  isNewPatient: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  severity: "info" | "warning" | "success";
}

export interface AppointmentView extends Appointment {
  patientName: string;
  doctorName: string;
  doctorSpecialty: string;
}

