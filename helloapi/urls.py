from django.contrib import admin
from django.urls import path, include
from api.urls import router
from . import views

urlpatterns = [
    path('', views.home),
    path('admin/', admin.site.urls),
    path('api/v1/', include(router.urls)),
    path('rest-auth/', include('rest_auth.urls'))
]
