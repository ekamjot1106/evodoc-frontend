import type { Appointment, AppointmentView, Doctor, NotificationItem, Patient } from "@/types";

const makeDateTime = (dayOffset: number, hour: number, minute = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + dayOffset);
  date.setHours(hour, minute, 0, 0);
  return date.toISOString();
};

export const doctors: Doctor[] = [
  {
    id: "doc-1",
    name: "Dr. Sarah Williams",
    specialty: "Cardiology",
    yearsExperience: 14,
    email: "sarah.williams@evodoc.health",
    phone: "+1 (415) 555-0121",
    avatarColor: "bg-blue-100 text-blue-700"
  },
  {
    id: "doc-2",
    name: "Dr. David Chen",
    specialty: "General Medicine",
    yearsExperience: 11,
    email: "david.chen@evodoc.health",
    phone: "+1 (415) 555-0122",
    avatarColor: "bg-emerald-100 text-emerald-700"
  },
  {
    id: "doc-3",
    name: "Dr. Priya Sharma",
    specialty: "Dermatology",
    yearsExperience: 9,
    email: "priya.sharma@evodoc.health",
    phone: "+1 (415) 555-0123",
    avatarColor: "bg-cyan-100 text-cyan-700"
  }
];

export const patients: Patient[] = [
  {
    id: "pat-1001",
    fullName: "Emma Johnson",
    dob: "1992-04-11",
    gender: "Female",
    phone: "+1 (415) 555-1011",
    email: "emma.johnson@email.com",
    address: "420 Pine St, San Francisco, CA",
    emergencyContact: { name: "Michael Johnson", phone: "+1 (415) 555-3351" },
    bloodGroup: "A+",
    allergies: ["Penicillin"],
    chronicConditions: ["Hypertension"],
    currentMedications: ["Losartan 50mg"],
    medicalHistory: ["Family history of CAD", "Mild arrhythmia (2024)"],
    visitNotes: ["Stable vitals during last follow-up"]
  },
  {
    id: "pat-1002",
    fullName: "Lucas Martinez",
    dob: "1986-09-08",
    gender: "Male",
    phone: "+1 (415) 555-1012",
    email: "lucas.martinez@email.com",
    address: "90 Market St, San Francisco, CA",
    emergencyContact: { name: "Ariana Martinez", phone: "+1 (415) 555-3352" },
    bloodGroup: "O+",
    allergies: ["Shellfish"],
    chronicConditions: ["Type 2 Diabetes"],
    currentMedications: ["Metformin 500mg"],
    medicalHistory: ["HbA1c improved from 8.1 to 7.3"],
    visitNotes: ["Advised dietary tracking"]
  },
  {
    id: "pat-1003",
    fullName: "Sophia Reed",
    dob: "1998-01-27",
    gender: "Female",
    phone: "+1 (415) 555-1013",
    email: "sophia.reed@email.com",
    address: "155 Mission Bay Blvd, San Francisco, CA",
    emergencyContact: { name: "Nora Reed", phone: "+1 (415) 555-3353" },
    bloodGroup: "B+",
    allergies: ["None"],
    chronicConditions: ["Eczema"],
    currentMedications: ["Hydrocortisone cream"],
    medicalHistory: ["Recurring seasonal flare-ups"],
    visitNotes: ["Recommended moisturizer schedule"]
  },
  {
    id: "pat-1004",
    fullName: "Noah Patel",
    dob: "1979-12-14",
    gender: "Male",
    phone: "+1 (415) 555-1014",
    email: "noah.patel@email.com",
    address: "812 Lakeview Ave, Oakland, CA",
    emergencyContact: { name: "Mira Patel", phone: "+1 (415) 555-3354" },
    bloodGroup: "AB+",
    allergies: ["Latex"],
    chronicConditions: ["Hyperlipidemia"],
    currentMedications: ["Atorvastatin 20mg"],
    medicalHistory: ["Cardio risk screening 2025"],
    visitNotes: ["Encouraged exercise adherence"]
  },
  {
    id: "pat-1005",
    fullName: "Olivia Thompson",
    dob: "2001-05-22",
    gender: "Female",
    phone: "+1 (415) 555-1015",
    email: "olivia.thompson@email.com",
    address: "25 Berry St, San Francisco, CA",
    emergencyContact: { name: "Liam Thompson", phone: "+1 (415) 555-3355" },
    bloodGroup: "O-",
    allergies: ["Peanuts"],
    chronicConditions: ["Asthma"],
    currentMedications: ["Albuterol inhaler"],
    medicalHistory: ["ER visit in 2023 for wheezing"],
    visitNotes: ["Symptoms controlled"]
  },
  {
    id: "pat-1006",
    fullName: "Ethan Brooks",
    dob: "1990-03-19",
    gender: "Male",
    phone: "+1 (415) 555-1016",
    email: "ethan.brooks@email.com",
    address: "730 Clement St, San Francisco, CA",
    emergencyContact: { name: "Clara Brooks", phone: "+1 (415) 555-3356" },
    bloodGroup: "A-",
    allergies: ["None"],
    chronicConditions: ["Migraine"],
    currentMedications: ["Sumatriptan as needed"],
    medicalHistory: ["Headache diary maintained"],
    visitNotes: ["Reduced attack frequency"]
  },
  {
    id: "pat-1007",
    fullName: "Ava Nguyen",
    dob: "1988-07-30",
    gender: "Female",
    phone: "+1 (415) 555-1017",
    email: "ava.nguyen@email.com",
    address: "400 7th St, San Francisco, CA",
    emergencyContact: { name: "Minh Nguyen", phone: "+1 (415) 555-3357" },
    bloodGroup: "B-",
    allergies: ["Sulfa drugs"],
    chronicConditions: ["Hypothyroidism"],
    currentMedications: ["Levothyroxine 75mcg"],
    medicalHistory: ["TSH stable for 2 years"],
    visitNotes: ["Continue current dosage"]
  },
  {
    id: "pat-1008",
    fullName: "Mason Clark",
    dob: "1995-10-04",
    gender: "Male",
    phone: "+1 (415) 555-1018",
    email: "mason.clark@email.com",
    address: "88 Fremont St, San Francisco, CA",
    emergencyContact: { name: "Grace Clark", phone: "+1 (415) 555-3358" },
    bloodGroup: "AB-",
    allergies: ["Dust mites"],
    chronicConditions: ["Psoriasis"],
    currentMedications: ["Topical calcipotriene"],
    medicalHistory: ["Patch testing completed"],
    visitNotes: ["Mild improvement on elbows"]
  },
  {
    id: "pat-1009",
    fullName: "Isabella Rivera",
    dob: "1974-11-29",
    gender: "Female",
    phone: "+1 (415) 555-1019",
    email: "isabella.rivera@email.com",
    address: "101 Ocean Ave, San Francisco, CA",
    emergencyContact: { name: "Carlos Rivera", phone: "+1 (415) 555-3359" },
    bloodGroup: "A+",
    allergies: ["Iodine contrast"],
    chronicConditions: ["Atrial fibrillation"],
    currentMedications: ["Apixaban 5mg"],
    medicalHistory: ["Cardioversion in 2022"],
    visitNotes: ["Rhythm currently controlled"]
  },
  {
    id: "pat-1010",
    fullName: "Daniel Kim",
    dob: "1983-02-16",
    gender: "Male",
    phone: "+1 (415) 555-1020",
    email: "daniel.kim@email.com",
    address: "640 Valencia St, San Francisco, CA",
    emergencyContact: { name: "Jenna Kim", phone: "+1 (415) 555-3360" },
    bloodGroup: "O+",
    allergies: ["None"],
    chronicConditions: ["GERD"],
    currentMedications: ["Omeprazole 20mg"],
    medicalHistory: ["Symptoms after spicy meals"],
    visitNotes: ["Lifestyle counseling provided"]
  },
  {
    id: "pat-1011",
    fullName: "Charlotte Evans",
    dob: "1997-06-12",
    gender: "Female",
    phone: "+1 (415) 555-1021",
    email: "charlotte.evans@email.com",
    address: "52 Divisadero St, San Francisco, CA",
    emergencyContact: { name: "Ethan Evans", phone: "+1 (415) 555-3361" },
    bloodGroup: "B+",
    allergies: ["Nickel"],
    chronicConditions: ["Acne"],
    currentMedications: ["Topical adapalene"],
    medicalHistory: ["Completed oral antibiotic course in 2025"],
    visitNotes: ["Skin texture improving"]
  },
  {
    id: "pat-1012",
    fullName: "Henry Walker",
    dob: "1969-08-03",
    gender: "Male",
    phone: "+1 (415) 555-1022",
    email: "henry.walker@email.com",
    address: "980 Polk St, San Francisco, CA",
    emergencyContact: { name: "Nina Walker", phone: "+1 (415) 555-3362" },
    bloodGroup: "O-",
    allergies: ["Aspirin"],
    chronicConditions: ["Coronary artery disease"],
    currentMedications: ["Bisoprolol 5mg", "Clopidogrel 75mg"],
    medicalHistory: ["Stent placement in 2021"],
    visitNotes: ["No chest pain reported this month"]
  }
];

export const appointments: Appointment[] = [
  {
    id: "apt-5001",
    patientId: "pat-1001",
    doctorId: "doc-1",
    startsAt: makeDateTime(0, 9, 0),
    status: "Scheduled",
    type: "Cardiac Review",
    notes: "Blood pressure variability follow-up",
    fee: 240,
    isNewPatient: false
  },
  {
    id: "apt-5002",
    patientId: "pat-1002",
    doctorId: "doc-2",
    startsAt: makeDateTime(0, 9, 30),
    status: "Scheduled",
    type: "General Consultation",
    notes: "Diabetes medication adjustment",
    fee: 180,
    isNewPatient: false
  },
  {
    id: "apt-5003",
    patientId: "pat-1003",
    doctorId: "doc-3",
    startsAt: makeDateTime(0, 10, 0),
    status: "Scheduled",
    type: "Dermatology Check",
    notes: "Seasonal rash review",
    fee: 160,
    isNewPatient: false
  },
  {
    id: "apt-5004",
    patientId: "pat-1004",
    doctorId: "doc-1",
    startsAt: makeDateTime(0, 11, 15),
    status: "Cancelled",
    type: "Follow-up",
    notes: "Patient requested reschedule",
    fee: 200,
    isNewPatient: false
  },
  {
    id: "apt-5005",
    patientId: "pat-1005",
    doctorId: "doc-2",
    startsAt: makeDateTime(0, 12, 0),
    status: "Scheduled",
    type: "Teleconsultation",
    notes: "Asthma symptom check",
    fee: 140,
    isNewPatient: true
  },
  {
    id: "apt-5006",
    patientId: "pat-1006",
    doctorId: "doc-2",
    startsAt: makeDateTime(-1, 15, 0),
    status: "Completed",
    type: "General Consultation",
    notes: "Migraine episode follow-up",
    fee: 175,
    isNewPatient: false
  },
  {
    id: "apt-5007",
    patientId: "pat-1007",
    doctorId: "doc-2",
    startsAt: makeDateTime(-2, 16, 30),
    status: "Completed",
    type: "Lab Discussion",
    notes: "Thyroid panel interpretation",
    fee: 130,
    isNewPatient: false
  },
  {
    id: "apt-5008",
    patientId: "pat-1008",
    doctorId: "doc-3",
    startsAt: makeDateTime(1, 10, 30),
    status: "Scheduled",
    type: "Dermatology Check",
    notes: "Psoriasis flare review",
    fee: 165,
    isNewPatient: false
  },
  {
    id: "apt-5009",
    patientId: "pat-1009",
    doctorId: "doc-1",
    startsAt: makeDateTime(1, 13, 0),
    status: "Scheduled",
    type: "Follow-up",
    notes: "AFib rhythm check",
    fee: 230,
    isNewPatient: false
  },
  {
    id: "apt-5010",
    patientId: "pat-1010",
    doctorId: "doc-2",
    startsAt: makeDateTime(2, 14, 15),
    status: "Scheduled",
    type: "General Consultation",
    notes: "GERD symptoms recurring",
    fee: 170,
    isNewPatient: true
  },
  {
    id: "apt-5011",
    patientId: "pat-1011",
    doctorId: "doc-3",
    startsAt: makeDateTime(-4, 11, 45),
    status: "Completed",
    type: "Follow-up",
    notes: "Acne regimen follow-up",
    fee: 150,
    isNewPatient: false
  },
  {
    id: "apt-5012",
    patientId: "pat-1012",
    doctorId: "doc-1",
    startsAt: makeDateTime(-5, 9, 15),
    status: "Completed",
    type: "Cardiac Review",
    notes: "Exercise tolerance monitoring",
    fee: 260,
    isNewPatient: false
  },
  {
    id: "apt-5013",
    patientId: "pat-1002",
    doctorId: "doc-2",
    startsAt: makeDateTime(3, 9, 45),
    status: "Scheduled",
    type: "Follow-up",
    notes: "Metformin response review",
    fee: 170,
    isNewPatient: false
  },
  {
    id: "apt-5014",
    patientId: "pat-1001",
    doctorId: "doc-1",
    startsAt: makeDateTime(4, 11, 30),
    status: "Scheduled",
    type: "Cardiac Review",
    notes: "ECG review",
    fee: 250,
    isNewPatient: false
  },
  {
    id: "apt-5015",
    patientId: "pat-1003",
    doctorId: "doc-3",
    startsAt: makeDateTime(5, 15, 0),
    status: "Scheduled",
    type: "Dermatology Check",
    notes: "Patch test follow-up",
    fee: 160,
    isNewPatient: false
  },
  {
    id: "apt-5016",
    patientId: "pat-1005",
    doctorId: "doc-2",
    startsAt: makeDateTime(-6, 10, 0),
    status: "Cancelled",
    type: "Teleconsultation",
    notes: "Connectivity issue",
    fee: 140,
    isNewPatient: true
  }
];

export const notifications: NotificationItem[] = [
  {
    id: "note-1",
    title: "Lab results pending",
    message: "2 CBC reports are pending verification before 3 PM.",
    createdAt: makeDateTime(0, 8, 10),
    severity: "warning"
  },
  {
    id: "note-2",
    title: "Medication refill alert",
    message: "Emma Johnson requested refill approval for Losartan.",
    createdAt: makeDateTime(0, 7, 55),
    severity: "info"
  },
  {
    id: "note-3",
    title: "Follow-up target achieved",
    message: "This week's patient follow-up completion crossed 92%.",
    createdAt: makeDateTime(-1, 18, 0),
    severity: "success"
  }
];

export function getAppointmentViews(source: Appointment[] = appointments): AppointmentView[] {
  return source.map((appointment) => {
    const patient = patients.find((item) => item.id === appointment.patientId);
    const doctor = doctors.find((item) => item.id === appointment.doctorId);

    return {
      ...appointment,
      patientName: patient?.fullName ?? "Unknown patient",
      doctorName: doctor?.name ?? "Unknown doctor",
      doctorSpecialty: doctor?.specialty ?? "Unknown specialty"
    };
  });
}

export function getDoctorById(id: string) {
  return doctors.find((doctor) => doctor.id === id);
}

export function getPatientById(id: string) {
  return patients.find((patient) => patient.id === id);
}

