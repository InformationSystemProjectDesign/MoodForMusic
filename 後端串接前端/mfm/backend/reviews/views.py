from django.contrib.auth.models import User,Group
from rest_framework import viewsets
from rest_framework import permissions
from reviews.serializers import UserSerializer,GroupSerializer,ReviewSerializer,BusinessSerializer,CategorySerializer
from reviews.models import Review,Business,Category

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permissions_classes = [permissions.IsAuthenticated]

class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permissions_classes = [permissions.IsAuthenticated]

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permissions_classes = [permissions.IsAuthenticatedOrReadOnly]

class BusinessViewSet(viewsets.ModelViewSet):
    queryset = Business.objects.all()
    serializer_class = BusinessSerializer
    permissions_classes = [permissions.IsAuthenticatedOrReadOnly]

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permissions_classes = [permissions.IsAuthenticatedOrReadOnly]