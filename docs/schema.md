<h2>Schema Information</h2>

<h3>users</h3>

| Column Name | Column Type | Requires |
| --- | --- | --- |
| id | integer | not null, primary key |
| username | string | not null, unique |
| email | string | not null, unique |
| password_digest | string | not null |
| session_token | string | not null, indexed |

<h3>restaurants</h3>

| Column Name | Column Type | Requires |
| --- | --- | --- |
| id | integer | not null, primary key |
| owner_id | integer | not null, foreign key |
| name | string | not null |
| about | text | not null |
| hours | string | |
| phone number | string | not null, unique |
| site link | string | |
| style | string | |
| photos | text | not null |
| location | string | not null |

<h3>reservations</h3>

| Column Name | Column Type | Requires |
| --- | --- | --- |
| id | integer | not null, primary key |
| user_id | integer | not null, foreign key |
| restaurant_id | integer | not null, foreign key |
| time | time| not null |
| date | date | not null |

<h3>reviews</h3>

| Column Name | Column Type | Requires |
| --- | --- | --- |
| id | integer | not null, primary key |
| user_id | integer | not null, foreign key |
| restaurant_id | integer | not null, foreign key |
| reservation_id | integer | not null, foreign key |
| rating | integer | not null |
| review | text | |
| food | integer | |
| service | integer | |
| ambiance | integer | |
| value | integer | |
| noise | string | none |

<h3>favorites</h3>

| Column Name | Column Type | Requires |
| --- | --- | --- |
| id | integer | not null, primary key |
| user_id | integer | not null |
| restaurant_id | integer | not null |

* <h2>tentative tables</h2>

<h4>location_items</h4>

| Column Name | Column Type | Requires |
| --- | --- | --- |
| id | integer | not null, primary key |
| restaurant_id | integer | not null, foreign key |
| city_id | integer | not null, foreign key |
| neighborhood_id | integer | not null, foreign key |

<h4>cities</h4>

| Column Name | Column Type | Requires |
| --- | --- | --- |
| id | integer | not null, primary key |
| name | string | not null |
| photos | string | not null |

<h4>neighborhoods</h4>

| Column Name | Column Type | Requires |
| --- | --- | --- |
| id | integer | not null, primary key |
| name | string | not null |
| photos | string | not null |
