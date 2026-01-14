export interface MetaTags {
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
}

export function generateMetaTags(
  title: string,
  description: string,
  canonicalPath: string,
  baseUrl: string,
  image?: string
): MetaTags {
  return {
    title,
    description,
    canonical: `${baseUrl}${canonicalPath}`,
    ogTitle: title,
    ogDescription: description,
    ogImage: image ? `${baseUrl}${image}` : `${baseUrl}/images/og-default.jpg`,
    ogType: 'website'
  };
}

export function buildTitle(parts: string[], businessName: string): string {
  return [...parts, businessName].join(' | ');
}

export function truncateDescription(text: string, maxLength: number = 155): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3).trim() + '...';
}
