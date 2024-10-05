export type Alarm = {
  id: string;
  name: string;
  time: Date;
  category?: string;
  is_active: boolean;
};

export type AlarmComparator =
  | "name ascending"
  | "name descending"
  | "datetime ascending"
  | "datetime descending"
  | "category ascending"
  | "category descending";

export type ComparatorFunction = (a1: Alarm, a2: Alarm) => number;

export const AlarmComparatorMap: Map<AlarmComparator, ComparatorFunction> =
  new Map([
    [
      "name ascending",
      (a1: Alarm, a2: Alarm) => a1.name.localeCompare(a2.name),
    ],
    [
      "name descending",
      (a1: Alarm, a2: Alarm) => a2.name.localeCompare(a1.name),
    ],
    [
      "datetime ascending",
      (a1: Alarm, a2: Alarm) => a1.time.getTime() - a2.time.getTime(),
    ],
    [
      "datetime descending",
      (a1: Alarm, a2: Alarm) => a2.time.getTime() - a1.time.getTime(),
    ],
    [
      "category ascending",
      (a1: Alarm, a2: Alarm) => {
        if (!a1.category && !a2.category) {
          return 0;
        }
        if (!a1.category) {
          return 1;
        }
        if (!a2.category) {
          return -1;
        }
        return a1.category.localeCompare(a2.category);
      },
    ],
    [
      "category descending",
      (a1: Alarm, a2: Alarm) => {
        if (!a1.category && !a2.category) {
          return 0;
        }
        if (!a1.category) {
          return 1;
        }
        if (!a2.category) {
          return -1;
        }
        return a2.category.localeCompare(a1.category);
      },
    ],
  ]);

export type knownAlarmCategories =
  | "work"
  | "school"
  | "exercise"
  | "social"
  | "family"
  | "self-care"
  | "other";

export const CategoryKeywords: Map<knownAlarmCategories, string[]> = new Map([
  ["work", ["work", "meeting", "presentation", "deadline"]],
  [
    "school",
    [
      "school",
      "class",
      "lecture",
      "exam",
      "study",
      "homework",
      "report",
      "assignment",
    ],
  ],
  ["exercise", ["exercise", "workout", "run", "gym", "bouldering"]],
  ["social", ["social", "party", "hangout", "date", "meetup", "dinner"]],
  ["family", ["family", "parent", "child", "sibling", "relative"]],
  ["self-care", ["self-care", "relax", "meditate", "read"]],
  ["other", ["other", "misc", "general", "random"]],
]);

export type Matrix = {
  id: string;
  name: string;
  durationInMinutes: number;
  is_brainpow: boolean;
  is_urgent: boolean;
};
