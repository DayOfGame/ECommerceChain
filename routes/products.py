from flask import Flask, jsonify, request
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

products = [
    {"id": 1, "name": "Laptop", "category": "Electronics"},
    {"id": 2, "name": "Sneakers", "category": "Footwear"},
    {"id": 3, "name": "Smartphone", "category": "Electronics"},
    {"id": 4, "name": "Backpack", "category": "Accessories"}
]

@app.route("/products", methods=['GET'])
def get_all_products():
    return jsonify(products), 200

@app.route("/products/<int:product_id>", methods=['GET'])
def get_product(product_id):
    product = next((product for product in products if product["id"] == product_id), None)
    if product:
        return jsonify(product), 200
    else:
        return jsonify({"message": "Product not found"}), 404

@app.route("/products/search", methods=['GET'])
def search_products():
    query_params = request.args
    name = query_params.get('name')
    category = query_params.get('category')
    
    filtered_products = products
    
    if name:
        filtered_products = [product for product in filtered_products if name.lower() in product['name'].lower()]
        
    if category:
        filtered_products = [product for product in filtered_products if category.lower() in product['category'].lower()]
        
    return jsonify(filtered_products), 200

if __name__ == "__main__":
    app.run(debug=True, port=os.getenv("APP_PORT"))