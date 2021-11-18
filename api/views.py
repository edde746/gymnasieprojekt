from django.http.response import JsonResponse, HttpResponse
from django.shortcuts import get_object_or_404, render, redirect
from django.http import QueryDict
from .models import OrderItem, Product, Variation, Order, StockChoices
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from django.contrib.sites.shortcuts import get_current_site
from django.conf import settings
import stripe,json,requests
stripe.api_key = settings.STRIPE_API

def product_list(req):
    return JsonResponse(
        [product.json() for product in Product.objects.filter(hidden=False)],
        safe=False
    )

def product(req, id):
    product = get_object_or_404(Product, pk=id)
    return JsonResponse(
        product.json(with_variations=True),
        safe=False
    )

def cart(req):
    if req.method == 'POST':
        cart = json.loads(req.body)
        variations = []
        for item in cart['items']:
            variation = Variation.objects.get(pk=item['id'])
            product = variation.product

            data = {
                'id': variation.id,
                'name': variation.name,
                'product_name': product.name,
                'price': variation.price,
                'stock': 9999
            }

            if variation.stock_type == StockChoices.CODE:
                data['stock'] = len(variation.stock.split('\n'))
            elif variation.stock_type == StockChoices.LINK:
                data['stock'] = 1

            variations.append(data)
        return JsonResponse(variations, safe=False)
    else:
        return JsonResponse({'sucess':False,'message':'GET not allowed'})

def test_mail(req):
    message = Mail(
           from_email='edvwik0726@skola.goteborg.se',
           to_emails=['edvwik0726@skola.goteborg.se'],
           subject='Your products',
           html_content=f'Test message')
       
    sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
    response = sg.send(message)
    return JsonResponse({'hello':'test'})

def stripe_hook(request):
    print('stripe hook')
    payload = request.body
    sig_header = request.META['HTTP_STRIPE_SIGNATURE']
    event = None

    try:
      event = stripe.Webhook.construct_event(
        payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
      )
    except:
      return HttpResponse(status=400)

    print(event['type'])
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        order = get_object_or_404(Order, payment_id=session['id'])
        print(order)
        order.paid = True
        order.save()
        # Ship product
        html_products=''
        for item in order.products.all():
            if item.variation.stock_type == StockChoices.CODE:
                variation = item.variation
                html_products += f'<strong>{variation.product.name} - {variation.name}</strong><br>'
                for idx in range(item.quantity):
                    stock = variation.stock.split('\n')
                    variation.stock = '\n'.join(stock[item.quantity:])
                    variation.save()

                    for key in stock[:item.quantity]:
                        html_products += f'{stock[0]}<br>'
            elif item.variation.stock_type == StockChoices.LINK:
                html_products += f'<strong>{item.variation.product.name} - {item.variation.name}</strong><br>{item.variation.stock}<br><br>'

        message = Mail(
            from_email='edvwik0726@skola.goteborg.se',
            to_emails=order.email,
            subject='Your products',
            html_content=f'<strong>Hello, {order.name}!<br>Here are your purchased products:</strong><br><br>{html_products}')
        try:
            sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
            response = sg.send(message)
            order.shipped = True
            order.save()
        except Exception as e:
            print(e.message)

    return HttpResponse(status=200)

def checkout(req):
    try:
        data = json.loads(req.body)

        line_items = []
        order_items = []
        for item in data['cart']['items']:
            variation = Variation.objects.get(pk=item['id'])
            order_item = OrderItem(variation=variation,quantity=int(item['quantity']))
            order_item.save()
            order_items.append(order_item)
            line_items.append({ 
                "price": stripe.Price.create(unit_amount=100*variation.price, currency="usd",product_data={"name":f"{variation.product.name} - {variation.name}"}),
                "quantity": int(item['quantity'])
            })

        payment = stripe.checkout.Session.create(
            success_url=f"https://{get_current_site(req).domain}/checkout/success",
            cancel_url=f"https://{get_current_site(req).domain}/checkout/cancelled",
            payment_method_types=["card"],
            customer_email=data['email'],
            line_items=line_items,
            tax_id_collection={
                'enabled': True,
            },
            mode="payment",
        )

        order = Order(email=data['email'],name=data['name'],paid=False,shipped=False,payment_id=payment.id)
        order.save()
        [order.products.add(item) for item in order_items]
        order.save()

        return JsonResponse({"url":payment.url})
    except Exception as e:
        return JsonResponse({"error":str(e)})
