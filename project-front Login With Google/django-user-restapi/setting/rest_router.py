from rest_framework.routers import DefaultRouter
from app.authorization import views


router = DefaultRouter(False)

router.register('user', views.UserViewSet)