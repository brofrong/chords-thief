export function getHostName(site: string): string {
  const url = new URL(site);
  return url.hostname;
}
