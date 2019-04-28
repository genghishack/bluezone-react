DROP TABLE IF EXISTS us_legislator_bio;
CREATE TABLE us_legislator_bio
    (
        id UUID DEFAULT uuid_generate_v1(),
        bioguide_id VARCHAR(10) UNIQUE NOT NULL,
        gender varchar(1) NOT NULL,
        birthday date,
        religion text,
        PRIMARY KEY (id)
    );