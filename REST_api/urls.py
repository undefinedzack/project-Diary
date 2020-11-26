from django.urls import path
from . import views

app_name = 'REST_api'

urlpatterns = [
    path('', views.apiOverview, name='api-overview'),
    path('entry-list/', views.entryList, name='entry list'),
    path('entry-detail/<int:key>/', views.entryDetail, name='entry detail'),
    path('entry-create/', views.entryCreate, name='entry create'),
    path('entry-update/<int:key>/', views.entryUpdate, name='entry update'),
    path('entry-delete/<int:key>/', views.deleteEntry, name='entry delete'),

# urls for entirely different project, just writing here so that I don't have to deploy REST framework twice
# yeah yeah it saves time and money, so why not

    path('urlz/<int:key>', views.urlsss, name='url of course')

]
