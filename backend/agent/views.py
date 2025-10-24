from rest_framework import viewsets, status
from rest_framework.response import Response
from article.models import Article
from article.serializers import ArticleSerializer

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all().order_by("-id")
    serializer_class = ArticleSerializer

    def create(self, request, *args, **kwargs):
        related = request.data.get("related", [])
        serializer = self.get_serializer(data=request.data, context={"related": related})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
