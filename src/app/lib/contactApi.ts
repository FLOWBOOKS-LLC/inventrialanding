import { createSiteContact } from "./siteCmsApi";

export type ContactStatus = "new" | "read" | "replied";

export interface Contact {
  id: string;
  name: string;
  email: string;
  company: string;
  message: string;
  date: string;
  status: ContactStatus;
}

/** Public contact form → FlowBooks Partner Admin CMS. */
export async function createContact(input: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
}): Promise<Contact> {
  const res = (await createSiteContact(input)) as {
    data?: Contact;
  };
  return (
    res.data || {
      id: "",
      name: [input.firstName, input.lastName].filter(Boolean).join(" "),
      email: input.email,
      company: input.company || "",
      message: input.message,
      date: new Date().toLocaleDateString("en-US"),
      status: "new",
    }
  );
}
