from django.urls import path
from .views import WikipediaCrewAPIView, ArticleListAPIView, ArticleDetailAPIView

app_name = "articles"

urlpatterns = [
    path("articles/", WikipediaCrewAPIView.as_view(), name="articles-create"),
    path("articles/list/", ArticleListAPIView.as_view(), name="articles-list"),
    path("articles/<int:pk>/", ArticleDetailAPIView.as_view(), name="articles-detail"),
]
