import { useState, useEffect } from 'react';

export default function AdminError({ error, visible, setVisible }) {
  const [localError, setLocalError] = useState(error);

  useEffect(() => {
    if (error) {
      setLocalError(error);
    }

    if (!visible) {
      const timer = setTimeout(() => {
        setLocalError(null);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [error, visible]);

  return (
    <div className={`admin-wrapper__error-container${visible ? ' admin-wrapper__error-container--visible' : ''}`}>
      {localError && (
        <div className="admin-wrapper__error">
          <p className="admin-wrapper__error-text">Greška: {localError}</p>
          <button
            className="admin-wrapper__error-close"
            onClick={() => setVisible(false)}
          >
            <i className="icon-x"></i>
          </button>
        </div>
      )}
    </div>
  );
}