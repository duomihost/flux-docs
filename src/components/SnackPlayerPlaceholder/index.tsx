import type {ReactNode} from 'react';

/**
 * Visual-only container that reuses the React Native website `.snack-player`
 * styling (ported in src/css/react-native-components.scss).
 *
 * This is a placeholder: it does NOT embed the Expo Snack runtime. It renders a
 * framed area with an optional title and arbitrary children (e.g. a static code
 * sample), leaving the door open to wire up a real runtime later behind the
 * same class name. P2/P3 — out of scope this round.
 */
export interface SnackPlayerPlaceholderProps {
  /** Optional label shown at the top of the frame. */
  title?: string;
  /** Optional content, e.g. a static code sample or explanatory note. */
  children?: ReactNode;
}

export default function SnackPlayerPlaceholder({
  title = 'Interactive example',
  children,
}: SnackPlayerPlaceholderProps): ReactNode {
  return (
    <div
      className="snack-player"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
        minHeight: 220,
        padding: 24,
        gap: 12,
        background: 'var(--ifm-background-surface-color)',
      }}>
      <strong style={{color: 'var(--subtle)', fontSize: 14}}>{title}</strong>
      {children ?? (
        <span style={{color: 'var(--subtle)', fontSize: 14}}>
          Snack runtime not enabled in this build.
        </span>
      )}
    </div>
  );
}
