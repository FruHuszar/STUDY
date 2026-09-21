export default function StepsView({ block }) {
  return (
    <ol className="steps" data-variant={block.variant}>
      {block.items.map((item, index) => (
        <li key={index}>
          <b>{String(index + 1).padStart(2, "0")}</b>
          <p dangerouslySetInnerHTML={{ __html: item.html }} />
        </li>
      ))}
    </ol>
  );
}
