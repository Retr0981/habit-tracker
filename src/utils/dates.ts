/** Return today's date as YYYY-MM-DD in the local timezone. */
export function todayString(): string {
  return formatDate(new Date());
}

/** Format a Date to YYYY-MM-DD in local time. */
export function formatDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Number of consecutive days ending on `dateStr` that appear in `completedDates`. */
export function calcStreak(completedDates: string[], dateStr: string): number {
  const set = new Set(completedDates);
  let streak = 0;
  let cursor = new Date(dateStr + 'T12:00:00'); // noon to avoid DST edge cases

  while (set.has(formatDate(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

/** Best streak ever (scans all completed dates). */
export function calcBestStreak(completedDates: string[]): number {
  if (completedDates.length === 0) return 0;

  const sorted = [...completedDates].sort();
  let best = 1;
  let current = 1;

  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1] + 'T12:00:00');
    const curr = new Date(sorted[i] + 'T12:00:00');
    const diffDays = Math.round(
      (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24),
    );
    if (diffDays === 1) {
      current++;
      best = Math.max(best, current);
    } else if (diffDays > 1) {
      current = 1;
    }
  }
  return best;
}

/** Return the last N days (including today) as YYYY-MM-DD strings. */
export function lastNDays(n: number): string[] {
  const days: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(formatDate(d));
  }
  return days;
}
