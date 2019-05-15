import LegislatorData from '../data/legislators-current.json';
import LegislatorData_2018 from '../data/2018/legislators-current.json';
import CandidateData_2018 from '../data/red-to-blue-2018/candidates.json';

const legislators = {
  _current: LegislatorData,
  _2018: LegislatorData_2018
};

export const LegislatorIndex = (year) => {
  year = year || 'current';

  const index = {};
  legislators[`_${year}`].forEach(legislator => {
    const terms = legislator.terms;
    const latestTerm = terms[terms.length - 1];
    const { state, type, state_rank, district } = latestTerm;
    index[state] = index[state] || {};
    index[state][type] = index[state][type] || {};
    if (type === 'sen') {
      index[state][type][state_rank] = legislator;
    }
    if (type === 'rep') {
      index[state][type][district] = legislator;
    }
  });

  return index;
};

export const CandidateIndex_2018 = () => {

  const index = {};
  CandidateData_2018.forEach(candidate => {
    const campaign = candidate.campaign;
    const { state, type, district } = campaign;
    index[state] = index[state] || {};
    index[state][type] = index[state][type] || {};
    if (type === 'rep') {
      index[state][type][district] = candidate;
    }
  });
  return index;
};
