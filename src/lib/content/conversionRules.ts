export function getServiceCategorySlug(serviceSlug: string): string | null {
  const categoryMap: Record<string, string> = {
    'drain-cleaning': 'drain-sewer',
    'sewer-cleaning': 'drain-sewer',
    'sewer-repair': 'drain-sewer',
    'plumbing-leak-detection': 'drain-sewer',
    'outdoor-plumbing-system-repair': 'drain-sewer',
    'water-heater-installation': 'water-heaters',
    'water-heater-repair': 'water-heaters',
    'water-tank-installation': 'water-heaters',
    'water-tank-repair': 'water-heaters',
    'plumbing-pipe-repair': 'plumbing-repairs',
    'plumbing-leak-repair': 'plumbing-repairs',
    'faucet-installation': 'fixtures-installations',
    'faucet-repair': 'fixtures-installations',
    'toilet-installation': 'fixtures-installations',
    'toilet-repair': 'fixtures-installations',
    'shower-installation': 'fixtures-installations',
    'shower-repair': 'fixtures-installations',
    'sump-pump-installation': 'pumps-drainage',
    'sump-pump-repair': 'pumps-drainage',
    'garbage-disposal-installation': 'garbage-disposals',
    'garbage-disposal-repair': 'garbage-disposals',
    'pipe-repair': 'plumbing-repairs'
  };
  
  return categoryMap[serviceSlug] || null;
}

export function shouldShowReviews(pageType: 'city' | 'service' | 'city-service'): boolean {
  return pageType === 'city' || pageType === 'city-service';
}

export function shouldShowTrustBadges(pageType: 'city' | 'service' | 'city-service'): boolean {
  return true;
}

export function shouldShowServiceProof(pageType: 'city' | 'service' | 'city-service'): boolean {
  return pageType === 'service' || pageType === 'city-service';
}

export function shouldShowCTA(pageType: 'city' | 'service' | 'city-service'): boolean {
  return true;
}

export function getReviewLimit(pageType: 'city' | 'service' | 'city-service'): number {
  if (pageType === 'city') return 4;
  if (pageType === 'city-service') return 3;
  return 0;
}
