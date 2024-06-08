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
api.add_resource(OrderUpdate, '/order/<string:order_id>')
api.add_resource(OrderStatus, '/order/status/<string:order_id>')

if __name__ == '__main__':
    debug_mode = os.getenv('DEBUG', 'False').lower() in ('true', '1', 't')
    host_address = os.getenv('HOST', '0.0.0.0')
    port_number = int(os.getenv('PORT', 5000))

    app.run(debug=debug_mode, host=host_address, port=port_number)