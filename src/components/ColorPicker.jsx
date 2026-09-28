import { useEffect, useRef, useState } from "react";
import CategoryPalette from "../core/CategoryPalette.js";

export default function ColorPicker({ value, onChange, disabled = false }) {
  const custom = useRef(null);
  const [preview, setPreview] = useState(value);
  const isCustom = !CategoryPalette.swatches.some((swatch) => swatch.color === value);

  useEffect(() => setPreview(value), [value]);

  useEffect(() => {
    const input = custom.current;
    const commit = () => onChange(input.value.toLowerCase());
    input.addEventListener("change", commit);
    return () => input.removeEventListener("change", commit);
  }, [onChange]);

  return (
    <div className="swatches">
      {CategoryPalette.swatches.map((swatch) => (
        <button
          key={swatch.color}
          type="button"
          style={{ "--dot": swatch.color }}
          aria-label={swatch.name}
          title={swatch.name}
          aria-pressed={value === swatch.color}
          disabled={disabled}
          onClick={() => onChange(swatch.color)}
        />
      ))}
      <label
        className="custom"
        title="Any color"
        data-pressed={isCustom ? "" : undefined}
        style={isCustom ? { "--dot": preview } : undefined}
      >
        <input
          ref={custom}
          type="color"
          value={isCustom ? preview : "#888888"}
          aria-label="Any color"
          disabled={disabled}
          onChange={(event) => setPreview(event.target.value)}
        />
      </label>
    </div>
  );
}
