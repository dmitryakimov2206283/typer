from django.db import models
from django.conf import settings

# Create your models here.

class UserStats(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, db_column='user_id')
    max_words_typed = models.IntegerField()
    mistakes_made = models.IntegerField()

    class Meta:
        db_table = 'user_stats'