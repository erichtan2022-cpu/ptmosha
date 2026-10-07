import { Helmet } from "react-helmet-async";

const SITE_NAME = "PT Mosha Sinalsal Solusi";
const SITE_URL = "https://moshassolusi.com";
const DEFAULT_OG_IMAGE =
  "https://hercules-cdn.com/file_hefyWjrnJQZ3depHrmPx78nx";

interface SEOHeadProps {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
  ogType?: string;
  noIndex?: boolean;
  keywords?: string;
  children?: React.ReactNode;
}

/**
 * Reusable SEO head component that sets page-specific meta tags.
 * Uses react-helmet-async to dynamically update <head>.
 */
export default function SEOHead({
  title,
  description,
  path = "/",
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  noIndex = false,
  keywords,
  children,
}: SEOHeadProps) {
  const fullTitle = title
    ? `${title} - ${SITE_NAME}`
    : `${SITE_NAME} - Training, Konsultan & Supply Manpower | Batam, Indonesia`;

  const fullUrl = `${SITE_URL}${path}`;

  const defaultDescription =
    "PT Mosha Sinalsal Solusi - Perusahaan konsultan engineering, training commissioning Oil & Gas, PLTS, dan supply manpower profesional di Batam dan seluruh Indonesia.";

  const metaDescription = description || defaultDescription;

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={fullUrl} />

      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="id_ID" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />

      {children}
    </Helmet>
  );
}
