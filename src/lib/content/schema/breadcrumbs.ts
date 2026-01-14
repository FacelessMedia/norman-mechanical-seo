export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(
  items: BreadcrumbItem[],
  baseUrl: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`
    }))
  };
}

export function buildBreadcrumbs(
  path: string,
  currentPageName: string
): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', url: '/' }
  ];

  const segments = path.split('/').filter(Boolean);

  if (segments.length === 0) {
    return [];
  }

  if (segments[0] === 'services') {
    breadcrumbs.push({ name: 'Services', url: '/services' });
    if (segments[1]) {
      breadcrumbs.push({ name: currentPageName, url: path });
    }
  } else if (segments[0] === 'locations') {
    breadcrumbs.push({ name: 'Locations', url: '/locations' });
    if (segments[1]) {
      breadcrumbs.push({ name: currentPageName, url: `/locations/${segments[1]}` });
      if (segments[2]) {
        breadcrumbs.push({ name: currentPageName, url: path });
      }
    }
  }

  return breadcrumbs;
}
