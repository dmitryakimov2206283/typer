from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("randtitle", views.randtitle, name="randtitle"),
    path("randtext", views.randtext, name="randtext"),
    path("results", views.results, name="results"),
    path("create_user", views.create_user, name="create_user"),
    path("login_form", views.login_form, name="login_form"),
    path("register_form", views.register_form, name="register_form"),
    path("login", views.login, name="login"),
    path("profile", views.profile, name="profile"),
    path("logout", views.logout, name="logout"),
    path("update_user_stats", views.update_user_stats, name="update_user_stats"),
    path("leaderboard", views.leaderboard, name="leaderboard")
]