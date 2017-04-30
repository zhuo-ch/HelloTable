## General Description

[HelloTable](https://hellotable.herokuapp.com/#/) is an OpenTable inspired clone where a user can browse, search, and view restaurants. If a user likes what they see, a reservation can be made.

## Features

* Searches can be executed according to city or restaurant name - near matches will appear as suggestions. Featured cities will appear on a front page splash.
* Browsing by city will bring up a list of all restaurants in the vicinity. Each restaurant is separated into its own snippet and users can view the full restaurant details through links.
* Restaurant show pages will show off details of the restaurant - description, photos, etc.
* Restaurant show pages will generate available reservations near the time specified in a search. Or, if the the restaurant was navigated to via browsing, available reservations will be generated according to the current time.
* Restaurants can be created by users who are logged in.
* Restaurants can be created with multiple images for the details page.

## Tech and Implementation

* HelloTable was created using a Ruby on Rails backend with React handling front end components in conjunction with the Redux cycle.
* Smooth scroll with anchor links was achieved with the use of react-scrollchor.
* All other components were build with native Javascript, React, and Redux.

### Database

* HelloTable's backend is comprised of five distinct tables - Users, Cities, Restaurants, Reservations, and Photos. Each city has associations to restaurants for easy browsing from the city show page and simplified searching from the the home page.
* Restaurants can be added by users so access to editing is restricted to the user who added the restaurant.
* Reservations have associations to users who made the reservation and restaurants to which the reservations belong.
* Photos have been separated out into it's own table and have an association to a restaurant.

## Tech examples

*
