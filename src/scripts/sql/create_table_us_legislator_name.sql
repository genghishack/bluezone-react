DROP TABLE IF EXISTS us_legislator_name;
CREATE TABLE us_legislator_name
    (
        id UUID DEFAULT uuid_generate_v1(),
        bioguide_id VARCHAR(10) UNIQUE NOT NULL,
        last text NOT NULL,
        first text NOT NULL,
        middle text,
        suffix VARCHAR(4),
        nickname text,
        official_full text,
        PRIMARY KEY (id)
    );