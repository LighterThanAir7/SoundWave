export default class Helper {
  static formatAdminTableDate(date) {
    const options = {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    };

    const formattedDate = new Date(date)
      .toLocaleString('en-US', options)
      .replace(',', '')
      .split(' ');

    return `${formattedDate[1]} ${formattedDate[0]}, ${formattedDate[2]}`;
  }

  static formatSongDuration(seconds) {
    if (!seconds) return '0:00';

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    // Format: m:ss (without leading 0's for minutes)
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  static formatFileSize(bytes) {
    if (bytes === 0) return '0 B';

    const units = ['B', 'kB', 'MB', 'GB'];

    // Ako je veličina veća od 900MB, prikazujemo u GB
    if (bytes > 900 * 1024 * 1024) {
      return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
    }

    // Za ostale veličine, izračunaj odgovarajuću jedinicu
    const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), 3); // Maksimalno do GB (indeks 3)
    return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + units[i];
  }
}
