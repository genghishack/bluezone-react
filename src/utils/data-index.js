import CurrentLegislatorData from '../data/legislators-current.json';
import CurrentCandidateData from '../data/red-to-blue-2018.json';

export const indexedLegislators = () => {

  const index = {};
  CurrentLegislatorData.forEach(legislator => {
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

export const indexedCandidates = () => {

  const index = {};
  CurrentCandidateData.forEach(candidate => {
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
