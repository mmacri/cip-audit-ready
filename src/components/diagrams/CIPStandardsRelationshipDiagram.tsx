interface CIPStandardsRelationshipDiagramProps {
  className?: string;
}

export function CIPStandardsRelationshipDiagram({ className }: CIPStandardsRelationshipDiagramProps) {
  return (
    <div className={className}>
      <svg viewBox="0 0 900 550" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        {/* Background */}
        <rect width="900" height="550" fill="#f8fafc" rx="8"/>
        
        {/* Title */}
        <text x="450" y="30" textAnchor="middle" className="text-base font-bold" fill="#1e293b">
          CIP Standards Relationship Map
        </text>
        
        {/* Foundation Layer - CIP-002 */}
        <g transform="translate(325, 50)">
          <rect width="250" height="60" rx="8" fill="#0ea5e9"/>
          <text x="125" y="25" textAnchor="middle" className="text-sm font-bold" fill="white">CIP-002</text>
          <text x="125" y="45" textAnchor="middle" className="text-xs" fill="white">Asset Identification & Scope</text>
          <text x="125" y="75" textAnchor="middle" className="text-[10px]" fill="#64748b">(Foundation - Everything starts here)</text>
        </g>
        
        {/* Arrows from CIP-002 */}
        <path d="M400 120 L250 160" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow2)"/>
        <path d="M450 120 L450 160" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow2)"/>
        <path d="M500 120 L650 160" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow2)"/>
        
        {/* Second Layer - Program & People */}
        <g transform="translate(50, 165)">
          <rect width="180" height="50" rx="6" fill="#14b8a6"/>
          <text x="90" y="22" textAnchor="middle" className="text-xs font-bold" fill="white">CIP-003</text>
          <text x="90" y="38" textAnchor="middle" className="text-[10px]" fill="white">Governance & Policies</text>
        </g>
        
        <g transform="translate(250, 165)">
          <rect width="180" height="50" rx="6" fill="#14b8a6"/>
          <text x="90" y="22" textAnchor="middle" className="text-xs font-bold" fill="white">CIP-004</text>
          <text x="90" y="38" textAnchor="middle" className="text-[10px]" fill="white">Personnel & Training</text>
        </g>
        
        <g transform="translate(450, 165)">
          <rect width="180" height="50" rx="6" fill="#14b8a6"/>
          <text x="90" y="22" textAnchor="middle" className="text-xs font-bold" fill="white">CIP-013</text>
          <text x="90" y="38" textAnchor="middle" className="text-[10px]" fill="white">Supply Chain</text>
        </g>
        
        <g transform="translate(650, 165)">
          <rect width="180" height="50" rx="6" fill="#14b8a6"/>
          <text x="90" y="22" textAnchor="middle" className="text-xs font-bold" fill="white">CIP-011</text>
          <text x="90" y="38" textAnchor="middle" className="text-[10px]" fill="white">Information Protection</text>
        </g>
        
        {/* Third Layer - Perimeters */}
        <g transform="translate(150, 255)">
          <rect width="280" height="50" rx="6" fill="#8b5cf6"/>
          <text x="140" y="22" textAnchor="middle" className="text-xs font-bold" fill="white">CIP-005 / CIP-006</text>
          <text x="140" y="38" textAnchor="middle" className="text-[10px]" fill="white">Electronic & Physical Perimeters</text>
        </g>
        
        <g transform="translate(470, 255)">
          <rect width="280" height="50" rx="6" fill="#8b5cf6"/>
          <text x="140" y="22" textAnchor="middle" className="text-xs font-bold" fill="white">CIP-014</text>
          <text x="140" y="38" textAnchor="middle" className="text-[10px]" fill="white">Physical Security - Transmission</text>
        </g>
        
        {/* Fourth Layer - Technical Controls */}
        <g transform="translate(50, 345)">
          <rect width="180" height="50" rx="6" fill="#f59e0b"/>
          <text x="90" y="22" textAnchor="middle" className="text-xs font-bold" fill="white">CIP-007</text>
          <text x="90" y="38" textAnchor="middle" className="text-[10px]" fill="white">System Security</text>
        </g>
        
        <g transform="translate(250, 345)">
          <rect width="180" height="50" rx="6" fill="#f59e0b"/>
          <text x="90" y="22" textAnchor="middle" className="text-xs font-bold" fill="white">CIP-010</text>
          <text x="90" y="38" textAnchor="middle" className="text-[10px]" fill="white">Configuration Mgmt</text>
        </g>
        
        <g transform="translate(450, 345)">
          <rect width="180" height="50" rx="6" fill="#f59e0b"/>
          <text x="90" y="22" textAnchor="middle" className="text-xs font-bold" fill="white">CIP-012</text>
          <text x="90" y="38" textAnchor="middle" className="text-[10px]" fill="white">Control Center Comms</text>
        </g>
        
        {/* Fifth Layer - Response & Recovery */}
        <g transform="translate(250, 435)">
          <rect width="180" height="50" rx="6" fill="#ef4444"/>
          <text x="90" y="22" textAnchor="middle" className="text-xs font-bold" fill="white">CIP-008</text>
          <text x="90" y="38" textAnchor="middle" className="text-[10px]" fill="white">Incident Response</text>
        </g>
        
        <g transform="translate(450, 435)">
          <rect width="180" height="50" rx="6" fill="#ef4444"/>
          <text x="90" y="22" textAnchor="middle" className="text-xs font-bold" fill="white">CIP-009</text>
          <text x="90" y="38" textAnchor="middle" className="text-[10px]" fill="white">Recovery Plans</text>
        </g>
        
        {/* Connecting lines */}
        <path d="M290 225 L290 250" stroke="#94a3b8" strokeWidth="1.5"/>
        <path d="M610 225 L610 250" stroke="#94a3b8" strokeWidth="1.5"/>
        <path d="M140 310 L140 340" stroke="#94a3b8" strokeWidth="1.5"/>
        <path d="M340 310 L340 340" stroke="#94a3b8" strokeWidth="1.5"/>
        <path d="M540 310 L540 340" stroke="#94a3b8" strokeWidth="1.5"/>
        <path d="M340 400 L340 430" stroke="#94a3b8" strokeWidth="1.5"/>
        <path d="M540 400 L540 430" stroke="#94a3b8" strokeWidth="1.5"/>
        
        {/* Arrow marker */}
        <defs>
          <marker id="arrow2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#94a3b8"/>
          </marker>
        </defs>
        
        {/* Legend */}
        <g transform="translate(680, 350)">
          <rect width="200" height="140" rx="6" fill="#fff" stroke="#e2e8f0"/>
          <text x="100" y="20" textAnchor="middle" className="text-[10px] font-bold" fill="#1e293b">Standard Categories</text>
          
          <rect x="15" y="35" width="12" height="12" rx="2" fill="#0ea5e9"/>
          <text x="35" y="45" className="text-[9px]" fill="#64748b">Foundation</text>
          
          <rect x="15" y="55" width="12" height="12" rx="2" fill="#14b8a6"/>
          <text x="35" y="65" className="text-[9px]" fill="#64748b">Program & People</text>
          
          <rect x="15" y="75" width="12" height="12" rx="2" fill="#8b5cf6"/>
          <text x="35" y="85" className="text-[9px]" fill="#64748b">Perimeter Security</text>
          
          <rect x="15" y="95" width="12" height="12" rx="2" fill="#f59e0b"/>
          <text x="35" y="105" className="text-[9px]" fill="#64748b">Technical Controls</text>
          
          <rect x="15" y="115" width="12" height="12" rx="2" fill="#ef4444"/>
          <text x="35" y="125" className="text-[9px]" fill="#64748b">Response & Recovery</text>
        </g>
      </svg>
      <p className="text-xs text-muted-foreground text-center mt-2">
        <strong>Learning Aid:</strong> This diagram shows how CIP standards build upon each other. 
        CIP-002 asset identification is the foundation—every other standard depends on knowing what's in scope.
      </p>
    </div>
  );
}
