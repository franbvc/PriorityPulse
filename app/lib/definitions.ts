export type Alarm = {
  id: string;
  name: string;
  time: Date;
  category?: string;
  is_active: boolean;
}

export type Matrix = {
  id: string;
  name: string;
  durationInMinutes: number;
  is_brainpow: boolean;
  is_urgent: boolean;
}
