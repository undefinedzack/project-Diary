from django.shortcuts import render
from django.http import JsonResponse

from .models import Diary

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import EntrySerializer

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