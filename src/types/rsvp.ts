export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "time"
  | "date"
  | "select"
  | "multiselect"
  | "phone"
  | "email"
  | "checkbox";

export interface FormFieldConfig {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string | undefined;
  required?: boolean | undefined;
  options?: string[] | undefined;
  hint?: string | undefined;
}

export interface RsvpFormConfig {
  fields: FormFieldConfig[];
}

export type RsvpType = "simple" | "detailed";

export interface RsvpSettings {
  rsvpType: RsvpType;
  allowEditRsvp: boolean;
  form: RsvpFormConfig;
}

export type RsvpStatus = "not_responded" | "accepted" | "submitted";

export type RsvpAnswers = Record<string, any>;

export interface RsvpUrlParams {
  rsvp?: string | undefined;
  edit?: string | undefined;
  screen?: string | undefined;
}
