"""setting URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from rest_framework.permissions import AllowAny

from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from .rest_router import router
from app.authorization import views

schema_view = get_schema_view(
    openapi.Info(
        title="Swagger API",
        default_version="v1",
    ),
    public=True,
    permission_classes=(AllowAny,),
    # authentication_classes=(BasicAuthentication,)
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/', include(router.urls)),
    path(
        "swagger/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path('hello', views.hello_world)
]
