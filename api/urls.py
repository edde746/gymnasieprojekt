from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.product_list),
    path('products/<int:id>', views.product),

    path('cart/', views.cart),
    path('checkout/', views.checkout),
    path('stripe_hook/', views.stripe_hook),
    path('tests/', views.test_mail),
]
