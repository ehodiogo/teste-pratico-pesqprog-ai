from django.db import models

class Article(models.Model):
    title = models.CharField(max_length=255)
    summary = models.TextField()
    article = models.TextField()
    sentiment = models.CharField(max_length=50)
    translation = models.TextField(blank=True, null=True)
    quiz = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)
    source = models.CharField(max_length=255, default="Wikipedia Researcher + CrewAI Agents")

    def __str__(self):
        return self.title
