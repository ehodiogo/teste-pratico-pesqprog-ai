from rest_framework.routers import DefaultRouter
# from .views import ArticleViewSet

app_name = "agent"

router = DefaultRouter()
#router.register(r"articles", ArticleViewSet, basename="article")

urlpatterns = router.urls
