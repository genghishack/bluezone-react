require('dotenv').config();
const pg = require('pg');

const dbUser = process.env.PGUSER;
const dbPass = process.env.PGPASS;
const dbHost = process.env.PGHOST;
const dbName = 'bluezone';
const pgConnStr = `postgres://${dbUser}:${dbPass}@${dbHost}/${dbName}`;

const states = require('../data/states.json');
const bboxes = require('../data/bboxes.json');

const client = new pg.Client(pgConnStr);

const importStates = async () => {
  client.connect();

  const rValues = [];
  states.forEach(state => {
    const bbox = bboxes[state.USPS] || [];
    const bboxSQL = 'ARRAY' + JSON.stringify(bbox);
    rValues.push(
      `('${state.USPS}', ${state.FIPS}, '${state.Name}', ${bboxSQL})`
    )
  });

  const sql = [
    'INSERT INTO us_state (usps, fips, name, bbox) VALUES',
    rValues.join(','),
    'RETURNING *'
  ].join(' ');

// console.log(sql);

  const result = await client.query(sql);
  console.log(result.rows);
  client.end();

};

const importDistricts = async () => {
  client.connect();

  const rValues = [];
  Object.keys(bboxes).forEach(key => {
    if (key.length === 4) {
      const stateAbbr = key.substr(0,2);
      const districtNum = key.substr(2,2);
      const bboxSQL = 'ARRAY' + JSON.stringify(bboxes[key]);
      rValues.push(
        `('${stateAbbr}', '${districtNum}', ${bboxSQL})`
      )
    }
  });

  const sql = [
    'INSERT INTO us_congressional_district (state_usps, district_num, bbox) VALUES',
    rValues.join(','),
    'RETURNING *'
  ].join(' ');

// console.log(sql);

  const result = await client.query(sql);
  console.log(result.rows);
  client.end();
};

const importLegislators = async () => {
  client.connect();

  const legislators = require('../data/legislators-current.json');
  // const legislators = require('../data/legislators-historical.json');
  const rValues = [];

  legislators.forEach(legislator => {
    const id_json = JSON.stringify(legislator.id).replace(/'/g, "''");
    const name_json = JSON.stringify(legislator.name).replace(/'/g, "''");
    const bio_json = JSON.stringify(legislator.bio).replace(/'/g, "''");
    const terms_json = JSON.stringify(legislator.terms).replace(/'/g, "''");
    rValues.push(
      `('${legislator.id.bioguide}', '${id_json}', '${name_json}', '${bio_json}', '${terms_json}')`
    );
  });

  const sql = [
    'INSERT INTO us_legislator_json (bioguide, id_json, name_json, bio_json, terms_json) VALUES',
    rValues.join(','),
    'RETURNING *'
  ].join(' ');

// console.log(sql);

  const result = await client.query(sql);
  console.log(result.rows);
  client.end();
};

// importStates();
// importDistricts();
importLegislators();