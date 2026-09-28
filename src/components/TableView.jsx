export default function TableView({ block }) {
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            {block.header.map((cell, index) => (
              <th key={index} dangerouslySetInnerHTML={{ __html: cell }} />
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} dangerouslySetInnerHTML={{ __html: cell.html }} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
