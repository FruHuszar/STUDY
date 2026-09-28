import { useEffect, useRef } from "react";

export default function Dialog({ title, onDismiss, children, wide = false }) {
  const dialog = useRef(null);

  useEffect(() => {
    const element = dialog.current;
    element.showModal();
    return () => element.close();
  }, []);

  return (
    <dialog
      ref={dialog}
      className="panel"
      data-wide={wide ? "" : undefined}
      aria-label={title}
      onCancel={(event) => {
        event.preventDefault();
        onDismiss();
      }}
    >
      <h2>{title}</h2>
      {children}
    </dialog>
  );
}
