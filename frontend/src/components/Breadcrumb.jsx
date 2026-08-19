import { Link } from "react-router-dom";

function Breadcrumb({ items }) {
  return (
    <div className="breadcrumb">
      <Link to="/">Dashboard</Link>
      {items.map((item, index) => (
        <span key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          {item.link ? (
            <Link to={item.link}>{item.label}</Link>
          ) : item.onClick ? (
            <span onClick={item.onClick} style={{ cursor: 'pointer', color: '#007bff' }} onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>{item.label}</span>
          ) : (
            <span style={{ color: '#6b7280' }}>{item.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}

export default Breadcrumb;
