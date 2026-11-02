# Bug & Defect Management Process Specification: Clothing E-Commerce Website

| Field | Details | 
| ----- | ----- | 
| **Document Title** | Defect Management Workflow & Resolution Process | 
| **Document ID** | DOC-QA-003 | 
| **Version** | 1.0 | 
| **Status** | Draft / Pending Review | 
| **Prepared By** | QA Lead & Agile Project Manager | 
| **Review Status** | Pending Stakeholder Approval | 

## 1. Document Control

* **Project Name:** Clothing E-Commerce Website

* **Target Technology Stack:** React.js, Python FastAPI, MySQL, SQLAlchemy

* **Document Purpose:** To define the formal defect lifecycle, severity/priority classifications, bug reporting templates, assignment workflows, and closure criteria for all software defects encountered during development and testing.

## 2. Revision History

| Version | Date | Author | Description / Changes | 
| ----- | ----- | ----- | ----- | 
| 1.0 | 2026-06-06 | QA Lead & PM | Initial establishment of defect management workflow and tracking standards. | 

## 3. Defect Management Overview

The defect management process ensures that discrepancies between expected system behavior and actual execution are systematically recorded, triaged, assigned, remediated, verified, and closed. This workflow applies across all testing levels (Unit, API, Integration, and Functional) to maintain high code quality and strict traceability to approved requirements.

## 4. Defect Lifecycle

```
[New] → [Triaged] → [In Progress] → [Fixed / Ready for Retest] → [Verified / Closed]
  │           │             │
  └─────> [Duplicate / Rejected]
```

## 5. Defect Status Definitions

* **New:** Bug has been logged by QA and is awaiting triage.

* **Triaged:** Bug has been reviewed by the QA Lead and Product Manager, confirmed valid, and assigned a severity and priority.

* **In Progress:** A developer has accepted the bug and is actively working on remediation.

* **Fixed / Ready for Retest:** The code fix has been committed, merged, and deployed to the staging environment for QA verification.

* **Verified:** QA has retested the scenario successfully, confirming the defect is resolved.

* **Closed:** Defect lifecycle complete; ticket archived.

* **Rejected / Duplicate:** Bug deemed invalid, out of scope, or already logged under another ticket.

* **Reopened:** A previously fixed defect failed retesting or regressed.

## 6. Severity Levels

* **Blocker:** Complete system crash, database failure, or inability to perform core user journeys (e.g., login failure, order placement failure). No workaround exists.

* **Critical:** Major functionality broken (e.g., catalog filters failing, inability to add items to cart) with no clean workaround.

* **Major:** Important feature impaired (e.g., UI layout distortion, incorrect error messaging), but core functionality remains operational via a workaround.

* **Minor:** Minor visual blemish, typo, or non-blocking UI alignment issue.

* **Trivial:** Cosmetic enhancement or suggestion.

## 7. Priority Levels

* **P1 (Urgent):** Must be resolved immediately within the current sprint/release cycle (applied to Blocker and Critical severity bugs).

* **P2 (High):** High priority for upcoming sprint remediation (applied to Major severity bugs).

* **P3 (Medium):** Normal priority; scheduled based on team capacity (applied to Minor severity bugs).

* **P4 (Low):** Low priority; resolved when time permits (applied to Trivial bugs).

## 8. Bug Reporting Requirements

All bug reports must be created in the team's designated tracking tool and must include precise steps to reproduce, expected vs. actual behavior, environment details, and traceability to approved requirements or test cases (`TC-XXX`).

## 9. Required Bug Report Fields (Template)

| Bug Field | Description / Example Value | 
| ----- | ----- | 
| **Defect ID** | Unique ticket identifier (e.g., `BUG-001`) | 
| **Summary / Title** | Concise description of the issue (e.g., "Cart total incorrect when applying variant override") | 
| **Reporter** | Name of QA engineer logging the defect | 
| **Assigned To** | Developer responsible for remediation | 
| **Severity** | Blocker / Critical / Major / Minor / Trivial | 
| **Priority** | P1 / P2 / P3 / P4 | 
| **Traceability Reference** | Associated Requirement ID (`BR-XXX` / `US-XXX`) or Test Case ID (`TC-XXX`) | 
| **Environment** | Staging / Local / Browser / OS | 
| **Preconditions** | Required state before reproducing (e.g., "User logged in as Customer") | 
| **Step-by-Step Instructions** | 1. Navigate to screen...<br>2. Click button...<br>3. Observe result. | 
| **Expected Result** | What should happen according to specs | 
| **Actual Result** | What actually happened | 
| **Attachments** | Screenshots, API response JSON logs, or video recordings | 

## 10. Defect Assignment Process

* Daily triage meetings led by the QA Lead and PM review newly logged bugs (`New` status).

* Bugs are assigned to respective frontend or backend developers based on component ownership, severity, and sprint capacity.

## 11. Verification and Closure Process

* Once a developer moves a ticket to **Fixed**, QA retests the scenario in the staging environment.

* If verified successfully, QA transitions the status to **Verified** and closes the ticket. If the fix fails, QA moves the ticket to **Reopened** with updated execution logs.

## 12. Duplicate Defect Handling

* If QA identifies a newly logged bug that matches an existing open defect, the new ticket is marked as **Duplicate**, linked to the primary ticket, and closed.

## 13. Reopened Defect Process

* Reopened bugs trigger an automated notification to the developer and engineering lead, indicating regression or incomplete remediation.

## 14. Defect Metrics

* **Defect Density:** Number of defects per module/feature.

* **Defect Leakage Rate:** Percentage of bugs escaping staging into production environments (Target: $0\%$).

* **Mean Time to Resolution (MTTR):** Average time taken from bug creation to successful verification.

## 15. Communication and Escalation

* Blocker and Critical bugs found during testing must be immediately escalated via team communication channels (Slack/Teams) to the Tech Lead and PM.

## 16. Pending Team Decisions

* **Pending Team Decision:** Confirmation of defect tracking tool platform (e.g., Jira, GitHub Issues, Trello).

## 17. Approval Section

| Reviewer Name | Designation / Role | Approval Status | Date | Signature | 
| ----- | ----- | ----- | ----- | ----- | 
| *\[Pending\]* | Project Sponsor / Business Owner | **Pending Review** | — | — | 
| *\[Pending\]* | QA Lead / Agile Project Manager | **Pending Review** | — | — | 
