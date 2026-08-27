// `python3 -m http.server` is the documented dev workflow, and neither Clarity
// nor GTM has a notion of environments: every local page view would otherwise
// land in the same production property and skew the numbers with developer
// traffic. Local hostnames are excluded rather than the production domain being
// allow-listed, so a future domain change cannot silently switch measurement
// off. `''` covers `file://`, where `hostname` is empty.
const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '[::1]', '']);

export function isMeasuredHost() {
  return !LOCAL_HOSTS.has(window.location.hostname);
}
