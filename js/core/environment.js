// `python3 -m http.server` is the documented dev workflow, and neither Clarity
// nor GTM has a notion of environments: every local page view would otherwise
// land in the same production property and skew the numbers with developer
// traffic. Local hosts are excluded rather than the production domain being
// allow-listed, so a future domain change cannot silently switch measurement
// off.
//
// `''` covers `file://`, where `hostname` is empty. The private-range patterns
// matter as much as `localhost` does: verifying the layout down to 320px means
// serving with `--bind 0.0.0.0` and opening `http://192.168.x.x:8000` from a
// real phone, and that host is neither `localhost` nor production.
const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '0.0.0.0', '[::1]', '']);

const LOCAL_PATTERNS = [
  /^127\./, // loopback
  /^10\./, // RFC 1918
  /^192\.168\./, // RFC 1918
  /^172\.(1[6-9]|2\d|3[01])\./, // RFC 1918
  /^169\.254\./, // link-local
  /^\[fe80:/i, // IPv6 link-local
  /\.local$/, // mDNS
  /\.localhost$/,
];

export function isMeasuredHost() {
  const host = window.location.hostname;
  if (LOCAL_HOSTS.has(host)) return false;
  return !LOCAL_PATTERNS.some((pattern) => pattern.test(host));
}
