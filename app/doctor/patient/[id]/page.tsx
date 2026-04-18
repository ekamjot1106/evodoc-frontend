"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save, ShieldCheck, UserRound } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { getAppointmentViews, patients } from "@/data/mock-data";
import { calculateAge } from "@/lib/utils";

export default function DoctorPatientDetailsPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const patientId = Array.isArray(params.id) ? params.id[0] : params.id;
  const patient = patients.find((item) => item.id === patientId);
  const [clinicalNote, setClinicalNote] = useState("");
  const [visitNotes, setVisitNotes] = useState<string[]>(patient?.visitNotes ?? []);

  const recentAppointments = useMemo(
    () => getAppointmentViews().filter((item) => item.patientId === patientId).slice(0, 3),
    [patientId]
  );

  if (!patient) {
    return (
      <EmptyState
        icon={UserRound}
        title="Patient record unavailable"
        description="The selected patient ID does not exist in the current workspace."
        actionLabel="Back to appointments"
        onAction={() => router.push("/doctor/appointments")}
      />
    );
  }

  const saveClinicalNote = () => {
    if (!clinicalNote.trim()) {
      toast.error("Please write a note before saving.");
      return;
    }

    setVisitNotes((current) => [`${new Date().toLocaleDateString()} - ${clinicalNote}`, ...current]);
    setClinicalNote("");
    toast.success("Clinical note saved successfully.");
  };

  const updateRecords = () => {
    toast.success(`Patient record for ${patient.fullName} updated.`);
  };

  return (
    <div className="space-y-7">
      <PageHeader
        title="Patient Details"
        description="Review demographics, history, and notes before consultation."
        actions={
          <Button asChild variant="outline" className="rounded-xl">
            <Link href="/doctor/appointments">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to appointments
            </Link>
          </Button>
        }
      />

      <Card className="rounded-2xl">
        <CardContent className="grid gap-5 p-6 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Patient</p>
            <p className="mt-1 text-lg font-semibold">{patient.fullName}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Age / Gender</p>
            <p className="mt-1 text-lg font-semibold">
              {calculateAge(patient.dob)} / {patient.gender}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Contact</p>
            <p className="mt-1 text-sm font-medium">{patient.phone}</p>
            <p className="text-xs text-muted-foreground">{patient.email}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Emergency</p>
            <p className="mt-1 text-sm font-medium">{patient.emergencyContact.name}</p>
            <p className="text-xs text-muted-foreground">{patient.emergencyContact.phone}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Clinical Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="history" className="w-full">
            <TabsList>
              <TabsTrigger value="history">Medical History</TabsTrigger>
              <TabsTrigger value="medications">Medications</TabsTrigger>
              <TabsTrigger value="allergies">Allergies</TabsTrigger>
              <TabsTrigger value="notes">Visit Notes</TabsTrigger>
            </TabsList>
            <TabsContent value="history">
              <ul className="space-y-2 text-sm text-muted-foreground">
                {patient.medicalHistory.map((item) => (
                  <li key={item} className="rounded-xl border p-3">
                    {item}
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="medications">
              <ul className="space-y-2 text-sm text-muted-foreground">
                {patient.currentMedications.map((item) => (
                  <li key={item} className="rounded-xl border p-3">
                    {item}
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="allergies">
              <ul className="space-y-2 text-sm text-muted-foreground">
                {patient.allergies.map((item) => (
                  <li key={item} className="rounded-xl border p-3">
                    {item}
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="notes">
              <ul className="space-y-2 text-sm text-muted-foreground">
                {visitNotes.map((item) => (
                  <li key={item} className="rounded-xl border p-3">
                    {item}
                  </li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Add Clinical Note</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            rows={5}
            placeholder="Add clinical observations, recommendations, or follow-up instructions"
            value={clinicalNote}
            onChange={(event) => setClinicalNote(event.target.value)}
          />
          <div className="flex flex-wrap gap-3">
            <Button onClick={saveClinicalNote} className="rounded-xl">
              <Save className="mr-2 h-4 w-4" />
              Save Note
            </Button>
            <Button variant="outline" onClick={updateRecords} className="rounded-xl">
              <ShieldCheck className="mr-2 h-4 w-4" />
              Update Patient Records
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Recent Visits</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          {recentAppointments.map((appointment) => (
            <div key={appointment.id} className="rounded-xl border p-3">
              {new Date(appointment.startsAt).toLocaleDateString()} - {appointment.type} - {appointment.status}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
