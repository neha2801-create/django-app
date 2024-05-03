from django.db import models
from django.contrib.auth.models import AbstractUser, User

class CustomUser(AbstractUser):
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=255, blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', null=True, blank=True)

    class Status(models.TextChoices):
        ONLINE = 'Online'
        BUSY = 'Busy'
        OFFLINE = 'Offline'

    status = models.CharField(max_length=10, choices=Status.choices, default=Status.ONLINE)

    class Meta:
        verbose_name = "Custom User"
