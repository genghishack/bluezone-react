-- turn the terms data in the legislator_json table into individual rows for each term

WITH
bioguide_term AS (
  SELECT 
    bioguide_id,
    jsonb_array_elements(terms_json) AS term
  FROM us_legislator_json
)
--SELECT * FROM bioguide_term WHERE (term->>'end')::date > '2019-01-01' AND term->>'state' = 'DC';
,create_term_rows AS (
  SELECT 
    uuid_generate_v1(),
    bioguide_id,
    term->>'type' AS type,
    (term->>'start')::date AS start_date,
    (term->>'end')::date AS end_date,
    term->>'party' AS party,
    term->>'state' AS state,
    (term->>'district')::integer AS district,
    (term->>'class')::integer AS class,
    term->>'state_rank' AS state_rank,
    term->>'phone' AS phone,
    term->>'fax' AS fax,
    term->>'office' AS office,
    term->>'address' AS address,
    term->>'contact_form' AS contact_form,
    term->>'url' AS url,
    term->>'rss_url' AS rss_url
  FROM bioguide_term
)
--INSERT INTO us_legislator_term (SELECT * FROM create_term_rows);
,create_name_rows AS (
  SELECT
    uuid_generate_v1(),
    bioguide_id,
    name_json->>'last' AS last,
    name_json->>'first' AS first,
    name_json->>'middle' AS middle,
    name_json->>'suffix' AS suffix,
    name_json->>'nickname' AS nickname,
    name_json->>'official_full' AS official_full
  FROM us_legislator_json
)
--INSERT INTO us_legislator_name (SELECT * FROM create_name_rows);
,create_bio_rows AS (
  SELECT
    uuid_generate_v1(),
    bioguide_id,
    bio_json->>'gender' AS gender,
    (bio_json->>'birthday')::date AS birthday,
    bio_json->>'religion' AS religion
  FROM us_legislator_json
)
--INSERT INTO us_legislator_bio (SELECT * FROM create_bio_rows);
,create_id_rows AS (
  SELECT
    uuid_generate_v1(),
    bioguide_id,
    id_json->'fec' AS fec,
    id_json->>'lis' AS lis,
    (id_json->>'cspan')::integer AS cspan,
    (id_json->>'icpsr')::integer AS icpsr,
    (id_json->>'thomas')::integer AS thomas,
    (id_json->>'govtrack')::integer AS govtrack,
    (id_json->>'maplight')::integer AS maplight,
    id_json->>'wikidata' AS wikidata,
    (id_json->>'votesmart')::integer AS votesmart,
    id_json->>'wikipedia' AS wikipedia,
    id_json->>'ballotpedia' AS ballotpedia,
    id_json->>'opensecrets' AS opensecrets,
    (id_json->>'house_history')::bigint AS house_history,
    id_json->>'google_entity_id' AS google_entity_id
  FROM us_legislator_json
)
INSERT INTO us_legislator_id (SELECT * FROM create_id_rows);
--SELECT * FROM create_id_rows;
