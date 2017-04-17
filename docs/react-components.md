<h2>Component Hierarchy</h2>

<h3>AuthFormContainer</h3>

* AuthForm

<h3>HomeContainer</h3>

* Home
* Navbar
* RecommendationsItems

<h3>UsersContainer</h3>

* ReservationsItems
* RestaurantsItems
* FavoritesItems

<h3>RestaurantsContainer</h3>

* RestaurantsItem
* ReviewsItem

<h3>ReviewsContainer</h3>

* ReviewsItem

<h3>FavoritesContainer</h3>

* FavoritesItems

<h3>RecommendationsContainer</h3>

* RestaurantsItems
* ReviewsItems


<h2>Routes</h2>

| Path | Component |
| --- | ---|
| "/sign-up" | AuthFormContainer |
| "/sign-in" | AuthFormContainer |
| "/home" | HomeContainer |
| "/restaurant/:reservation_id" | RestaurantsContainer |
| "/favorites" | FavoritesContainer |
| "/home/user" | UsersContainer |
| "/city" | RecommendationsContainer |
