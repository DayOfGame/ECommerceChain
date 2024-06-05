from flask_sqlalchemy import SQLAlchemy
from flask import Flask, jsonify
import os
from dotenv import load_dotenv
import logging

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI', 'sqlite:///ecommerce_chain.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class Product(db.Model):
    __tablename__ = 'product'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    price = db.Column(db.Float, nullable=False)
    stock = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f'<Product {self.name}>'

class Order(db.Model):
    __tablename__ = 'order'

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    delivery_address = db.Column(db.String(250), nullable=False)
    status = db.Column(db.String(100), nullable=False)

    product = db.relationship('Product', backref=db.backref('orders', lazy=True))

    def __repr__(self):
        return f'<Order {self.id}>'

def init_db():
    try:
        db.create_all()
        logger.info("Database initialized")
    except Exception as e:
        logger.error("An error occurred during the database initialization: %s", e)

@app.errorhandler(Exception)
def handle_exception(e):
    logger.error("Unhandled exception occurred: %s", e)
    return jsonify(error=str(e)), 500

if __name__ == '__main__':
    init_db()
    app.run(debug=True)