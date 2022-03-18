from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from base.models import Product, Review, Category
from base.serializers import ProductSerializer, CategorySerializer, ReviewSerializer
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.db.models import Case, When
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import sigmoid_kernel
import pandas as pd


@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')
    # print('query: ', query)
    if query == None:
        query = ''
    products = Product.objects.filter(name__icontains=query)

    page = request.query_params.get('page')
    paginator = Paginator(products, 8)

    try:
        products = paginator.page(page)

    except PageNotAnInteger:
        products = paginator.page(1)

    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)

    serializer = ProductSerializer(products, many=True)
    return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
def getTopProducts(request):
    products = Product.objects.filter(rating__gte=3).order_by('-rating')[0:5]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def contentRecommendation(request):
    product_content = pd.DataFrame(list(Product.objects.all().values())).drop(
        ["brand", "category", "_id", "rating", "numReviews", "price", "countInStock", "createdAt", "user_id", "image"], axis=1)

    # print(product_discription)

    product_content["description"] = product_content["description"].fillna(
        '')

    tfidf = TfidfVectorizer(min_df=3, max_features=None,
                            strip_accents='unicode', analyzer='word', token_pattern=r'\w{1,}',
                            ngram_range=(1, 3),
                            stop_words='english')
    tfidf_matrix = tfidf.fit_transform(product_content['description'])

    sig = sigmoid_kernel(tfidf_matrix, tfidf_matrix)

    indices = pd.Series(product_content.index,
                        index=product_content['name']).drop_duplicates()

    idx = indices['Red Led']

    sig_scores = list(enumerate(sig[idx]))

    sig_scores = sorted(sig_scores, key=lambda x: x[1], reverse=True)[1:5]

    # print(idx)
    product_indices = [i[0] for i in sig_scores]
    posts = []
    for name in product_content['name'].iloc[product_indices]:
        posts.append(Product.objects.filter(name=name).first())

    serializer = ProductSerializer(posts, many=True)
    return Response({'products': serializer.data})


@api_view(['Get'])
def getCategory(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


# @api_view(['GET'])
# def getCategoryByID(request, pk):
#     category = Category.objects.get(_id=pk)
#     serializer = CategorySerializer(category, many=False)
#     return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data

    # 1. - Review already exists

    alreadExists = product.review_set.filter(user=user).exists()

    if alreadExists:
        content = {'detail': 'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 2. No rating or 0

    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 3. Create review

    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )

        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        product.rating = total / len(reviews)
        product.save()

        return Response({'Review Added'})


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    product = Product.objects.create(
        user=user,
        name='Sample Name',
        price=0,
        brand='Sample Brand',
        countInStock=0,
        category='Sample Category',
        description='',
    )

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(_id=pk)

    product.name = data['name']
    product.price = data['price']
    product.description = data['description']
    product.brand = data['brand']
    product.category = data['category']
    product.countInStock = data['countinstock']
    product.save()

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Producted Deleted')


@api_view(['POST'])
def uploadImage(request):
    data = request.data
    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)
    product.image = request.FILES.get('image')
    if not product.image.name.endswith(('.jpg', '.png', '.jpeg')):
        return Response('Image is not uploaded choose a valid image')
    else:
        product.save()
        return Response('Image Uploaded')

    # else:
    #     return Response('Image is not uploaded choose a valid image')

        #   image_file = self.cleaned_data.get('photo')
        # if not image_file.name.endswith(".jpg"):
        #     raise forms.ValidationError("Only .jpg image accepted")
        # return image_file


def get_similar(product_name, rating, corrMatrix):
    similar_ratings = corrMatrix[product_name]*(rating-2.5)
    similar_ratings = similar_ratings.sort_values(ascending=False)
    return similar_ratings


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getRecommendations(request):
    user = request.user.id
    # print(user)
    product_rating = pd.DataFrame(list(Review.objects.all().values()))
    # print(product_rating)
    new_user = product_rating.user_id.unique().shape[0]
    # print(new_user)
    current_user_id = user
    # print(current_user_id)
    if current_user_id > new_user:
        product = Product.objects.get(_id=2)
        q = Review(user=request.user, product=product,
                   rating=3, comment='good product')
        q.save()

    userRatings = product_rating.pivot_table(
        index=['user_id'], columns=['product_id'], values='rating')
    # print(userRatings)
    userRatings = userRatings.fillna(0, axis=1)

    corrMatrix = userRatings.corr(method='pearson')
    # print(corrMatrix)

    users = pd.DataFrame(list(Review.objects.filter(user=user).values())).drop(
        ["user_id", "name", "comment", "createdAt", "_id"], axis=1)
    # print(users)
    user_filtered = [tuple(x) for x in users.values]
    print(user_filtered)
    user_rate = [each[0] for each in user_filtered]

    # print(user_rate)
    similar_products = pd.DataFrame()
    # print(similar_product)
    for product, rating in user_filtered:
        similar_products = similar_products.append(
            get_similar(product, rating, corrMatrix))

    similar_products = similar_products.drop(user_rate)
    # print(similar_products)

    product_id = list(similar_products.sum().sort_values(
        ascending=False).head(5).index)
    product_id_recommend = [
        each for each in product_id if each not in user_rate]
    preserved = Case(*[When(pk=pk, then=pos)
                     for pos, pk in enumerate(product_id_recommend)])
    product_list = list(Product.objects.filter(
        pk__in=product_id_recommend).order_by(preserved)[:5])
    # print(product_list)

    serializer = ProductSerializer(product_list, many=True)
    return Response({'products': serializer.data})
