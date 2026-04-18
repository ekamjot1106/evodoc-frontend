"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormField } from "@/components/form-field";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { patientIntakeSchema, type PatientIntakeValues } from "@/lib/validators";

const defaultValues: PatientIntakeValues = {
  fullName: "",
  dob: "",
  gender: "Female",
  phone: "",
  email: "",
  address: "",
  emergencyContactName: "",
  emergencyContactPhone: "",
  bloodGroup: "A+",
  allergies: "",
  chronicConditions: "",
  currentMedications: ""
};

export default function PatientIntakePage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<PatientIntakeValues>({
    resolver: zodResolver(patientIntakeSchema),
    defaultValues
  });

  const onSubmit = async (values: PatientIntakeValues) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    toast.success(`Patient intake saved for ${values.fullName}`);
    reset(defaultValues);
  };

  return (
    <div className="space-y-7">
      <PageHeader
        title="Patient Intake"
        description="Register complete patient details for smooth triage and safer clinical handoff."
      />

      <motion.form
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-5 md:grid-cols-2">
            <FormField id="fullName" label="Full name" required error={errors.fullName?.message}>
              <Input id="fullName" placeholder="Enter patient full name" {...register("fullName")} />
            </FormField>
            <FormField id="dob" label="Date of birth" required error={errors.dob?.message}>
              <Input id="dob" type="date" {...register("dob")} />
            </FormField>
            <FormField id="gender" label="Gender" required error={errors.gender?.message}>
              <Select id="gender" {...register("gender")}>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Non-binary">Non-binary</option>
              </Select>
            </FormField>
            <FormField id="bloodGroup" label="Blood group" required error={errors.bloodGroup?.message}>
              <Select id="bloodGroup" {...register("bloodGroup")}>
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </Select>
            </FormField>
            <FormField id="phone" label="Phone" required error={errors.phone?.message}>
              <Input id="phone" placeholder="+1 (555) 000-0000" {...register("phone")} />
            </FormField>
            <FormField id="email" label="Email" required error={errors.email?.message}>
              <Input id="email" type="email" placeholder="patient@email.com" {...register("email")} />
            </FormField>
            <div className="md:col-span-2">
              <FormField id="address" label="Address" required error={errors.address?.message}>
                <Textarea id="address" rows={2} placeholder="Street, city, state" {...register("address")} />
              </FormField>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Emergency Contact</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-5 md:grid-cols-2">
            <FormField
              id="emergencyContactName"
              label="Emergency contact name"
              required
              error={errors.emergencyContactName?.message}
            >
              <Input id="emergencyContactName" placeholder="Contact person" {...register("emergencyContactName")} />
            </FormField>
            <FormField
              id="emergencyContactPhone"
              label="Emergency contact phone"
              required
              error={errors.emergencyContactPhone?.message}
            >
              <Input id="emergencyContactPhone" placeholder="+1 (555) 000-0000" {...register("emergencyContactPhone")} />
            </FormField>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Clinical Context</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-5">
            <FormField id="allergies" label="Allergies" error={errors.allergies?.message}>
              <Textarea id="allergies" rows={2} placeholder="Comma-separated allergies" {...register("allergies")} />
            </FormField>
            <FormField
              id="chronicConditions"
              label="Chronic conditions"
              error={errors.chronicConditions?.message}
            >
              <Textarea
                id="chronicConditions"
                rows={2}
                placeholder="Known long-term conditions"
                {...register("chronicConditions")}
              />
            </FormField>
            <FormField
              id="currentMedications"
              label="Current medications"
              error={errors.currentMedications?.message}
            >
              <Textarea
                id="currentMedications"
                rows={2}
                placeholder="Medication list and dosages"
                {...register("currentMedications")}
              />
            </FormField>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting} className="rounded-xl px-6">
            <Save className="mr-2 h-4 w-4" />
            {isSubmitting ? "Saving..." : "Save Intake"}
          </Button>
        </div>
      </motion.form>
    </div>
  );
}

