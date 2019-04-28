DROP TABLE IF EXISTS us_legislator_id;
CREATE TABLE us_legislator_id
    (
        id UUID DEFAULT uuid_generate_v1(),
        bioguide_id VARCHAR(10) UNIQUE NOT NULL,
        fec jsonb,
        lis text,
        cspan integer,
        icpsr integer,
        thomas integer,
        govtrack integer,
        maplight integer,
        wikidata text,
        votesmart integer,
        wikipedia text,
        ballotpedia text,
        opensecrets text,
        house_history bigint,
        google_entity_id text,
        PRIMARY KEY (id)
    );