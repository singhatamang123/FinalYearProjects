from django.urls import reverse, resolve
from .views.users_views import *
# from .views.product_views import *
from rest_framework.test import APITestCase


class UnitTestCase(APITestCase):

    def test_views_login(self):
        url = reverse('token_obtain_pair')
        response = self.client.post(
            url, {'username': 'admin', 'password': 'admin'})
        self.assertEqual(response.status_code, 401)

    def test_views_getUser(self):
        url = reverse('users')
        self.assertEqual(resolve(url).func, getUsers)

    def test_views_register(self):
        url = reverse('register')
        self.assertEqual(resolve(url).func, registerUser)

    def test_views_profile(self):
        url = reverse('users-profile')
        self.assertEqual(resolve(url).func, getUserProfile)

    def test_views_profile_update(self):
        url = reverse('users-profile-update')
        self.assertEqual(resolve(url).func, UserUpdateProfile)

    def test_views_getUserById(self):
        url = reverse('users', kwargs={'pk': 1})
        self.assertEqual(resolve(url).func, getUserById)

    def test_views_user_update(self):
        url = reverse('users-update', kwargs={'pk': 1})
        self.assertEqual(resolve(url).func, userUpdate)

    def test_views_user_delete(self):
        url = reverse('users-delete', kwargs={'pk': 1})
        self.assertEqual(resolve(url).func, deleteUser)

    # def test_views_logout(self):
    #     url = reverse('logout')
    #     self.assertEqual(resolve(url).func, logoutUser)

    # def test_views_recommended_urls(self):
    #     url = reverse('recommended')
    #     self.assertEqual(resolve(url).func, getRecommendations)

    # def test_views_top_urls(self):
    #     url = reverse('top_products')
    #     self.assertEqual(resolve(url).func, getTopProducts)

    #         def test_views_category_urls(self):
    #     url = reverse('category')
    #     self.assertEqual(resolve(url).func, getCategory)

    # def test_views_review_urls(self):
    #     url = reverse('reviews', kwargs={'pk': 1})
    #     self.assertEqual(resolve(url).func, createProductReview)

    # def test_views_create_urls(self):
    #     url = reverse('product-create')
    #     self.assertEqual(resolve(url).func, createProduct)

    # def test_views_upload_urls(self):
    #     url = reverse('image-upload')
    #     self.assertEqual(resolve(url).func, uploadImage)

    # def test_views_top_urls(self):
    #     url = reverse('top_products')
    #     self.assertEqual(resolve(url).func, getTopProducts)

    # def test_views_getProduct_urls(self):
    #     url = reverse('product', kwargs={'pk': 1})
    #     self.assertEqual(resolve(url).func, getProduct)

    # def test_views_update_urls(self):
    #     url = reverse('update_product', kwargs={'pk': 1})
    #     self.assertEqual(resolve(url).func, updateProduct)

    # def test_views_delete_urls(self):
    #     url = reverse('product-delete', kwargs={'pk': 1})
    #     self.assertEqual(resolve(url).func, deleteProduct)
