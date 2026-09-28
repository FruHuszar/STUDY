export default function CategoryDot({ color }) {
  return <span className="dot" style={{ "--dot": color }} aria-hidden="true" />;
}
