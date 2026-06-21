import type {ReactNode} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

/**
 * Reuses the React Native website `.content-banner` / `.content-banner-img`
 * styling (ported in src/css/react-native-components.scss). A highlighted
 * banner with body text on the left and an illustration on the right.
 */
export interface ContentBannerProps {
  children: ReactNode;
  /** Illustration URL. Defaults to the bundled device illustration. */
  imageSrc?: string;
  imageAlt?: string;
}

export default function ContentBanner({
  children,
  imageSrc = '/docs/assets/p_android-ios-devices.svg',
  imageAlt = '',
}: ContentBannerProps): ReactNode {
  const resolvedSrc = useBaseUrl(imageSrc);
  return (
    <div className="content-banner">
      {children}
      <img className="content-banner-img" src={resolvedSrc} alt={imageAlt} />
    </div>
  );
}
