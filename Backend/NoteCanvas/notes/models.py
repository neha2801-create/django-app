from django.db import models
from canvas.models import Canvas
from django.utils import timezone

# Create your models here.

class Note(models.Model):
    canvas = models.ForeignKey(Canvas, on_delete=models.CASCADE, related_name='notes')
    notesBody = models.TextField(blank=True)
    posX = models.FloatField(default=0)
    posY = models.FloatField(default=0)
    timestamp = models.DateTimeField(auto_now_add=True)
    height = models.FloatField()
    width = models.FloatField()
    pinned = models.BooleanField(default=False)
    color = models.CharField(max_length=7, default='#FFFFFF')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        local_timestamp = timezone.localtime(self.timestamp) if self.timestamp.tzinfo else self.timestamp
        return self.canvas.title + " - " + self.notesBody + " - " + local_timestamp.strftime('%Y-%m-%d %H:%M:%S')
