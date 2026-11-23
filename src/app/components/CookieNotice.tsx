import { useEffect, useState } from 'react';

const STORAGE_KEY = 'inventria-cookie-notice';

export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(window.localStorage.getItem(STORAGE_KEY) !== 'accepted');
  }, []);

  if (!visible) return null;

  const accept = () => {
    window.localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-4 z-[70] px-3 sm:px-4">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 rounded-2xl border-2 border-black bg-white px-5 py-4 text-black shadow-[0_8px_30px_rgba(0,0,0,0.12)] sm:flex-row sm:items-center sm:gap-8 sm:px-6">
        <p className="text-sm leading-relaxed text-neutral-800">
          We use cookies on our website to provide you with the best experience. If you continue
          browsing, you are consenting to our use of these cookies, but if you would like to know
          more, including how you can change your settings, take a look at our{' '}
          <a href="#privacy" className="font-semibold text-black underline underline-offset-2">
            Privacy Notice
          </a>
          .
        </p>
        <button
          type="button"
          onClick={accept}
          className="shrink-0 self-end rounded-full bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-neutral-800 sm:self-center"
        >
          Accept &amp; Close
        </button>
      </div>
    </div>
  );
}
