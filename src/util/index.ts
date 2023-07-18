export function normalizeHost(host: string): string {
  host = host.endsWith('/') ? host.slice(0, -1) : host;
  return host.replace(/(^\w+:|^)\/\//, '');
}

export function sanitizeTableauString(str: string): string {
  return str.replace('&quot;', '').replace(/['"]+/g, '');
}
