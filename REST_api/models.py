from django.db import models

# from USERaccounts.models import User

class Diary(models.Model):
    # user = models.ForeignKey(User, on_delete=models.CASCADE)
    dateTime = models.DateTimeField()
    description = models.CharField(max_length=3000)

# A model for entirely different project, just writing here so that I don't have to deploy REST framework twice
# yeah yeah it saves time and money, so why not

class URLS(models.Model):

    urlz = models.CharField(max_length=2000)