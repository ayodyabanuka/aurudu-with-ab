export type CountdownData = {
  label: string;
  date: string; // ISO format with timezone
};

export const events: CountdownData[] = [
  { label: 'පරණ අවුරුද්ද සඳහා ස්නානය', date: '2025-04-13T06:00:00+05:30' },
  { label: 'පුණ්‍ය කාලය', date: '2025-04-13T20:57:00+05:30' },
  { label: 'අලුත් අවුරුදු උදාව', date: '2025-04-14T03:21:00+05:30' },
  { label: 'ආහර පිසීම', date: '2025-04-14T04:04:00+05:30' },
  {
    label: 'වැඩ ඇල්ලීම, ගනුදෙනු කිරීම හා ආහාර අනුභවය',
    date: '2025-04-14T06:44:00+05:30',
  },
  { label: 'හිසතෙල් ගෑම', date: '2025-04-16T09:04:00+05:30' },
  { label: 'රැකීරක්ෂා සඳහා පිටත්ව යෑම', date: '2025-04-17T09:03:00+05:30' },
];
