export async function getLatestIOSVersion(bundleId: string) {
  try {
    const url = `https://itunes.apple.com/lookup?bundleId=${bundleId}`;
    const res = await fetch(url);
    const data = await res.json();
    return data?.results[0]?.version ?? null;
  } catch (error) {
    return null;
  }
}
export async function getLatestAndroidVersion(packageName: string) {
  try {
    const url = `https://play.google.com/store/apps/details?id=${packageName}&hl=en&gl=US`;
    const res = await fetch(url);
    const text = await res.text();
    const match = text.match(/"([0-9]+\.[0-9]+\.[0-9]+)"/);
    return match ? (match[1] ?? null) : null;
  } catch (error) {
    return null;
  }
}
export function isUpdateNeeded(current: string, latest: string) {
  const cur = current.split(".").map(Number);
  const lat = latest.split(".").map(Number);
  for (let i = 0; i < Math.max(cur.length, lat.length); i++) {
    const c = cur[i] || 0;
    const l = lat[i] || 0;
    if (l > c) return true;
    if (l < c) return false;
  }
  return false;
}
