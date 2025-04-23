import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children, containerId = 'portal-root' }) => {
  const [portalContainer, setPortalContainer] = useState(null);

  useEffect(() => {
    // Try to find existing container
    let container = document.getElementById(containerId);
    
    // Create container if it doesn't exist
    if (!container) {
      container = document.createElement('div');
      container.id = containerId;
      document.body.appendChild(container);
    }

    setPortalContainer(container);

    // Cleanup on unmount
    return () => {
      if (container && container.childNodes.length === 0) {
        document.body.removeChild(container);
      }
    };
  }, [containerId]);

  return portalContainer ? createPortal(children, portalContainer) : null;
};

export default Portal;
