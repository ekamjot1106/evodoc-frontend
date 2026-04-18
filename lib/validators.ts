import { z } from "zod";

export const patientIntakeSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  dob: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["Female", "Male", "Non-binary"], {
    required_error: "Gender is required"
  }),
  phone: z.string().min(8, "Phone is required"),
  email: z.string().email("Enter a valid email"),
  address: z.string().min(5, "Address is required"),
  emergencyContactName: z.string().min(2, "Emergency contact name is required"),
  emergencyContactPhone: z.string().min(8, "Emergency contact phone is required"),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
    required_error: "Blood group is required"
  }),
  allergies: z.string().optional(),
  chronicConditions: z.string().optional(),
  currentMedications: z.string().optional()
});

export const appointmentBookingSchema = z
  .object({
    patientMode: z.enum(["existing", "new"]),
    patientId: z.string().optional(),
    newPatientName: z.string().optional(),
    newPatientPhone: z.string().optional(),
    doctorId: z.string().min(1, "Doctor is required"),
    date: z.string().min(1, "Date is required"),
    time: z.string().min(1, "Time is required"),
    type: z.enum([
      "General Consultation",
      "Follow-up",
      "Cardiac Review",
      "Dermatology Check",
      "Lab Discussion",
      "Teleconsultation"
    ]),
    notes: z.string().max(240, "Notes must be under 240 characters").optional()
  })
  .refine(
    (value) => {
      if (value.patientMode === "existing") {
        return Boolean(value.patientId);
      }
      return Boolean(value.newPatientName && value.newPatientPhone);
    },
    {
      message: "Provide existing patient or complete new patient details",
      path: ["patientId"]
    }
  );

export type PatientIntakeValues = z.infer<typeof patientIntakeSchema>;
export type AppointmentBookingValues = z.infer<typeof appointmentBookingSchema>;

