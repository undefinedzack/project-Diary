from rest_framework import serializers
from .models import Diary, URLS

class EntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Diary
        fields = '__all__'

# urls for entirely different project, just writing here so that I don't have to deploy REST framework twice
# yeah yeah it saves time and money, so why not

class URLSerializer(serializers.ModelSerializer):
    class Meta:
        model = URLS
        fields = '__all__'