import CurrentLegislatorData from '../data/legislators-current.json';

export const indexedLegislators = () => {

  const index = {};
  CurrentLegislatorData.map(legislator => {
    const terms = legislator.terms;
    const latestTerm = terms[terms.length - 1];
    const { state, type, state_rank, district } = latestTerm;
    index[state] = index[state] || {};
    index[state][type] = index[state][type] || {};
    if (type == 'sen') {
      index[state][type][state_rank] = legislator;
    }
    if (type == 'rep') {
      index[state][type][district] = legislator;
    }
  });

  return index;
};
