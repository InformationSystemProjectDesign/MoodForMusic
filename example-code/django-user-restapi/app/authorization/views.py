from rest_framework import viewsets
from app.authorization.serializers import UserSerializer
from .models import User
from django.http import HttpRequest, HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    """
    使用者


    ---
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer


@csrf_exempt
def hello_world(request: HttpRequest):
    if request.method == "POST":
        print(request.body)

    return JsonResponse({"status": "OK"})
