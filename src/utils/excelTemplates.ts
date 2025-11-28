import * as XLSX from 'xlsx';

export function generateEvidenceInventoryExcel(): void {
  const data = [
    ['CIP Req ID', 'Evidence Description', 'Document Location', 'Owner', 'Last Updated', 'Expiration', 'Status'],
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
    ['CIP-008-6 R1', 'Incident Response Plan', '/Evidence/CIP-008/IRP_v4.pdf', 'Security', '2024-02-01', '2025-02-01', 'Current'],
    ['CIP-009-6 R1', 'Recovery Plans', '/Evidence/CIP-009/Recovery_Plan_BCS.pdf', 'IT Ops', '2024-03-15', '2025-03-15', 'Current'],
    ['CIP-010-4 R1', 'Baseline Configurations', '/Evidence/CIP-010/Baseline_Configs/', 'IT Ops', '2024-04-01', 'Ongoing', 'Current'],
    ['CIP-011-3 R1', 'BCSI Inventory', '/Evidence/CIP-011/BCSI_Inventory.xlsx', 'Compliance', '2024-01-20', '2025-01-20', 'Current'],
    ['CIP-013-2 R1', 'Supply Chain Risk Plan', '/Evidence/CIP-013/SCRM_Plan_v2.pdf', 'Procurement', '2024-02-28', '2025-02-28', 'Current'],
  ];

  const ws = XLSX.utils.aoa_to_sheet(data);
  
  // Set column widths
  ws['!cols'] = [
    { wch: 18 }, // CIP Req ID
    { wch: 35 }, // Evidence Description
    { wch: 45 }, // Document Location
    { wch: 15 }, // Owner
    { wch: 12 }, // Last Updated
    { wch: 12 }, // Expiration
    { wch: 12 }, // Status
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Evidence Inventory');
  XLSX.writeFile(wb, 'Evidence_Inventory_Template.xlsx');
}

export function generateTrainingMatrixExcel(): void {
  const data = [
    ['Employee Name', 'Role', 'Department', 'Required Training', 'Completion Date', 'Next Due Date', 'Trainer', 'Status', 'Notes'],
    ['Smith, John', 'Compliance Manager', 'Compliance', 'CIP-004 Full', '2024-01-15', '2025-04-15', 'Internal', 'Current', ''],
    ['Johnson, Mary', 'IT Administrator', 'IT Operations', 'CIP-004 Full', '2024-02-01', '2025-05-01', 'Internal', 'Current', ''],
    ['Williams, Sam', 'Control Room Operator', 'Operations', 'CIP-004 Full + Role-Based', '2024-01-20', '2025-04-20', 'Internal', 'Current', 'Includes EMS training'],
    ['Brown, Tom', 'Network Engineer', 'IT Operations', 'CIP-004 Full + Technical', '2023-12-01', '2025-03-01', 'External', 'Due Soon', 'Renewal scheduled'],
    ['Davis, Lisa', 'Physical Security', 'Security', 'CIP-004 Full + PSP', '2024-03-15', '2025-06-15', 'Internal', 'Current', ''],
    ['Miller, Bob', 'Contractor - IT', 'Contractor', 'CIP-004 Contractor', '2024-04-01', '2025-07-01', 'Internal', 'Current', 'Contract expires 12/2024'],
    ['Wilson, Jane', 'HR Manager', 'Human Resources', 'CIP-004 Awareness', '2024-02-15', '2025-05-15', 'Online', 'Current', ''],
    ['Taylor, Mike', 'Executive', 'Leadership', 'CIP-004 Awareness', '2024-01-10', '2025-04-10', 'Online', 'Current', ''],
    ['Anderson, Sarah', 'System Engineer', 'Engineering', 'CIP-004 Full + Technical', '2024-03-01', '2025-06-01', 'Internal', 'Current', ''],
    ['Thomas, David', 'Security Analyst', 'Security', 'CIP-004 Full + Incident Response', '2024-02-20', '2025-05-20', 'Internal', 'Current', ''],
  ];

  const ws = XLSX.utils.aoa_to_sheet(data);
  
  ws['!cols'] = [
    { wch: 18 }, // Employee Name
    { wch: 22 }, // Role
    { wch: 16 }, // Department
    { wch: 28 }, // Required Training
    { wch: 14 }, // Completion Date
    { wch: 14 }, // Next Due Date
    { wch: 12 }, // Trainer
    { wch: 12 }, // Status
    { wch: 25 }, // Notes
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Training Matrix');
  XLSX.writeFile(wb, 'Training_Matrix_Template.xlsx');
}

export function generatePatchTrackerExcel(): void {
  const data = [
    ['Patch ID', 'Vendor', 'Patch Name/KB', 'CVE Reference', 'Affected Systems', 'Severity', 'Release Date', 'Assess Due (35 days)', 'Assessment Date', 'Disposition', 'Implementation Date', 'Mitigation Notes', 'Assessor'],
    ['PATCH-2024-001', 'Microsoft', 'KB5025221', 'CVE-2024-1234', 'EMSS01, EMSS02', 'Critical', '2024-03-15', '2024-04-19', '2024-04-10', 'Implemented', '2024-04-20', 'N/A', 'T. Brown'],
    ['PATCH-2024-002', 'Cisco', 'IOS-2024-Q1', 'CVE-2024-2345', 'FW-001, SW-001', 'High', '2024-03-20', '2024-04-24', '2024-04-15', 'Implemented', '2024-05-01', 'N/A', 'T. Brown'],
    ['PATCH-2024-003', 'Schneider', 'SEVD-2024-012', 'CVE-2024-3456', 'RTU-001 to RTU-010', 'Medium', '2024-04-01', '2024-05-06', '2024-04-25', 'In Testing', '', 'Vendor validation pending', 'S. Williams'],
    ['PATCH-2024-004', 'Oracle', 'CPU-APR-2024', 'Multiple', 'DBSRV01', 'High', '2024-04-16', '2024-05-21', '2024-05-01', 'Assessing', '', 'Awaiting test environment', 'M. Johnson'],
    ['PATCH-2024-005', 'VMware', 'VMSA-2024-0006', 'CVE-2024-4567', 'VSPH01, VSPH02', 'Critical', '2024-04-10', '2024-05-15', '2024-04-12', 'Mitigated', 'N/A', 'Network isolation applied per TFE', 'T. Brown'],
    ['PATCH-2024-006', 'GE', 'GE-MDS-2024-01', 'N/A', 'HMI-001 to HMI-005', 'Low', '2024-04-12', '2024-05-17', '2024-05-10', 'Vendor Review', '', 'Awaiting compatibility statement', 'S. Williams'],
    ['PATCH-2024-007', 'Microsoft', 'KB5026000', 'CVE-2024-5678', 'WS-001 to WS-010', 'High', '2024-05-01', '2024-06-05', '', 'Pending', '', '', ''],
  ];

  const ws = XLSX.utils.aoa_to_sheet(data);
  
  ws['!cols'] = [
    { wch: 16 }, // Patch ID
    { wch: 12 }, // Vendor
    { wch: 16 }, // Patch Name
    { wch: 14 }, // CVE Reference
    { wch: 22 }, // Affected Systems
    { wch: 10 }, // Severity
    { wch: 12 }, // Release Date
    { wch: 16 }, // Assess Due
    { wch: 14 }, // Assessment Date
    { wch: 14 }, // Disposition
    { wch: 16 }, // Implementation Date
    { wch: 30 }, // Mitigation Notes
    { wch: 12 }, // Assessor
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Patch Tracker');
  
  // Add a legend sheet
  const legendData = [
    ['Disposition Values', 'Description'],
    ['Pending', 'Patch identified, assessment not yet started'],
    ['Assessing', 'Currently evaluating applicability and risk'],
    ['Vendor Review', 'Awaiting vendor compatibility confirmation'],
    ['In Testing', 'Being tested in non-production environment'],
    ['Implemented', 'Patch successfully applied to all affected systems'],
    ['Mitigated', 'Alternative controls in place (document in TFE)'],
    ['Not Applicable', 'Patch does not apply to our configuration'],
    ['', ''],
    ['Timeline Requirements', ''],
    ['35 Days', 'Assessment must be completed within 35 days of patch availability'],
    ['35 Days', 'If implementing, complete within 35 days of assessment OR document mitigation'],
  ];
  
  const legendWs = XLSX.utils.aoa_to_sheet(legendData);
  legendWs['!cols'] = [{ wch: 20 }, { wch: 60 }];
  XLSX.utils.book_append_sheet(wb, legendWs, 'Legend');
  
  XLSX.writeFile(wb, 'Patch_Assessment_Tracker.xlsx');
}

export function generateAccessReviewExcel(): void {
  const data = [
    ['Review Period', 'System/Application', 'User ID', 'User Name', 'Role/Title', 'Access Level', 'Last Login', 'Access Still Required?', 'Reviewer', 'Review Date', 'Action Taken', 'Notes'],
    ['Q1 2024', 'EMS', 'jsmith', 'John Smith', 'Compliance Manager', 'Read-Only', '2024-03-28', 'Yes', 'M. Johnson', '2024-04-05', 'Retained', ''],
    ['Q1 2024', 'EMS', 'mwilliams', 'Mary Williams', 'Control Operator', 'Full Access', '2024-04-01', 'Yes', 'M. Johnson', '2024-04-05', 'Retained', 'Primary operator'],
    ['Q1 2024', 'EMS', 'tbrown', 'Tom Brown', 'IT Admin', 'Admin', '2024-03-30', 'Yes', 'M. Johnson', '2024-04-05', 'Retained', ''],
    ['Q1 2024', 'EMS', 'jdoe', 'Jane Doe', 'Former Employee', 'Read-Only', '2023-12-15', 'No', 'M. Johnson', '2024-04-05', 'Removed', 'Terminated 2024-01-15'],
    ['Q1 2024', 'Firewall Mgmt', 'tbrown', 'Tom Brown', 'IT Admin', 'Admin', '2024-04-02', 'Yes', 'L. Davis', '2024-04-06', 'Retained', ''],
    ['Q1 2024', 'Firewall Mgmt', 'netops_svc', 'Service Account', 'Automated', 'Read-Only', '2024-04-02', 'Yes', 'L. Davis', '2024-04-06', 'Retained', 'Used for monitoring'],
    ['Q1 2024', 'Badge System', 'security1', 'Security Team', 'Security', 'Admin', '2024-04-01', 'Yes', 'Security Mgr', '2024-04-05', 'Retained', ''],
  ];

  const ws = XLSX.utils.aoa_to_sheet(data);
  
  ws['!cols'] = [
    { wch: 12 }, { wch: 18 }, { wch: 14 }, { wch: 18 }, { wch: 18 },
    { wch: 12 }, { wch: 12 }, { wch: 18 }, { wch: 14 }, { wch: 12 },
    { wch: 12 }, { wch: 25 }
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Access Review');
  XLSX.writeFile(wb, 'Access_Review_Template.xlsx');
}
