import LegislatorData from '../data/2019/legislators-current.json';
import LegislatorData_2018 from '../data/2018/legislators-current.json';
import CandidateData_2018 from '../data/red-to-blue-2018/candidates.json';

const legislators = {
  _current: LegislatorData,
  _2018: LegislatorData_2018
};

export const legislatorsByState = (legislators) => {
  const index = {};
  legislators.forEach(legislator => {
    const {first, last, middle, official_full} = legislator.bio[0];
    legislator.name = {first, last, middle, official_full};
    const {term} = legislator;
    const { state, type, state_rank, district } = term[0];
    index[state] = index[state] || {};
    index[state][type] = index[state][type] || {};

    // console.log(legislator);

    if (type === 'sen') {
      index[state][type][state_rank] = {
        bioguide_id: legislator.bioguide_id,
        name: legislator.name,
        bio: legislator.bio[0],
        terms: legislator.term,
        id: legislator.ids[0]
      };
    }
    if (type === 'rep') {
      index[state][type][district] = {
        bioguide_id: legislator.bioguide_id,
        name: legislator.name,
        bio: legislator.bio[0],
        terms: legislator.term,
        id: legislator.ids[0]
      };
    }
  })
  console.log(index);
  return index;
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
