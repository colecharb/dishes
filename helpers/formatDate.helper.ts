export default function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',

    hourCycle: 'h23',
    hour: '2-digit',
    minute: '2-digit',
  };

  return date.toLocaleTimeString('en-US', options);
}
