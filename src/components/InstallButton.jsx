import { useEffect, useState } from "react";
import InstallPrompt from "../core/InstallPrompt.js";

const prompt = new InstallPrompt();

export default function InstallButton() {
  const [available, setAvailable] = useState(prompt.available);

  useEffect(() => prompt.onChange(setAvailable), []);

  if (!available) {
    return null;
  }

  return (
    <button type="button" onClick={() => prompt.install()}>
      Install app
    </button>
  );
}
