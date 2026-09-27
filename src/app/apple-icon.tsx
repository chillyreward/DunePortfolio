import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';

export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#D9CBB0',
        }}
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer ring */}
          <circle
            cx="60"
            cy="60"
            r="52"
            stroke="#1E45C8"
            strokeWidth="8"
          />
          {/* Inner ring */}
          <circle
            cx="60"
            cy="60"
            r="34"
            stroke="#1E45C8"
            strokeWidth="8"
          />
          {/* Iris dot */}
          <circle
            cx="60"
            cy="60"
            r="16"
            fill="#1E45C8"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
