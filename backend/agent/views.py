from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .pipelines.wikipedia import generate_article_pipeline
from article.models import Article
from article.serializers import ArticleSerializer
from rest_framework.renderers import JSONRenderer

class WikipediaCrewAPIView(APIView):
    renderer_classes = [JSONRenderer]

    def post(self, request):
        title = request.data.get("title")
        target_language = request.data.get("target_language", "English")

        if not title:
            return Response({"error": "Campo 'title' é obrigatório."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            result = generate_article_pipeline(title, target_language)

            print("Result do generate", result)

            article = Article.objects.create(
                title=title,
                summary=result.summary,
                article=result.article,
                sentiment=result.sentiment,
                translation=result.translation,
                quiz=[q.dict() for q in result.quiz],
            )

            serializer = ArticleSerializer(article)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ArticleListAPIView(APIView):
    renderer_classes = [JSONRenderer]

    def get(self, request):
        articles = Article.objects.all().order_by("-created_at")
        serializer = ArticleSerializer(articles, many=True)
        return Response(serializer.data)

class ArticleDetailAPIView(APIView):
    renderer_classes = [JSONRenderer]

    def get(self, request, pk):
        try:
            article = Article.objects.get(pk=pk)
            serializer = ArticleSerializer(article)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Article.DoesNotExist:
            return Response({"error": "Artigo não encontrado."}, status=status.HTTP_404_NOT_FOUND)