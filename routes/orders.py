from flask import Flask, request, jsonify
from flask_restful import Resource, Api
import os

app = Flask(__name__)
api = Api(app)

class OrderPlacement(Resource):
    def post(self):
        order_details = request.get_json()
        return {"message": "Order placed successfully", "order_details": order_details}, 201

class OrderUpdate(Resource):
    def put(self, order_id):
        updated_order_details = request.get_json()
        return {"message": "Order updated successfully", "order_id": order_id, "updated_order_details": updated_order_details}, 200

class OrderStatus(Resource):
    def get(self, order_id):
        return {"order_id": order_id, "status": "Processing"}, 200

api.add_resource(OrderPlacement, '/order')
api.add_resource(OrderUpdate, '/order/<order_id>')
api.add_resource(OrderStatus, '/order/status/<order_id>')

if __name__ == '__main__':
    app.run(debug=os.environ.get('DEBUG', 'False').lower() in ('true', '1', 't'), host=os.environ.get('HOST', '0.0.0.0'), port=int(os.environ.get('PORT', 5000)))