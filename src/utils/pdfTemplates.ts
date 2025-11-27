import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Extend jsPDF type for autoTable
declare module 'jspdf' {
  interface jsPDF {
    lastAutoTable: { finalY: number };
  }
}

const PRIMARY_COLOR: [number, number, number] = [14, 116, 144]; // teal
const HEADER_COLOR: [number, number, number] = [30, 41, 59]; // navy

function addHeader(doc: jsPDF, title: string, subtitle: string) {
  doc.setFillColor(...PRIMARY_COLOR);
  doc.rect(0, 0, 220, 35, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text(title, 14, 18);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(subtitle, 14, 28);
  
  doc.setTextColor(0, 0, 0);
}

function addFooter(doc: jsPDF) {
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `CIP Readiness Academy | Page ${i} of ${pageCount}`,
      doc.internal.pageSize.getWidth() / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }
}

export function generateEvidenceInventory(): void {
  const doc = new jsPDF();
  
  addHeader(doc, 'Evidence Inventory Spreadsheet', 'NERC CIP Compliance Documentation Tracker');
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('Instructions: Use this template to track all compliance evidence mapped to CIP requirements.', 14, 45);
  doc.text('Update the Status column regularly and ensure all evidence is accessible before audits.', 14, 52);
  
  const evidenceData = [
    ['CIP-002-5.1a R1', 'BES Cyber System Categorization', '/Evidence/CIP-002/BCS_Inventory_2024.xlsx', 'J. Smith', '2024-01-15', '2025-01-15', 'Current'],
    ['CIP-002-5.1a R2', 'Impact Rating Methodology', '/Evidence/CIP-002/Impact_Rating_Doc.pdf', 'J. Smith', '2024-01-15', '2025-01-15', 'Current'],
    ['CIP-003-8 R1', 'Cyber Security Policy', '/Evidence/CIP-003/Cyber_Security_Policy_v3.pdf', 'M. Johnson', '2024-03-01', '2025-06-01', 'Current'],
    ['CIP-003-8 R2', 'CIP Senior Manager Delegation', '/Evidence/CIP-003/CSM_Delegation_Letter.pdf', 'M. Johnson', '2024-02-15', '2025-02-15', 'Review Due'],
    ['CIP-004-7 R1', 'Security Awareness Program', '/Evidence/CIP-004/Q1_Awareness_Materials.zip', 'S. Williams', '2024-03-31', '2024-06-30', 'Current'],
    ['CIP-004-7 R2', 'Training Records', '/Evidence/CIP-004/Training_Matrix_2024.xlsx', 'S. Williams', '2024-04-01', 'Ongoing', 'Current'],
    ['CIP-004-7 R3', 'Personnel Risk Assessments', '/Evidence/CIP-004/PRA_Log_2024.xlsx', 'HR Dept', '2024-04-15', 'Ongoing', 'Current'],
    ['CIP-005-7 R1', 'ESP Network Diagrams', '/Evidence/CIP-005/ESP_Diagrams_v2.vsd', 'T. Brown', '2024-02-01', '2025-02-01', 'Current'],
    ['CIP-006-6 R1', 'PSP Documentation', '/Evidence/CIP-006/PSP_Access_Lists.xlsx', 'Security', '2024-04-01', 'Ongoing', 'Current'],
    ['CIP-007-6 R2', 'Patch Management Records', '/Evidence/CIP-007/Patch_Tracker_2024.xlsx', 'IT Ops', '2024-04-20', 'Ongoing', 'Current'],
  ];

  autoTable(doc, {
    startY: 60,
    head: [['CIP Req ID', 'Evidence Description', 'Document Location', 'Owner', 'Last Updated', 'Expiration', 'Status']],
    body: evidenceData,
    headStyles: { fillColor: HEADER_COLOR, fontSize: 8 },
    bodyStyles: { fontSize: 7 },
    columnStyles: {
      0: { cellWidth: 25 },
      1: { cellWidth: 35 },
      2: { cellWidth: 45 },
      3: { cellWidth: 20 },
      4: { cellWidth: 20 },
      5: { cellWidth: 20 },
      6: { cellWidth: 18 },
    },
    alternateRowStyles: { fillColor: [245, 245, 245] },
  });

  addFooter(doc);
  doc.save('Evidence_Inventory_Template.pdf');
}

export function generateTrainingMatrix(): void {
  const doc = new jsPDF('landscape');
  
  addHeader(doc, 'CIP Training Matrix', 'Personnel Training Tracking and Compliance');
  
  doc.setFontSize(11);
  doc.text('Instructions: Track all personnel requiring CIP training. Flag anyone approaching their 15-month renewal deadline.', 14, 45);
  
  const trainingData = [
    ['Smith, John', 'Compliance Manager', 'CIP-004 Full', '2024-01-15', '2025-04-15', 'Internal', 'Active', 'Current'],
    ['Johnson, Mary', 'IT Administrator', 'CIP-004 Full', '2024-02-01', '2025-05-01', 'Internal', 'Active', 'Current'],
    ['Williams, Sam', 'Control Room Operator', 'CIP-004 Full + Role-Based', '2024-01-20', '2025-04-20', 'Internal', 'Active', 'Current'],
    ['Brown, Tom', 'Network Engineer', 'CIP-004 Full + Technical', '2023-12-01', '2025-03-01', 'External', 'Active', 'Due Soon'],
    ['Davis, Lisa', 'Physical Security', 'CIP-004 Full + PSP', '2024-03-15', '2025-06-15', 'Internal', 'Active', 'Current'],
    ['Miller, Bob', 'Contractor - IT', 'CIP-004 Contractor', '2024-04-01', '2025-07-01', 'Internal', 'Active', 'Current'],
    ['Wilson, Jane', 'HR Manager', 'CIP-004 Awareness', '2024-02-15', '2025-05-15', 'Online', 'Active', 'Current'],
    ['Taylor, Mike', 'Executive', 'CIP-004 Awareness', '2024-01-10', '2025-04-10', 'Online', 'Active', 'Current'],
  ];

  autoTable(doc, {
    startY: 55,
    head: [['Employee Name', 'Role', 'Required Training', 'Completion Date', 'Next Due Date', 'Trainer', 'Status', 'Compliance']],
    body: trainingData,
    headStyles: { fillColor: HEADER_COLOR, fontSize: 9 },
    bodyStyles: { fontSize: 8 },
    alternateRowStyles: { fillColor: [245, 245, 245] },
  });

  addFooter(doc);
  doc.save('Training_Matrix_Template.pdf');
}

export function generateIncidentResponseScript(): void {
  const doc = new jsPDF();
  
  addHeader(doc, 'Incident Response Tabletop Script', 'Cyber Security Incident Exercise');
  
  let y = 50;
  
  // Scenario Overview
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...HEADER_COLOR);
  doc.text('Scenario Overview', 14, y);
  y += 8;
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  const scenario = `At 2:47 PM on a Tuesday, your Security Operations Center receives an alert indicating unusual network traffic originating from a workstation in the control room. The traffic appears to be communicating with an external IP address not on your approved list. Initial investigation reveals the workstation has access to the Energy Management System (EMS) and is classified as a Medium Impact BES Cyber System.`;
  const scenarioLines = doc.splitTextToSize(scenario, 180);
  doc.text(scenarioLines, 14, y);
  y += scenarioLines.length * 5 + 10;
  
  // Inject Timeline
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...HEADER_COLOR);
  doc.text('Inject Timeline', 14, y);
  y += 8;

  const injects = [
    ['T+0 min', 'SOC receives network anomaly alert for workstation WS-CR-001'],
    ['T+5 min', 'Initial triage confirms suspicious outbound traffic to unknown IP'],
    ['T+15 min', 'Workstation user reports slow system performance'],
    ['T+30 min', 'Forensic analysis reveals potential malware signature'],
    ['T+45 min', 'Regional Entity contact requires notification decision'],
    ['T+60 min', 'Media inquiry received about "cyber attack on power grid"'],
  ];

  autoTable(doc, {
    startY: y,
    head: [['Time', 'Inject Description']],
    body: injects,
    headStyles: { fillColor: HEADER_COLOR, fontSize: 9 },
    bodyStyles: { fontSize: 9 },
    columnStyles: { 0: { cellWidth: 25 } },
  });
  
  y = doc.lastAutoTable.finalY + 15;
  
  // Discussion Questions
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...HEADER_COLOR);
  doc.text('Discussion Questions', 14, y);
  y += 8;
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  
  const questions = [
    '1. What is your immediate first action upon receiving the alert?',
    '2. Who needs to be notified within the first 15 minutes?',
    '3. What criteria determine if this is a Reportable Cyber Security Incident?',
    '4. How do you balance investigation needs with operational continuity?',
    '5. What evidence must be preserved for potential audit or investigation?',
    '6. When and how do you communicate with your Regional Entity?',
  ];
  
  questions.forEach(q => {
    doc.text(q, 14, y);
    y += 7;
  });
  
  // Add new page for expected actions
  doc.addPage();
  addHeader(doc, 'Incident Response Tabletop Script', 'Expected Actions & Lessons Learned');
  
  y = 50;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...HEADER_COLOR);
  doc.text('Expected Actions by Role', 14, y);
  y += 8;

  const actions = [
    ['SOC Analyst', 'Isolate affected system, preserve logs, escalate to IR team lead'],
    ['IR Team Lead', 'Activate incident response plan, coordinate team, document timeline'],
    ['IT Operations', 'Support isolation, prepare backup systems, monitor for spread'],
    ['Compliance', 'Assess reporting requirements, prepare notification if needed'],
    ['Communications', 'Prepare internal messaging, coordinate any external statements'],
    ['Management', 'Authorize resources, approve communications, interface with executives'],
  ];

  autoTable(doc, {
    startY: y,
    head: [['Role', 'Expected Actions']],
    body: actions,
    headStyles: { fillColor: HEADER_COLOR, fontSize: 9 },
    bodyStyles: { fontSize: 9 },
    columnStyles: { 0: { cellWidth: 35 } },
  });
  
  y = doc.lastAutoTable.finalY + 15;
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...HEADER_COLOR);
  doc.text('Lessons Learned Template', 14, y);
  y += 10;
  
  const lessons = [
    ['What Worked Well', ''],
    ['What Could Be Improved', ''],
    ['Process Gaps Identified', ''],
    ['Training Needs Identified', ''],
    ['Documentation Updates Needed', ''],
    ['Action Items', ''],
  ];

  autoTable(doc, {
    startY: y,
    head: [['Category', 'Notes']],
    body: lessons,
    headStyles: { fillColor: HEADER_COLOR, fontSize: 9 },
    bodyStyles: { fontSize: 9, minCellHeight: 15 },
    columnStyles: { 0: { cellWidth: 50 }, 1: { cellWidth: 130 } },
  });

  addFooter(doc);
  doc.save('Incident_Response_Tabletop_Script.pdf');
}

export function generateChangeControlChecklist(): void {
  const doc = new jsPDF();
  
  addHeader(doc, 'Change Control Checklist', 'BES Cyber System Configuration Change Documentation');
  
  doc.setFontSize(11);
  doc.text('Complete this form for all configuration changes to BES Cyber Systems per CIP-010-4.', 14, 45);
  
  // Change Request Info
  const changeInfo = [
    ['Change Request ID:', 'CHG-2024-0142'],
    ['Date Submitted:', '2024-04-15'],
    ['Requestor Name:', 'Tom Brown'],
    ['Department:', 'IT Operations'],
    ['System Affected:', 'EMS Server - EMSS01'],
    ['Impact Rating:', 'Medium'],
  ];

  autoTable(doc, {
    startY: 55,
    body: changeInfo,
    theme: 'plain',
    bodyStyles: { fontSize: 10 },
    columnStyles: { 0: { fontStyle: 'bold', cellWidth: 45 } },
  });
  
  let y = doc.lastAutoTable.finalY + 10;
  
  // Change Description
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Change Description:', 14, y);
  y += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const desc = 'Apply Microsoft security patches KB5025221 and KB5025229 to address critical vulnerabilities identified in security advisory. Patches address remote code execution vulnerability in Windows Server 2019.';
  const descLines = doc.splitTextToSize(desc, 180);
  doc.text(descLines, 14, y);
  y += descLines.length * 5 + 10;
  
  // Risk Assessment
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Risk Assessment:', 14, y);
  y += 8;

  const risks = [
    ['Risk Level:', 'Medium - System downtime during maintenance window'],
    ['Mitigation:', 'Scheduled during low-activity period, backup verified'],
    ['Rollback Plan:', 'System snapshot taken pre-change, restore from snapshot if needed'],
  ];

  autoTable(doc, {
    startY: y,
    body: risks,
    theme: 'plain',
    bodyStyles: { fontSize: 10 },
    columnStyles: { 0: { fontStyle: 'bold', cellWidth: 45 } },
  });
  
  y = doc.lastAutoTable.finalY + 10;
  
  // Approval Checklist
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Pre-Change Checklist:', 14, y);
  y += 8;

  const checklist = [
    ['☑', 'Baseline configuration documented'],
    ['☑', 'Change tested in non-production environment'],
    ['☑', 'Rollback procedure documented and tested'],
    ['☑', 'Backup completed and verified'],
    ['☑', 'Maintenance window scheduled and communicated'],
    ['☑', 'Affected personnel notified'],
    ['☑', 'CIP Senior Manager approval obtained (if required)'],
  ];

  autoTable(doc, {
    startY: y,
    body: checklist,
    theme: 'plain',
    bodyStyles: { fontSize: 10 },
    columnStyles: { 0: { cellWidth: 10 } },
  });
  
  y = doc.lastAutoTable.finalY + 10;
  
  // Approvals
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Approvals:', 14, y);
  y += 8;

  const approvals = [
    ['Technical Reviewer:', 'Mary Johnson', '2024-04-16', '☑ Approved'],
    ['Change Manager:', 'John Smith', '2024-04-16', '☑ Approved'],
    ['CIP Compliance:', 'Sam Williams', '2024-04-17', '☑ Approved'],
  ];

  autoTable(doc, {
    startY: y,
    head: [['Role', 'Name', 'Date', 'Status']],
    body: approvals,
    headStyles: { fillColor: HEADER_COLOR, fontSize: 9 },
    bodyStyles: { fontSize: 9 },
  });
  
  // Post-Change section
  doc.addPage();
  addHeader(doc, 'Change Control Checklist', 'Post-Change Verification');
  
  y = 50;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Post-Change Verification:', 14, y);
  y += 8;

  const postChange = [
    ['☑', 'Change implemented as documented'],
    ['☑', 'System functionality verified'],
    ['☑', 'Baseline configuration updated within 30 days'],
    ['☑', 'Change documentation filed in evidence repository'],
    ['☐', 'Vulnerability assessment scheduled (if applicable)'],
  ];

  autoTable(doc, {
    startY: y,
    body: postChange,
    theme: 'plain',
    bodyStyles: { fontSize: 10 },
    columnStyles: { 0: { cellWidth: 10 } },
  });
  
  y = doc.lastAutoTable.finalY + 15;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Implementation Notes:', 14, y);
  y += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const notes = 'Patches applied successfully during maintenance window 2024-04-20 02:00-04:00. System rebooted and verified operational. No issues reported. Baseline documentation update scheduled for completion by 2024-05-20.';
  const notesLines = doc.splitTextToSize(notes, 180);
  doc.text(notesLines, 14, y);

  addFooter(doc);
  doc.save('Change_Control_Checklist.pdf');
}

export function generatePatchTracker(): void {
  const doc = new jsPDF('landscape');
  
  addHeader(doc, 'Patch Assessment Tracker', 'CIP-007-6 R2 Security Patch Management');
  
  doc.setFontSize(11);
  doc.text('Track all security patches from identification through disposition. Assessment must be completed within 35 days.', 14, 45);
  
  const patchData = [
    ['PATCH-2024-001', 'Microsoft', 'KB5025221', 'EMSS01, EMSS02', '2024-03-15', '2024-04-19', '2024-04-20', 'Implemented', 'N/A'],
    ['PATCH-2024-002', 'Cisco', 'IOS-2024-Q1', 'FW-001, SW-001', '2024-03-20', '2024-04-24', '2024-05-01', 'Implemented', 'N/A'],
    ['PATCH-2024-003', 'Schneider', 'SEVD-2024-012', 'RTU-001 to RTU-010', '2024-04-01', '2024-05-06', 'TBD', 'In Testing', 'N/A'],
    ['PATCH-2024-004', 'Oracle', 'CPU-APR-2024', 'DBSRV01', '2024-04-16', '2024-05-21', 'TBD', 'Assessing', 'N/A'],
    ['PATCH-2024-005', 'VMware', 'VMSA-2024-0006', 'VSPH01, VSPH02', '2024-04-10', '2024-05-15', 'N/A', 'Mitigated', 'Network isolation applied'],
    ['PATCH-2024-006', 'GE', 'GE-MDS-2024-01', 'HMI-001 to HMI-005', '2024-04-12', '2024-05-17', 'TBD', 'Vendor Review', 'Awaiting compatibility statement'],
  ];

  autoTable(doc, {
    startY: 55,
    head: [['Patch ID', 'Vendor', 'Patch Name', 'Affected Systems', 'Release Date', 'Assess Due', 'Impl Date', 'Status', 'Mitigation Notes']],
    body: patchData,
    headStyles: { fillColor: HEADER_COLOR, fontSize: 8 },
    bodyStyles: { fontSize: 7 },
    alternateRowStyles: { fillColor: [245, 245, 245] },
  });
  
  let y = doc.lastAutoTable.finalY + 15;
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Status Legend:', 14, y);
  y += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('Assessing = Under evaluation | In Testing = Being tested | Implemented = Applied | Mitigated = Alternate controls in place | Vendor Review = Awaiting vendor guidance', 14, y);

  addFooter(doc);
  doc.save('Patch_Assessment_Tracker.pdf');
}

export function generateAccessReviewForm(): void {
  const doc = new jsPDF();
  
  addHeader(doc, 'Access Review Documentation', 'Quarterly BES Cyber System Access Review');
  
  // Review Info
  const reviewInfo = [
    ['Review Period:', 'Q1 2024 (January - March)'],
    ['System/Application:', 'Energy Management System (EMS)'],
    ['Impact Rating:', 'Medium'],
    ['Reviewer Name:', 'John Smith, Compliance Manager'],
    ['Review Date:', '2024-04-05'],
  ];

  autoTable(doc, {
    startY: 45,
    body: reviewInfo,
    theme: 'plain',
    bodyStyles: { fontSize: 10 },
    columnStyles: { 0: { fontStyle: 'bold', cellWidth: 45 } },
  });
  
  let y = doc.lastAutoTable.finalY + 10;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Access List Reviewed:', 14, y);
  y += 8;

  const accessList = [
    ['Smith, John', 'Compliance Manager', 'Read-Only', 'Active', '☑ Verified'],
    ['Johnson, Mary', 'System Administrator', 'Admin', 'Active', '☑ Verified'],
    ['Williams, Sam', 'Operator', 'Operator', 'Active', '☑ Verified'],
    ['Brown, Tom', 'Network Engineer', 'Read-Only', 'Active', '☑ Verified'],
    ['Davis, Lisa', 'Former Contractor', 'Admin', 'Terminated 2024-02-28', '⚠ Revoke Required'],
    ['Miller, Bob', 'Operator', 'Operator', 'Active', '☑ Verified'],
  ];

  autoTable(doc, {
    startY: y,
    head: [['Name', 'Role', 'Access Level', 'Employment Status', 'Review Result']],
    body: accessList,
    headStyles: { fillColor: HEADER_COLOR, fontSize: 9 },
    bodyStyles: { fontSize: 9 },
  });
  
  y = doc.lastAutoTable.finalY + 15;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Discrepancies Found:', 14, y);
  y += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const discrepancy = 'Lisa Davis - Contractor access was not revoked after contract termination on 2024-02-28. Access remained active until discovered during this review.';
  const discLines = doc.splitTextToSize(discrepancy, 180);
  doc.text(discLines, 14, y);
  y += discLines.length * 5 + 10;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Corrective Actions:', 14, y);
  y += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const corrective = '1. Access for Lisa Davis revoked immediately upon discovery (2024-04-05 at 10:45 AM)\n2. Review of offboarding process initiated to prevent recurrence\n3. HR notification process to be updated to include IT Security team\n4. Self-report to Regional Entity under consideration';
  const corrLines = doc.splitTextToSize(corrective, 180);
  doc.text(corrLines, 14, y);
  y += corrLines.length * 5 + 15;
  
  // Approvals
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Approval:', 14, y);
  y += 8;

  const approval = [
    ['Reviewer Signature:', '___John Smith___________', 'Date:', '2024-04-05'],
    ['Manager Approval:', '___Mary Johnson_________', 'Date:', '2024-04-06'],
  ];

  autoTable(doc, {
    startY: y,
    body: approval,
    theme: 'plain',
    bodyStyles: { fontSize: 10 },
    columnStyles: { 
      0: { fontStyle: 'bold', cellWidth: 40 },
      2: { fontStyle: 'bold', cellWidth: 20 },
    },
  });

  addFooter(doc);
  doc.save('Access_Review_Form.pdf');
}
