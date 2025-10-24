from django.db import models

class Article(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    source = models.CharField(max_length=255, default="Wikipedia")

    def __str__(self):
        return self.title