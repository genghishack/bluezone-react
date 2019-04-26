DROP TABLE IF EXISTS us_legislator_json;
CREATE TABLE us_legislator_json
    (
        id UUID DEFAULT uuid_generate_v1(),
        bioguide VARCHAR(10) UNIQUE NOT NULL,
        id_json JSONB NOT NULL,
        name_json JSONB NOT NULL,
        bio_json JSONB NOT NULL,
        terms_json JSONB NOT NULL,
        PRIMARY KEY (id)
    );