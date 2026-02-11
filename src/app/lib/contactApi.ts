import { supabaseRequest } from "./supabaseClient";

export type ContactStatus = "new" | "read" | "replied";

export interface ContactRecord {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  phone: string | null;
  company: string | null;
  subject: string | null;
  message: string | null;
  status: ContactStatus;
  created_at: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  company: string;
  message: string;
  date: string;
  status: ContactStatus;
}

const tablePath = "/rest/v1/contacts";

export async function fetchContacts(): Promise<Contact[]> {
  const data = await supabaseRequest<ContactRecord[]>(
    `${tablePath}?select=*&order=created_at.desc`
  );

  return data.map(mapContact);
}

export async function createContact(input: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
}): Promise<Contact> {
  const payload = [
    {
      first_name: input.firstName || null,
      last_name: input.lastName || null,
      email: input.email,
      phone: input.phone || null,
      company: input.company || null,
      subject: input.subject || null,
      message: input.message,
      status: "new" as ContactStatus
    }
  ];

  const data = await supabaseRequest<ContactRecord[]>(tablePath, {
    method: "POST",
    body: JSON.stringify(payload)
  });

  return mapContact(data[0]);
}

export async function updateContactStatus(id: string, status: ContactStatus) {
  await supabaseRequest<ContactRecord[]>(
    `${tablePath}?id=eq.${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      body: JSON.stringify({ status })
    }
  );
}

export async function deleteContact(id: string) {
  await supabaseRequest<ContactRecord[]>(
    `${tablePath}?id=eq.${encodeURIComponent(id)}`,
    { method: "DELETE" }
  );
}

function mapContact(row: ContactRecord): Contact {
  const name = [row.first_name, row.last_name].filter(Boolean).join(" ").trim() || "Unknown";
  const date = row.created_at
    ? new Date(row.created_at).toLocaleDateString("en-US")
    : "";

  return {
    id: row.id,
    name,
    email: row.email,
    company: row.company ?? "",
    message: row.message ?? "",
    date,
    status: row.status ?? "new"
  };
}
