export type Alarm = {
  id: string;
  name: string;
  time: Date;
  category?: string;
  is_active: boolean;
}
