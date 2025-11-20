
export function computeScore(base, candidate) {
  let score = 0;
  if (base.age && candidate.age) {
    score += Math.max(0, 50 - Math.abs(base.age - candidate.age));
  }
  if (base.religion && base.religion === candidate.religion) score += 15;
  if (base.caste && base.caste === candidate.caste) score += 10;
  if (base.city && base.city === candidate.city) score += 10;
  if (base.education && base.education === candidate.education) score += 5;
  return Math.min(100, Math.round(score));
}
