interface EvidenceOrganizationDiagramProps {
  className?: string;
}

export function EvidenceOrganizationDiagram({ className }: EvidenceOrganizationDiagramProps) {
  return (
    <div className={className}>
      <svg viewBox="0 0 800 450" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        {/* Background */}
        <rect width="800" height="450" fill="#f8fafc" rx="8"/>
        
        {/* Title */}
        <text x="400" y="30" textAnchor="middle" className="text-base font-bold" fill="#1e293b">
          Evidence Organization Best Practices
        </text>
        
        {/* Central Evidence Repository */}
        <g transform="translate(300, 60)">
          <rect width="200" height="70" rx="8" fill="#0ea5e9"/>
          <text x="100" y="30" textAnchor="middle" className="text-sm font-bold" fill="white">Evidence Repository</text>
          <text x="100" y="50" textAnchor="middle" className="text-xs" fill="white">Centralized & Version-Controlled</text>
        </g>
        
        {/* Folder Structure */}
        <g transform="translate(50, 170)">
          <rect width="140" height="45" rx="6" fill="#fef3c7" stroke="#f59e0b"/>
          <text x="70" y="28" textAnchor="middle" className="text-[11px] font-medium" fill="#d97706">📁 CIP-002</text>
        </g>
        
        <g transform="translate(200, 170)">
          <rect width="140" height="45" rx="6" fill="#fef3c7" stroke="#f59e0b"/>
          <text x="70" y="28" textAnchor="middle" className="text-[11px] font-medium" fill="#d97706">📁 CIP-003</text>
        </g>
        
        <g transform="translate(350, 170)">
          <rect width="140" height="45" rx="6" fill="#fef3c7" stroke="#f59e0b"/>
          <text x="70" y="28" textAnchor="middle" className="text-[11px] font-medium" fill="#d97706">📁 CIP-004</text>
        </g>
        
        <g transform="translate(500, 170)">
          <rect width="140" height="45" rx="6" fill="#fef3c7" stroke="#f59e0b"/>
          <text x="70" y="28" textAnchor="middle" className="text-[11px] font-medium" fill="#d97706">📁 CIP-005...</text>
        </g>
        
        <g transform="translate(650, 170)">
          <rect width="100" height="45" rx="6" fill="#e2e8f0" stroke="#94a3b8"/>
          <text x="50" y="28" textAnchor="middle" className="text-[11px] font-medium" fill="#64748b">...</text>
        </g>
        
        {/* Connection lines from repository */}
        <path d="M400 130 L120 165" stroke="#94a3b8" strokeWidth="1.5"/>
        <path d="M400 130 L270 165" stroke="#94a3b8" strokeWidth="1.5"/>
        <path d="M400 130 L420 165" stroke="#94a3b8" strokeWidth="1.5"/>
        <path d="M400 130 L570 165" stroke="#94a3b8" strokeWidth="1.5"/>
        <path d="M400 130 L700 165" stroke="#94a3b8" strokeWidth="1.5"/>
        
        {/* Subfolder Example */}
        <g transform="translate(50, 245)">
          <rect width="300" height="180" rx="6" fill="#fff" stroke="#e2e8f0"/>
          <text x="150" y="25" textAnchor="middle" className="text-[11px] font-bold" fill="#1e293b">Example: CIP-004 Folder Structure</text>
          
          <text x="20" y="50" className="text-[10px]" fill="#64748b">📁 R1-SecurityAwareness/</text>
          <text x="40" y="68" className="text-[9px]" fill="#94a3b8">├── Q1-2024-AwarenessMaterials.pdf</text>
          <text x="40" y="83" className="text-[9px]" fill="#94a3b8">├── Q2-2024-AwarenessMaterials.pdf</text>
          
          <text x="20" y="103" className="text-[10px]" fill="#64748b">📁 R2-TrainingRecords/</text>
          <text x="40" y="121" className="text-[9px]" fill="#94a3b8">├── Training_Matrix_2024.xlsx</text>
          <text x="40" y="136" className="text-[9px]" fill="#94a3b8">├── Completion_Certs/</text>
          
          <text x="20" y="156" className="text-[10px]" fill="#64748b">📁 R3-PersonnelRiskAssessments/</text>
          <text x="40" y="174" className="text-[9px]" fill="#94a3b8">├── PRA_Log_2024.xlsx</text>
        </g>
        
        {/* Naming Convention Box */}
        <g transform="translate(380, 245)">
          <rect width="370" height="180" rx="6" fill="#dcfce7" stroke="#22c55e"/>
          <text x="185" y="25" textAnchor="middle" className="text-[11px] font-bold" fill="#16a34a">Evidence Naming Convention</text>
          
          <text x="15" y="50" className="text-[10px] font-medium" fill="#1e293b">Format: [Standard]-[Req]-[Description]-[Period]</text>
          
          <text x="15" y="75" className="text-[10px]" fill="#64748b">✓ CIP007-R2-PatchTracker-Q1-2024.xlsx</text>
          <text x="15" y="93" className="text-[10px]" fill="#64748b">✓ CIP004-R3-PRA-Smith-John-2024.pdf</text>
          <text x="15" y="111" className="text-[10px]" fill="#64748b">✓ CIP005-R1-ESP-NetworkDiagram-v3.vsd</text>
          
          <text x="15" y="136" className="text-[10px] font-medium" fill="#dc2626">Avoid:</text>
          <text x="15" y="154" className="text-[10px]" fill="#dc2626">✗ evidence.pdf</text>
          <text x="15" y="172" className="text-[10px]" fill="#dc2626">✗ document1.xlsx</text>
        </g>
        
        {/* Best Practices */}
        <text x="400" y="445" textAnchor="middle" className="text-[10px]" fill="#64748b">
          <tspan fontWeight="bold">Key Principle:</tspan> Auditors should find what they need in under 30 seconds. Organize by RSAW structure.
        </text>
      </svg>
      <p className="text-xs text-muted-foreground text-center mt-2">
        <strong>Audit Tip:</strong> Structure your evidence repository to mirror the RSAW. 
        When auditors request CIP-007 R2 evidence, they should find a folder ready with that exact path.
      </p>
    </div>
  );
}
