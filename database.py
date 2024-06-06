from flask_sqlalchemy import SQLAlchemy
from flask import Flask, jsonify, request
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

@app.route('/create_product', methods=['POST'])
def create_product():
    try:
        data = request.json
        new_product = Product(name=data['name'], description=data.get('description'), price=data['price'], stock=data['stock'])
        db.session.add(new_product)
        db.session.commit()
        return jsonify({'message': 'Product created successfully'}), 201
    except Exception as e:
        db.session.rollback()
        logger.error("Failed to create product: %s", e)
        return jsonify({'error': 'Failed to create product'}), 500

@app.route('/create_order', methods=['POST'])
def create_order():
    try:
        data = request.json
        new_order = Order(product_id=data['product_id'], quantity=data['quantity'], delivery_address=data['delivery_address'], status=data['status'])
        db.session.add(new_order)
        db.session.commit()
        return jsonify({'message': 'Order placed successfully'}), 201
    except Exception as e:
        db.session.rollback()
        logger.error("Failed to place order: %s", e)
        return jsonify({'error': 'Failed to place order'}), 500

@app.errorhandler(Exception)
def handle_exception(e):
    logger.error("Unhandled exception occurred: %s", e)
    return jsonify(error=str(e)), 500

if __name__ == '__main__':
    init_db()
    app.run(debug=True)