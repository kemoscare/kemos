from flask_mail import Message
from flask import render_template
import app

def send_mail(subject, sender, recipients, txt):
    msg = Message(subject, sender=sender, recipients=recipients)
    msg.body = txt
    app.mail_instance.send(msg)

def send_subscription_mail(user, password):
    print(render_template("subscribe.txt", user=user, password=password))
    send_mail("Inscription kemos.care", "inscriptions@kemos.care", [user.email], render_template("subscribe.txt", user=user, password=password))
