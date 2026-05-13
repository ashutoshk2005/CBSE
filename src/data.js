// ─────────────────────────────────────────────
//  EDIT THIS FILE TO CHANGE CANDIDATE DETAILS
// ─────────────────────────────────────────────

export const DEFAULT_CANDIDATE = {
name:     'PRAVEEN TIWARI',
  mother:   'CHANDA DEVI',
  father:   'RAMESH TIWARI',
  school:   'DSR MODERN SCHOOL',
  rollNo:   '2234567',
  schoolNo: 'LD201',
};

// theory / practical can be a number OR '—' for non-graded subjects
export const DEFAULT_SUBJECTS = [
  { code: '301', name: 'ENGLISH CORE',              theory: 40,  practical: 20  },
  { code: '042', name: 'PHYSICS',                   theory: 12,  practical: 28  },
  { code: '043', name: 'CHEMISTRY',                 theory: 13,  practical: 30  },
  { code: '041', name: 'MATHEMATICS',               theory: 12,  practical: 20  },
  { code: '056', name: 'HINDI',                     theory: 30,  practical: 20  },
  { code: '500', name: 'Work Experience',           theory: '—', practical: '—' },
  { code: '325', name: 'Health & Physical Edu.',    theory: '—', practical: '—' },
  { code: '501', name: 'General Studies',           theory: '—', practical: '—' },
];

// Grade boundaries (CBSE standard)
const GRADE_MAP = [
  [91, 'A1'], [81, 'A2'], [71, 'B1'], [61, 'B2'],
  [51, 'C1'], [41, 'C2'], [33, 'D'],  [0,  'E'],
];

export const getGrade = (marks) => {
  if (typeof marks !== 'number') return marks;
  for (const [min, grade] of GRADE_MAP) {
    if (marks >= min) return grade;
  }
  return 'E';
};
