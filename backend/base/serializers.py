from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product, Review, Category
from rest_framework_simplejwt.tokens import RefreshToken # for token refresh in the frontend app (login) and in the backend app (token refresh) 


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:  # inner class of model class # changing the behaviour of the serializer
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin']

    def get__id(self, obj): # to get the id of the user
        return obj.id

    def get_isAdmin(self, obj): # to get the admin status of the user
        return obj.is_staff

    def get_name(self, obj): # to get the name of the user
        name = obj.first_name
        if name == '':
            name = obj.email

        return name


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta: # inner class of model class
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self, obj): # to get the token of the user
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class ReviewSerializer(serializers.ModelSerializer): # serializer for the review
    class Meta: # inner class of model class
        model = Review
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Product
        fields = '__all__'

    def get_reviews(self, obj): # to get the reviews of the product
        reviews = obj.review_set.all()
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
