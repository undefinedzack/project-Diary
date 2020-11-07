from rest_framework import serializers
from .models import Diary

class EntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Diary
        fields = '__all__'