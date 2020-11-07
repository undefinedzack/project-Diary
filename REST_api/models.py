from django.db import models

# from USERaccounts.models import User

class Diary(models.Model):
    # user = models.ForeignKey(User, on_delete=models.CASCADE)
    dateTime = models.DateTimeField()
    description = models.CharField(max_length=3000)

