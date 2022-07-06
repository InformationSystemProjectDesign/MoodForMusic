from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        # fields = '__all__'
        fields = ("id", "name", "email", "password")

    def create(self, validated_data):
        user = User.objects.create(
            name=validated_data["name"],
            email=validated_data["email"],
        )

        user.set_password(validated_data["password"])
        user.save()

        return user
