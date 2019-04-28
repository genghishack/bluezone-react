DROP TABLE IF EXISTS us_legislator_term;
CREATE TABLE us_legislator_term
    (
        id UUID DEFAULT uuid_generate_v1(),
        bioguide_id VARCHAR(10) NOT NULL,
        type VARCHAR(3) NOT NULL,
        start_date date NOT NULL,
        end_date date NOT NULL,
        party text,
        state varchar(2) NOT NULL,
        district integer,
        class integer,
        state_rank varchar(6),
        phone text,
        fax text,
        office text,
        address text,
        contact_form text,
        url text,
        rss_url text,
        PRIMARY KEY (id)
    );