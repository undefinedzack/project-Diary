from django.shortcuts import render
from django.http import JsonResponse

from .models import Diary, URLS

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import EntrySerializer, URLSerializer

@api_view(['GET'])
def apiOverview(request):

    api_urls = {
        'Entires':'/entry-list/',
        'Create':'/entry-create/',
        'Read':'/entry-detail/<int:pk>/',
        'Update':'/entry-update/<int:pk>/',
        'Delete':'/entry-delete/<int:pk>/'
    }

    return Response(api_urls)

@api_view(['GET'])
def entryList(request):
    entries = Diary.objects.all()
    serializer = EntrySerializer(entries, many=True)

    return Response(serializer.data)

@api_view(['GET'])
def entryDetail(request, key):
    entries = Diary.objects.get(pk = key)

    serializer = EntrySerializer(entries, many=False)

    return Response(serializer.data)

@api_view(['POST','GET'])
def entryCreate(request):
    serializer = EntrySerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['GET','POST'])
def entryUpdate(request, key):
    entry = Diary.objects.get(pk = key)
    serializer = EntrySerializer(instance=entry, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['GET','DELETE'])
def deleteEntry(request, key):
    entry = Diary.objects.get(pk = key)

    entry.delete()

    return Response('Entry deleted successfully')


# A view for entirely different project, just writing here so that I don't have to deploy REST framework twice
# yeah yeah it saves time and money, so why not

@api_view(['GET'])
def urlList(request):
    urls = URLS.objects.all()
    serializer = URLSerializer(urls, many=True)

    return Response(serializer.data)

@api_view(['GET'])
def urlsss(request, key):
    urls = URLS.objects.get(pk = key)

    serializer = URLSerializer(urls, many=False)

    return Response(serializer.data)
