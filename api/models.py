from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=128)
    description = models.TextField(null=True)
    image = models.ImageField(blank=True,upload_to='static/uploads/')
    hidden = models.BooleanField()

    def __str__(self):
        return self.name

    def get_price(self):
        lst = Variation.objects.filter(product=self)
        if not lst:
            return 0
        name, price = lst.values_list('name', 'price').order_by('price').first()
        return price

    def get_variations(self):
        return Variation.objects.filter(product=self)

    def json(self, with_variations=False):
        data = {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'image': self.image.url,
            'starting_at': self.get_price(),
        }
        if with_variations:
            data['variations'] = [variation.json() for variation in self.get_variations()]
        return data

class StockChoices(models.IntegerChoices):
    CODE = 0, 'Code'
    LINK = 1, 'Link'
    SERVICE = 2, 'Service'

class Variation(models.Model):
    product = models.ForeignKey(Product,on_delete=models.deletion.CASCADE,null=True,blank=True)
    name = models.CharField(max_length=32)
    price = models.IntegerField()

    stock_type = models.IntegerField(choices=StockChoices.choices, default=0)
    stock = models.TextField(blank=True)

    def __str__(self):
        return f"{self.name} - {self.price}"

    def json(self):
        return {
            'id': self.id,
            'product': self.product.id,
            'name': self.name,
            'price': self.price
        }

class OrderItem(models.Model):
    variation = models.ForeignKey(Variation,on_delete=models.deletion.DO_NOTHING)
    quantity = models.PositiveIntegerField()

class Order(models.Model):
    name = models.TextField()
    email = models.EmailField()
    products = models.ManyToManyField(OrderItem)
    paid = models.BooleanField()
    shipped = models.BooleanField()

    # Stripe Payment ID
    payment_id = models.CharField(max_length=256,unique=True)

    def __str__(self):
        return self.email