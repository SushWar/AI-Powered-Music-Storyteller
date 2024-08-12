from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("audio/", views.songList, name="audio"),
    path("testing/", views.testing, name="testing"),
    path("storyline/", views.storyline , name="storyline"),
    path("song-to-story/", views.songToSkit , name="songtostory")
]