interface AuditPreparationDiagramProps {
  className?: string;
}

export function AuditPreparationDiagram({ className }: AuditPreparationDiagramProps) {
  return (
    <div className={className}>
      <svg viewBox="0 0 800 400" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        {/* Background */}
        <rect width="800" height="400" fill="#f8fafc" rx="8"/>
        
        {/* Title */}
        <text x="400" y="30" textAnchor="middle" className="text-base font-bold" fill="#1e293b">
          90-Day Audit Preparation Workflow
        </text>
        
        {/* Day 0 - Notice */}
        <g transform="translate(50, 60)">
          <rect width="120" height="80" rx="8" fill="#0ea5e9" opacity="0.9"/>
          <text x="60" y="25" textAnchor="middle" className="text-xs font-bold" fill="white">Day 0</text>
          <text x="60" y="45" textAnchor="middle" className="text-[10px]" fill="white">90-Day Notice</text>
          <text x="60" y="60" textAnchor="middle" className="text-[9px]" fill="white">Received</text>
          <circle cx="60" cy="90" r="15" fill="#22c55e"/>
          <text x="60" y="95" textAnchor="middle" className="text-[10px] font-bold" fill="white">1</text>
        </g>
        
        {/* Arrow */}
        <path d="M175 100 L205 100" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)"/>
        
        {/* Days 1-30 - Pre-Audit Request */}
        <g transform="translate(210, 60)">
          <rect width="140" height="80" rx="8" fill="#f59e0b" opacity="0.9"/>
          <text x="70" y="25" textAnchor="middle" className="text-xs font-bold" fill="white">Days 1-30</text>
          <text x="70" y="45" textAnchor="middle" className="text-[10px]" fill="white">Pre-Audit Info</text>
          <text x="70" y="60" textAnchor="middle" className="text-[9px]" fill="white">Submission</text>
          <circle cx="70" cy="90" r="15" fill="#22c55e"/>
          <text x="70" y="95" textAnchor="middle" className="text-[10px] font-bold" fill="white">2</text>
        </g>
        
        {/* Arrow */}
        <path d="M355 100 L385 100" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)"/>
        
        {/* Days 30-75 - Internal Prep */}
        <g transform="translate(390, 60)">
          <rect width="140" height="80" rx="8" fill="#14b8a6" opacity="0.9"/>
          <text x="70" y="25" textAnchor="middle" className="text-xs font-bold" fill="white">Days 30-75</text>
          <text x="70" y="45" textAnchor="middle" className="text-[10px]" fill="white">Internal</text>
          <text x="70" y="60" textAnchor="middle" className="text-[9px]" fill="white">Preparation</text>
          <circle cx="70" cy="90" r="15" fill="#22c55e"/>
          <text x="70" y="95" textAnchor="middle" className="text-[10px] font-bold" fill="white">3</text>
        </g>
        
        {/* Arrow */}
        <path d="M535 100 L565 100" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)"/>
        
        {/* Days 80-90 - Audit Week */}
        <g transform="translate(570, 60)">
          <rect width="120" height="80" rx="8" fill="#0ea5e9" opacity="0.9"/>
          <text x="60" y="25" textAnchor="middle" className="text-xs font-bold" fill="white">Days 80-90</text>
          <text x="60" y="45" textAnchor="middle" className="text-[10px]" fill="white">Audit</text>
          <text x="60" y="60" textAnchor="middle" className="text-[9px]" fill="white">Week(s)</text>
          <circle cx="60" cy="90" r="15" fill="#22c55e"/>
          <text x="60" y="95" textAnchor="middle" className="text-[10px] font-bold" fill="white">4</text>
        </g>
        
        {/* Post-Audit */}
        <g transform="translate(700, 60)">
          <rect width="80" height="80" rx="8" fill="#22c55e" opacity="0.9"/>
          <text x="40" y="25" textAnchor="middle" className="text-xs font-bold" fill="white">Day 90+</text>
          <text x="40" y="45" textAnchor="middle" className="text-[10px]" fill="white">Close</text>
          <text x="40" y="60" textAnchor="middle" className="text-[9px]" fill="white">Out</text>
          <circle cx="40" cy="90" r="15" fill="white"/>
          <text x="40" y="95" textAnchor="middle" className="text-[10px] font-bold" fill="#22c55e">5</text>
        </g>
        
        {/* Arrow marker definition */}
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#94a3b8"/>
          </marker>
        </defs>
        
        {/* Key Activities Section */}
        <text x="400" y="195" textAnchor="middle" className="text-sm font-bold" fill="#1e293b">Key Activities by Phase</text>
        
        {/* Phase 1 Activities */}
        <g transform="translate(30, 210)">
          <rect width="150" height="150" rx="6" fill="#e0f2fe" stroke="#0ea5e9"/>
          <text x="75" y="20" textAnchor="middle" className="text-[10px] font-bold" fill="#0284c7">Phase 1: Notice</text>
          <text x="10" y="40" className="text-[9px]" fill="#64748b">• Brief leadership</text>
          <text x="10" y="55" className="text-[9px]" fill="#64748b">• Designate coordinator</text>
          <text x="10" y="70" className="text-[9px]" fill="#64748b">• Calendar key dates</text>
          <text x="10" y="85" className="text-[9px]" fill="#64748b">• Identify SMEs</text>
          <text x="10" y="100" className="text-[9px]" fill="#64748b">• Review audit scope</text>
        </g>
        
        {/* Phase 2 Activities */}
        <g transform="translate(190, 210)">
          <rect width="150" height="150" rx="6" fill="#fef3c7" stroke="#f59e0b"/>
          <text x="75" y="20" textAnchor="middle" className="text-[10px] font-bold" fill="#d97706">Phase 2: Submission</text>
          <text x="10" y="40" className="text-[9px]" fill="#64748b">• Review data requests</text>
          <text x="10" y="55" className="text-[9px]" fill="#64748b">• Gather evidence</text>
          <text x="10" y="70" className="text-[9px]" fill="#64748b">• Prep network diagrams</text>
          <text x="10" y="85" className="text-[9px]" fill="#64748b">• Compile records</text>
          <text x="10" y="100" className="text-[9px]" fill="#64748b">• Submit via portal</text>
        </g>
        
        {/* Phase 3 Activities */}
        <g transform="translate(350, 210)">
          <rect width="150" height="150" rx="6" fill="#ccfbf1" stroke="#14b8a6"/>
          <text x="75" y="20" textAnchor="middle" className="text-[10px] font-bold" fill="#0d9488">Phase 3: Preparation</text>
          <text x="10" y="40" className="text-[9px]" fill="#64748b">• Run mock audits</text>
          <text x="10" y="55" className="text-[9px]" fill="#64748b">• Train SMEs</text>
          <text x="10" y="70" className="text-[9px]" fill="#64748b">• Update docs</text>
          <text x="10" y="85" className="text-[9px]" fill="#64748b">• Tabletop exercises</text>
          <text x="10" y="100" className="text-[9px]" fill="#64748b">• Site walk-throughs</text>
        </g>
        
        {/* Phase 4 Activities */}
        <g transform="translate(510, 210)">
          <rect width="150" height="150" rx="6" fill="#e0f2fe" stroke="#0ea5e9"/>
          <text x="75" y="20" textAnchor="middle" className="text-[10px] font-bold" fill="#0284c7">Phase 4: Audit</text>
          <text x="10" y="40" className="text-[9px]" fill="#64748b">• Opening meeting</text>
          <text x="10" y="55" className="text-[9px]" fill="#64748b">• SME interviews</text>
          <text x="10" y="70" className="text-[9px]" fill="#64748b">• Evidence reviews</text>
          <text x="10" y="85" className="text-[9px]" fill="#64748b">• Daily status</text>
          <text x="10" y="100" className="text-[9px]" fill="#64748b">• Closing meeting</text>
        </g>
        
        {/* Phase 5 Activities */}
        <g transform="translate(670, 210)">
          <rect width="110" height="150" rx="6" fill="#dcfce7" stroke="#22c55e"/>
          <text x="55" y="20" textAnchor="middle" className="text-[10px] font-bold" fill="#16a34a">Phase 5: Close</text>
          <text x="10" y="40" className="text-[9px]" fill="#64748b">• Draft report</text>
          <text x="10" y="55" className="text-[9px]" fill="#64748b">• Corrections</text>
          <text x="10" y="70" className="text-[9px]" fill="#64748b">• Mitigation</text>
          <text x="10" y="85" className="text-[9px]" fill="#64748b">• Lessons learned</text>
        </g>
      </svg>
      <p className="text-xs text-muted-foreground text-center mt-2">
        <strong>Audit Context:</strong> This workflow represents a typical CMEP audit timeline. 
        Actual durations may vary by Regional Entity and audit scope.
      </p>
    </div>
  );
}
