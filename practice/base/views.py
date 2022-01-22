from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from django.http import JsonResponse
from rest_framework.response import Response
from .serializer import ProductSerializer, UserSerializerWithToken, UserSerializer
# from .products import products
from .models import Product
# Create your views here.
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated, IsAdminUser


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self,attr):
        data = super().validate(attr)
        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v
        return data
       

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getResponse(request):
    routes = [
        'api'
        'api/routes']
    return Response(routes)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUsers(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request, pk):
    products = Product.objects.get(id=pk)
    serializer = ProductSerializer(products, many=False)
    return Response(serializer.data)
